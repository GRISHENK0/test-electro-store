import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import ItemScreen from '../screens/ItemScreen';
import ScanScreen from '../screens/ScanScreen';

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const Router: React.FunctionComponent = () => {
	return (
		<MainStack.Navigator
			screenOptions={{
				gestureEnabled: false,
				headerShown: false,
			}}
		>
			<MainStack.Screen name="TabSreen">
				{() => (
					<Tab.Navigator
						backBehavior="initialRoute"
						tabBarOptions={{
							showLabel: false,
							activeTintColor: 'black',
							inactiveTintColor: 'gray',
							style: {
								shadowColor: 'gray',
								shadowOpacity: 0.4,
								shadowOffset: { height: -1, width: 0 },
								shadowRadius: 5,
								elevation: 15,
							},
						}}
					>
						<Tab.Screen name="Home">{() => <HomeScreen />}</Tab.Screen>
						<Tab.Screen name="Scan">{() => <ScanScreen />}</Tab.Screen>
						<Tab.Screen name="Cart">{() => <CartScreen />}</Tab.Screen>
					</Tab.Navigator>
				)}
			</MainStack.Screen>
			<MainStack.Screen name="Item">{() => <ItemScreen />}</MainStack.Screen>
		</MainStack.Navigator>
	);
};

export default Router;
