export interface Texts {
	somethingWentWrong: string;
	loading: string;
	miscellaneous: string;
	itemsList: string;
	itemScan: string;
	cart: string;
	inStock: string;
	outOfStock: string;
	description: string;
	deviseSymbol: string;
	addToCart: string;
	yourItemListIsEmpty: string;
	yourCartIsEmpty: string;
	quantity: string;
	back: string;
	itemNotFound: string;
	unknownBarcode: string;
	total: string;
	deleteCart: string;
	orderNow: string;
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
	pictureBase64: string;
	category: string;
	price: number;
	ean13: string;
	isInStock: boolean;
	created: string;
	modified: string;
}

export interface CartItem {
	id: string;
	quantity: number;
	item: Item;
}
