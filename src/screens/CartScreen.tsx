import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

const CartScreen: React.FunctionComponent = () => {
	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<View>
				<Text>Cart</Text>
			</View>
		</SafeAreaView>
	);
};

export default CartScreen;
