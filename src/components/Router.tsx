import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import ItemScreen from '../screens/ItemScreen';
import ScanScreen from '../screens/ScanScreen';
import HomeIcon from '../../assets/icons/home-solid.svg';
import BarcodeIcon from '../../assets/icons/barcode-solid.svg';
import ShoppingBasketIcon from '../../assets/icons/shopping-basket-solid.svg';
import { colors } from '../styles';

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
							activeTintColor: colors.black,
							inactiveTintColor: colors.gray,
							style: {
								shadowColor: colors.gray,
								shadowOpacity: 0.4,
								shadowOffset: { height: -1, width: 0 },
								shadowRadius: 5,
								elevation: 15,
							},
						}}
					>
						<Tab.Screen
							name="Home"
							options={{
								tabBarIcon: ({ color }) => (
									<HomeIcon width={34} height={34} fill={color} />
								),
							}}
						>
							{() => <HomeScreen />}
						</Tab.Screen>
						<Tab.Screen
							name="Scan"
							options={{
								tabBarIcon: ({ color }) => (
									<BarcodeIcon width={34} height={34} fill={color} />
								),
							}}
						>
							{() => <ScanScreen />}
						</Tab.Screen>
						<Tab.Screen
							name="Cart"
							options={{
								tabBarIcon: ({ color }) => (
									<ShoppingBasketIcon width={34} height={34} fill={color} />
								),
							}}
						>
							{() => <CartScreen />}
						</Tab.Screen>
					</Tab.Navigator>
				)}
			</MainStack.Screen>
			<MainStack.Screen name="Item">{() => <ItemScreen />}</MainStack.Screen>
		</MainStack.Navigator>
	);
};

export default Router;
