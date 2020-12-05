import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { DbProvider } from './components/DbProvider';
import ErrorHandler from './components/ErrorHandler';
import Router from './components/Router';

const App: React.FunctionComponent = () => {
	return (
		<ErrorHandler>
			<NavigationContainer>
				<DbProvider>
					<Router />
				</DbProvider>
			</NavigationContainer>
		</ErrorHandler>
	);
};

export default App;
