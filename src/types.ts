export interface Texts {
	somethingWentWrong: string;
	loading: string;
	miscellaneous: string;
}

export interface Languages {
	en: Texts;
	fr: Texts;
}

export interface Migration {
	name: string;
	queries: string[];
}

export interface DbMigration {
	id: string;
	version: number;
	migration_name: string;
	start_time: string;
	end_time: string;
}

export interface Item {
	id: string;
	name: string;
	description: string;
	pictureName: string;
	category: string;
	price: number;
	ean13: string;
	isInStock: boolean;
	created: string;
	modified: string;
}
