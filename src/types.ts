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
