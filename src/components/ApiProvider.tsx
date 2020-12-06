import React, { createContext, useContext, useEffect, useState } from 'react';
import Api from '../Api';
import { useDb } from './DbProvider';
import ScreenLoader from './ScreenLoader';

const ApiContext = createContext<Api | null>(null);

const ApiProvider: React.FunctionComponent = ({ children }) => {
	const [apiError, setApiError] = useState<any>(null);
	const [dbError, setDbError] = useState<any>(null);
	const [areDataReady, setAreDataReady] = useState(false);

	const db = useDb();
	const api = Api.init();

	useEffect(() => {
		console.log('Fetching data...');
		api
			.fetchItems()
			.then((items) => {
				console.log('Data fetched !');
				console.log('Inserting data...');
				db.ItemsSoftUpsert(items)
					.then(() => {
						console.log('Data inserted !');
						setAreDataReady(true);
					})
					.catch((error) => {
						setDbError(error);
					});
			})
			.catch((error) => {
				setApiError(error);
			});
	}, [db]);

	if (apiError) {
		throw new Error('Error when fetching data from API.');
	}

	if (dbError) {
		throw new Error('Error when inserting data in database.');
	}

	if (db === null || !areDataReady) {
		return <ScreenLoader />;
	}

	return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};

const useApi = () => {
	const db = useContext(ApiContext);

	if (!db) {
		throw new Error('Component must be a child of DbContainer.');
	}

	return db;
};

export { ApiProvider, useApi };
