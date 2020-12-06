import { Item } from './types';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

class Api {
	constructor() {}

	static init = () => new Api();

	fetchItems = async () => {
		const fakeItems: Item[] = [
			{
				id: 'c73f4b90-3744-11eb-bec7-fd1a2a1012b0',
				name: 'Résistance de 10 kOhms',
				description: 'Une résistance de 10 kOhms.',
				pictureName: '',
				category: 'Resistor',
				price: 2,
				ean13: '5000112558272',
				isInStock: true,
				created: '2020-12-05T14:48:00.000Z',
				modified: '2020-12-05T14:48:00.000Z',
			},
			{
				id: 'c73f4b90-3744-11eb-bec7-fd1a2a1012b1',
				name: 'Résistance de 5 kOhms',
				description: 'Une résistance de 5 kOhms.',
				pictureName: '',
				category: 'Resistor',
				price: 1,
				ean13: '5000112558272',
				isInStock: true,
				created: '2020-12-05T14:48:00.000Z',
				modified: '2020-12-05T14:48:00.000Z',
			},
			{
				id: 'c73f4b90-3744-11eb-bec7-fd1a2a1012b2',
				name: 'Diode 1N4148',
				description:
					'Cette diode vous permettra de réaliser des montages de roues libres ou de capteur de température (cf: loi de Shockley).',
				pictureName: '',
				category: 'Resistor',
				price: 5,
				ean13: '5000112558272',
				isInStock: true,
				created: '2020-12-05T14:48:00.000Z',
				modified: '2020-12-05T14:48:00.000Z',
			},
		];

		await sleep(fakeItems.length * 5);

		return fakeItems;
	};
}

export default Api;
