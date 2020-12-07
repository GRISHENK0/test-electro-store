import SQLite from 'react-native-sqlite-storage';
import { CartItem, DbMigration, Item } from '../types';
import migrations from './migrations';
import { v1 as uuidv1 } from 'uuid';

SQLite.enablePromise(true);

const parseResultSet = (data: SQLite.ResultSet): any[] => {
	const tmp = [];
	for (let i = 0; i < data.rows.length; i++) {
		tmp.push(data.rows.item(i));
	}

	return tmp;
};

class Database {
	sqliteDb: SQLite.SQLiteDatabase;

	constructor(sqliteDb: SQLite.SQLiteDatabase) {
		this.sqliteDb = sqliteDb;
	}

	static init = async (dbName: string): Promise<Database> => {
		const sqliteDb = await SQLite.openDatabase({
			name: dbName,
			location: 'default',
		});

		return new Database(sqliteDb);
	};

	unsafe_drop = async (): Promise<void> => {
		await SQLite.deleteDatabase({
			name: 'test_electro_store',
			location: 'default',
		});

		console.log('Database cleared !');
	};

	runMigrations = async (): Promise<void> => {
		//await this.unsafe_drop(); // /!\ Use this ONLY to reset the database in dev test !!!

		await this.sqliteDb.executeSql('PRAGMA foreign_keys = ON;');

		await this.sqliteDb.executeSql(
			`CREATE TABLE IF NOT EXISTS migrations (
				id text PRIMARY KEY NOT NULL,
				version integer NOT NULL,
				migration_name text NOT NULL,
				start_time text NOT NULL,
				end_time text NOT NULL
			);`
		);

		migrations.forEach(async (migration) => {
			const [
				results,
			] = await this.sqliteDb.executeSql(
				'SELECT * FROM migrations WHERE migration_name = ?;',
				[migration.name]
			);

			const appliedMigrations: DbMigration[] = parseResultSet(results);

			if (appliedMigrations.length === 0) {
				await this.sqliteDb.transaction((tx) => {
					migration.queries.forEach((query) => {
						tx.executeSql(query);
					});
				});

				const date = new Date();
				const version = `${date.getUTCFullYear()}${date.getUTCMonth()}${date.getUTCDate()}${date.getUTCHours()}${date.getUTCMinutes()}${date.getUTCSeconds()}`;

				await this.sqliteDb.executeSql(
					'INSERT INTO migrations (id, version, migration_name, start_time, end_time) VALUES (?, ?, ?, ?, ?);',
					[
						uuidv1(),
						version,
						migration.name,
						date.toISOString(),
						date.toISOString(),
					]
				);
			}
		});
	};

	ItemsSoftUpsert = async (items: Item[]) => {
		await this.sqliteDb.transaction((tx) => {
			items.forEach(
				({
					id,
					name,
					description,
					pictureBase64,
					category,
					price,
					ean13,
					isInStock,
					created,
					modified,
				}) => {
					tx.executeSql(
						`INSERT INTO items (id, name, description, picture_base64, category, price, ean13, is_in_stock, created, modified)
							VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
							ON CONFLICT(id) DO UPDATE SET
								name = excluded.name,
								description = excluded.description,
								picture_base64 = excluded.picture_base64,
								category = excluded.category,
								price = excluded.price,
								ean13 = excluded.ean13,
								is_in_stock = excluded.is_in_stock,
								created = excluded.created,
								modified = excluded.modified
								WHERE excluded.id = id;`,
						[
							id,
							name,
							description,
							pictureBase64,
							category,
							price,
							ean13,
							isInStock ? 1 : 0,
							created,
							modified,
						]
					);
				}
			);
		});
	};

	selectItemByBarcode = async (barcode: string) => {
		const [
			ItemResult,
		] = await this.sqliteDb.executeSql('SELECT * FROM items WHERE ean13 = ?;', [
			barcode,
		]);

		const dbItem = parseResultSet(ItemResult);

		if (dbItem.length === 0) {
			return null;
		}

		return {
			id: dbItem[0].id,
			name: dbItem[0].name,
			description: dbItem[0].description,
			pictureBase64: dbItem[0].picture_base64,
			category: dbItem[0].category,
			price: dbItem[0].price,
			ean13: dbItem[0].ean13,
			isInStock: dbItem[0].is_in_stock ? true : false,
			created: dbItem[0].created,
			modified: dbItem[0].modified,
		} as Item;
	};

	selectAllItems = async () => {
		const [ItemsResults] = await this.sqliteDb.executeSql(
			'SELECT * FROM items;'
		);

		const dbItems = parseResultSet(ItemsResults);

		const items: Item[] = [];

		dbItems.forEach(
			({
				id,
				name,
				description,
				picture_base64,
				category,
				price,
				ean13,
				is_in_stock,
				created,
				modified,
			}) => {
				items.push({
					id,
					name,
					description,
					pictureBase64: picture_base64,
					category,
					price,
					ean13,
					isInStock: is_in_stock ? true : false,
					created,
					modified,
				});
			}
		);

		return items;
	};

	upsertCartItem = async (itemId: string) => {
		const [
			CartItemResult,
		] = await this.sqliteDb.executeSql(
			'SELECT quantity FROM cart_items WHERE item_id = ?;',
			[itemId]
		);

		const dbCartItem = parseResultSet(CartItemResult);

		const quantity = dbCartItem.length === 0 ? 1 : dbCartItem[0].quantity;

		await this.sqliteDb.executeSql(
			`INSERT INTO cart_items (id, item_id, quantity)
				VALUES(?, ?, ?)
				ON CONFLICT(item_id) DO UPDATE SET
					quantity = excluded.quantity + 1
					WHERE excluded.item_id = item_id;`,
			[uuidv1(), itemId, quantity]
		);
	};

	selectAllCartItems = async () => {
		const [CartItemsResults] = await this.sqliteDb.executeSql(
			`SELECT cart_items.id, cart_items.quantity, cart_items.item_id, items.name, items.description, items.picture_base64, items.category, items.price, items.ean13, items.is_in_stock, items.created, items.modified FROM cart_items
			INNER JOIN items ON cart_items.item_id = items.id;`
		);

		const dbCartItems = parseResultSet(CartItemsResults);

		const cartItems: CartItem[] = [];

		dbCartItems.forEach(
			({
				id,
				quantity,
				item_id,
				name,
				description,
				picture_base64,
				category,
				price,
				ean13,
				is_in_stock,
				created,
				modified,
			}) => {
				cartItems.push({
					id,
					quantity,
					item: {
						id: item_id,
						name,
						description,
						pictureBase64: picture_base64,
						category,
						price,
						ean13,
						isInStock: is_in_stock ? true : false,
						created,
						modified,
					},
				});
			}
		);

		return cartItems;
	};

	deleteCartItem = async (cartItemId: string) => {
		await this.sqliteDb.executeSql('DELETE FROM cart_items WHERE id = ?;', [
			cartItemId,
		]);
	};

	deleteAllCartItems = async () => {
		await this.sqliteDb.executeSql('DELETE FROM cart_items;');
	};
}

export default Database;
