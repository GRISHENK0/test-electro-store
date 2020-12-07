import { Languages, Texts } from './types';

const languages: Languages = {
	en: {
		somethingWentWrong: 'Something went wrong!',
		loading: 'Loading...',
		miscellaneous: 'Miscellaneous',
		itemsList: 'Items list',
		itemScan: 'Item scan',
		cart: 'Shopping cart',
		inStock: 'In stock',
		outOfStock: 'Out of stock',
		description: 'Description:',
		deviseSymbol: '$',
		addToCart: 'Add to shopping cart',
		yourItemListIsEmpty: 'Your item list is empty!',
		yourCartIsEmpty: 'Your shopping cart is empty!',
		quantity: 'Quantity:',
		back: 'Back',
		itemNotFound: 'Item not found!',
		unknownBarcode: 'This barcode is unknow in our store.',
		total: 'Total:',
		deleteCart: 'Delete shopping cart!',
		orderNow: 'Order now!',
	},
	fr: {
		somethingWentWrong: 'Quelque chose cloche !',
		loading: 'Chargement...',
		miscellaneous: 'Divers',
		itemsList: 'Liste des articles',
		itemScan: "Scan d'article",
		cart: 'Panier',
		inStock: 'En stock',
		outOfStock: 'Rupture de stock',
		description: 'Description :',
		deviseSymbol: '€',
		addToCart: 'Ajouter au panier',
		yourItemListIsEmpty: "Votre liste d'article est vide !",
		yourCartIsEmpty: 'Votre panier est vide !',
		quantity: 'Quantité :',
		back: 'Retour',
		itemNotFound: 'Article non trouvé !',
		unknownBarcode: 'Ce code barre est inconnu dans notre magasin.',
		total: 'Total :',
		deleteCart: 'Vider le panier !',
		orderNow: 'Passer commande immédiatement !',
	},
};

const __ = (key: keyof Texts, ...values: string[]) => {
	const value = languages.fr[key];
	let string = Array.isArray(value) ? value[0] : value;

	for (const value of values) {
		string = string.replace(/%s/, value);
	}

	return string;
};

/*
const __n = (key: keyof Texts, count: number, ...values: string[]) => {
	const value = languages.fr[key];
	let string = Array.isArray(value)
		? value[count > 1 ? value.length - 1 : 0]
		: value;

	for (const value of values) {
		string = string.replace(/%s/, value);
	}

	return string;
};
*/

export { __ };
