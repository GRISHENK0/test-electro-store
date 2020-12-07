/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text } from 'react-native';
import { colors } from '../styles';

interface Props {
	title: string;
}

const Header: React.FunctionComponent<Props> = ({ title }) => {
	return (
		<View
			style={{
				flexDirection: 'row',
				height: 60,
				backgroundColor: colors.white,
			}}
		>
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					overflow: 'hidden',
				}}
			>
				<Text
					style={{
						overflow: 'hidden',
						textAlign: 'center',
						textAlignVertical: 'center',
						fontSize: 18,
						color: colors.black,
					}}
				>
					{title}
				</Text>
			</View>
		</View>
	);
};

export default Header;
