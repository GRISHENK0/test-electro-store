import React, { useEffect, useState } from 'react';
import {
	FlatList,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
} from 'react-native';
import { useDb } from '../components/DbProvider';
import { Item } from '../types';

const StoreItem = ({ item, onPress, style }) => (
	<TouchableOpacity onPress={onPress} style={[styles.item, style]}>
		<Text style={styles.title}>{item.name}</Text>
	</TouchableOpacity>
);

const HomeScreen: React.FunctionComponent = () => {
	const db = useDb();

	const [items, setItems] = useState<Item[]>([]);
	const [isItemsLoaded, setIsItemsLoaded] = useState<boolean>(false);

	useEffect(() => {
		db.selectAllItems()
			.then((dbItems) => {
				setItems(dbItems);
				setIsItemsLoaded(true);
			})
			.catch();
	}, [db]);

	const renderItem = ({ item }) => {
		const backgroundColor = '#f9c2ff';

		return (
			<StoreItem
				item={item}
				onPress={() => console.log(item.id)}
				style={{ backgroundColor }}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<FlatList
				data={items}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				refreshing={!isItemsLoaded}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight || 0,
	},
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
});

export default HomeScreen;
