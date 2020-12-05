import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

const HomeScreen: React.FunctionComponent = () => {
	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<View>
				<Text>Home</Text>
			</View>
		</SafeAreaView>
	);
};

export default HomeScreen;
