import React, { useState, useEffect, createContext, useContext } from 'react';
import Database from '../database/Database';
import ScreenLoader from './ScreenLoader';

const DbContext = createContext<Database | null>(null);

const DbProvider: React.FunctionComponent = ({ children }) => {
	const [db, setDb] = useState<Database | null>(null);
	const [dbError, setDbError] = useState<any>(null);
	const [areDbMigrationsReady, setAreDbMigrationsReady] = useState(false);

	const handleError = (error: Error) => {
		setDbError(error);
	};

	useEffect(() => {
		Database.init('test_electro_store')
			.then((db) => {
				setDb(db);
				console.log('Running migrations...');
				db.runMigrations()
					.then(() => {
						setAreDbMigrationsReady(true);
						console.log('Migrations done !');
					})
					.catch((error) => {
						handleError(error);
					});
			})
			.catch((error) => {
				handleError(error);
			});
	}, []);

	if (dbError) {
		throw new Error('Error initializing sqlite database.');
	}

	if (db === null || !areDbMigrationsReady) {
		return <ScreenLoader />;
	}

	return <DbContext.Provider value={db}>{children}</DbContext.Provider>;
};

const useDb = () => {
	const db = useContext(DbContext);

	if (!db) {
		throw new Error('Component must be a child of DbContainer.');
	}

	return db;
};

export { DbProvider, useDb };
