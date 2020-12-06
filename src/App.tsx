import 'react-native-get-random-values';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { DbProvider } from './components/DbProvider';
import ErrorHandler from './components/ErrorHandler';
import Router from './components/Router';
import { ApiProvider } from './components/ApiProvider';

const App: React.FunctionComponent = () => {
	return (
		<ErrorHandler>
			<NavigationContainer>
				<DbProvider>
					<ApiProvider>
						<Router />
					</ApiProvider>
				</DbProvider>
			</NavigationContainer>
		</ErrorHandler>
	);
};

export default App;
