import { Migration } from '../types';

const migrations: Migration[] = [
	{
		name: 'init',
		queries: [
			`CREATE TABLE items(
				id text PRIMARY KEY NOT NULL,
				name text NOT NULL DEFAULT '',
				description text NOT NULL DEFAULT '',
				picture_base64 text NOT NULL DEFAULT '',
				category text NOT NULL DEFAULT 'Miscellaneous',
				price numeric NOT NULL DEFAULT 0,
				ean13 text NOT NULL DEFAULT '',
				is_in_stock boolean NOT NULL DEFAULT 0,
				created text NOT NULL,
				modified text NOT NULL
			);`,
			`CREATE TABLE cart_items(
				id text PRIMARY KEY NOT NULL,
				item_id text NOT NULL,
				quantity integer NOT NULL DEFAULT 1,
				UNIQUE(item_id),
				FOREIGN KEY (item_id) REFERENCES items(id) ON UPDATE CASCADE ON DELETE CASCADE
			);`,
		],
	},
];

export default migrations;
