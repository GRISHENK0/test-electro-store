/* eslint-disable react-native/no-inline-styles */
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
	FlatList,
	Image,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useDb } from '../components/DbProvider';
import Header from '../components/Header';
import ScreenLoader from '../components/ScreenLoader';
import { __ } from '../i18n';
import { CartItem } from '../types';
import TimesCircle from '../../assets/icons/times-circle-regular.svg';
import { colors } from '../styles';

const StoreCartItem = ({ cartItem, onPress }) => (
	<TouchableOpacity onPress={onPress} style={styles.item}>
		<View>
			<Image
				source={{
					uri: `data:image/jpeg;base64,${cartItem.item.pictureBase64}`,
				}}
				resizeMode="cover"
				style={{ width: 80, height: 80 }}
			/>
		</View>
		<View>
			<View>
				<Text style={styles.title}>{cartItem.item.name}</Text>
			</View>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text style={{ fontSize: 32 }}>{`${cartItem.item.price.toFixed(2)} ${__(
					'deviseSymbol'
				)}`}</Text>
				<Text>{__('quantity')}</Text>
				<Text>{cartItem.quantity}</Text>
				<TimesCircle width={32} height={32} fill={colors.red} />
			</View>
		</View>
	</TouchableOpacity>
);

const CartScreen: React.FunctionComponent = () => {
	const db = useDb();
	const isFocused = useIsFocused();

	const [cartItems, setCartItems] = useState<CartItem[] | null>([]);

	useEffect(() => {
		if (!isFocused) {
			return;
		}

		db.selectAllCartItems().then((dbCartItems) => {
			setCartItems(dbCartItems);
		});
	}, [db, isFocused]);

	const renderItem = ({ item }) => {
		return (
			<StoreCartItem
				cartItem={item}
				onPress={() => {
					db.deleteCartItem(item.id).then(() => {
						console.log('Cart item deleted !');
						const index = (cartItems as CartItem[]).findIndex(
							(cartItem) => cartItem.id === item.id
						);
						setCartItems(
							(cartItems as CartItem[])
								.slice(0, index)
								.concat((cartItems as CartItem[]).slice(index + 1))
						);
					});
				}}
			/>
		);
	};

	const calculateTotal = (calculatedCartItems: CartItem[]) => {
		let total = 0;

		calculatedCartItems.forEach((calculatedCartItem) => {
			total += calculatedCartItem.quantity * calculatedCartItem.item.price;
		});

		return total;
	};

	if (cartItems === null) {
		return <ScreenLoader />;
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<Header title={__('cart')} />
			<FlatList
				data={cartItems}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				ListEmptyComponent={
					<View>
						<Text>{__('yourCartIsEmpty')}</Text>
					</View>
				}
			/>
			<View>
				<Text>{__('total')}</Text>
				<Text>{calculateTotal(cartItems)}</Text>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	item: {
		flexDirection: 'row',
		height: 100,
		padding: 10,
		marginVertical: 8,
		marginHorizontal: 16,
		backgroundColor: colors.white,
	},
	title: {
		fontSize: 22,
	},
});

export default CartScreen;
