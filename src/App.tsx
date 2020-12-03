import React from 'react';
import Baseapp from './components/Baseapp';
import ErrorHandler from './components/ErrorHandler';

const App: React.FunctionComponent = () => {
	return (
		<ErrorHandler>
			<Baseapp />
		</ErrorHandler>
	);
};

export default App;
