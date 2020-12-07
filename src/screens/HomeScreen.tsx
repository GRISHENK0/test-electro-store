/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
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
import { __ } from '../i18n';
import { colors } from '../styles';
import { Item } from '../types';
import Circle from '../../assets/icons/circle-solid.svg';
import ScreenLoader from '../components/ScreenLoader';

const StoreItem = ({ item, onPress }) => (
	<TouchableOpacity onPress={onPress} style={styles.item}>
		<View>
			<Image
				source={{ uri: `data:image/jpeg;base64,${item.pictureBase64}` }}
				resizeMode="cover"
				style={{ width: 80, height: 80 }}
			/>
		</View>
		<View>
			<View>
				<Text style={styles.title}>{item.name}</Text>
			</View>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Text style={{ fontSize: 32 }}>{`${item.price.toFixed(2)} ${__(
					'deviseSymbol'
				)}`}</Text>
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
	</TouchableOpacity>
);

const HomeScreen: React.FunctionComponent = () => {
	const db = useDb();
	const navigation = useNavigation();

	const [items, setItems] = useState<Item[] | null>([]);

	useEffect(() => {
		db.selectAllItems().then((dbItems) => {
			setItems(dbItems);
		});
	}, [db]);

	const renderItem = ({ item }) => {
		return (
			<StoreItem
				item={item}
				onPress={() => {
					navigation.navigate('ItemScreen', { item: item });
				}}
			/>
		);
	};

	if (items === null) {
		return <ScreenLoader />;
	}

	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<Header title={__('itemsList')} />
			<FlatList
				data={items}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				ListEmptyComponent={
					<View>
						<Text>{__('yourItemListIsEmpty')}</Text>
					</View>
				}
			/>
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

export default HomeScreen;
