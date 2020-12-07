/* eslint-disable react-native/no-inline-styles */
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { Button, Image, SafeAreaView, Text, View } from 'react-native';
import Header from '../components/Header';
import { __ } from '../i18n';
import { colors } from '../styles';
import { Item } from '../types';
import Circle from '../../assets/icons/circle-solid.svg';
import { useDb } from '../components/DbProvider';

const ItemScreen: React.FunctionComponent = () => {
	const db = useDb();
	const navigation = useNavigation();
	const route = useRoute();
	const { item } = route.params as { item: Item };

	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<Header title={item.name} />
			<View>
				<View>
					<Image
						source={{ uri: `data:image/jpeg;base64,${item.pictureBase64}` }}
						resizeMode="cover"
						style={{ width: 200, height: 200 }}
					/>
				</View>
				<View>
					<View>
						<Text style={{ fontSize: 32 }}>{item.price.toFixed(2)} €</Text>
					</View>
					<View>
						<Circle
							width={32}
							height={32}
							fill={item.isInStock ? colors.green : colors.red}
						/>
						{item.isInStock ? (
							<Text style={{ color: colors.green }}>{__('inStock')}</Text>
						) : (
							<Text style={{ color: colors.red }}>{__('outOfStock')}</Text>
						)}
					</View>
				</View>
			</View>
			<View>
				<Text style={{ fontWeight: 'bold' }}>{__('description')}</Text>
				<Text>{item.description}</Text>
			</View>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Button
					title={__('back')}
					onPress={() => {
						navigation.goBack();
					}}
				/>
				<Button
					title={__('addToCart')}
					onPress={() => {
						db.upsertCartItem(item.id).then(() => {
							console.log('Item added to shopping cart !');
						});
					}}
				/>
			</View>
		</SafeAreaView>
	);
};

export default ItemScreen;
