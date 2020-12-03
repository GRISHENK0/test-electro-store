import { Languages, Texts } from './types';

const languages: Languages = {
	en: { somethingWentWrong: 'Something went wrong !' },
	fr: { somethingWentWrong: 'Quelque chose cloche !' },
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
