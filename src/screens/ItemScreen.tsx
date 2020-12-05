import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

const ItemScreen: React.FunctionComponent = () => {
	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<View>
				<Text>Item</Text>
			</View>
		</SafeAreaView>
	);
};

export default ItemScreen;
