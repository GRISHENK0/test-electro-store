import React from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';
import { __ } from '../i18n';
import { colors, screenLoaderStyles } from '../styles';

const ScreenLoader: React.FunctionComponent = () => {
	return (
		<View style={[StyleSheet.absoluteFill, screenLoaderStyles.background]}>
			<Text style={screenLoaderStyles.text}>{__('loading')}</Text>
			<ActivityIndicator size="large" color={colors.black} />
		</View>
	);
};

export default ScreenLoader;
