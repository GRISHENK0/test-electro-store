import { Migration } from '../types';

const migrations: Migration[] = [
	{
		name: 'init',
		queries: [
			`CREATE TABLE items(
				id text PRIMARY KEY NOT NULL,
				name text NOT NULL DEFAULT '',
				picture_name text NOT NULL DEFAULT '',
				category text NOT NULL DEFAULT 'Miscellaneous',
				price numeric NOT NULL DEFAULT 0,
				is_in_stock boolean NOT NULL DEFAULT 0,
				created text NOT NULL,
				modified text NOT NULL
			);`,
			`CREATE TABLE carts(
				id text PRIMARY KEY NOT NULL,
				created text NOT NULL,
				modified text NOT NULL
			);`,
		],
	},
	{
		name: 'initSecondPart',
		queries: [
			`CREATE TABLE carts_items(
				cart_id text NOT NULL,
				item_id text NOT NULL,
				quantity integer NOT NULL DEFAULT 1,
				UNIQUE(cart_id, item_id),
				FOREIGN KEY (cart_id) REFERENCES carts(id) ON UPDATE CASCADE ON DELETE CASCADE,
				FOREIGN KEY (item_id) REFERENCES items(id) ON UPDATE CASCADE ON DELETE CASCADE
			);`,
		],
	},
];

export default migrations;
