import React from 'react';
import Baseapp from './components/Baseapp';
import { DbProvider } from './components/DbProvider';
import ErrorHandler from './components/ErrorHandler';

const App: React.FunctionComponent = () => {
	return (
		<ErrorHandler>
			<DbProvider>
				<Baseapp />
			</DbProvider>
		</ErrorHandler>
	);
};

export default App;
