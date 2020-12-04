import SQLite from 'react-native-sqlite-storage';
import { DbMigration } from '../types';
import migrations from './migrations';
import 'react-native-get-random-values';
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
}

export default Database;
