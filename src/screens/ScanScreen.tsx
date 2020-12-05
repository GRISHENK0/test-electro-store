import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';

const ScanScreen: React.FunctionComponent = () => {
	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<View>
				<Text>Scan</Text>
			</View>
		</SafeAreaView>
	);
};

export default ScanScreen;
