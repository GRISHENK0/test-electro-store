/* eslint-disable react-native/no-inline-styles */
import { useIsFocused, useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useDb } from '../components/DbProvider';
import Header from '../components/Header';
import { __ } from '../i18n';
import { sleep } from '../utils';

const ScanScreen: React.FunctionComponent = () => {
	const camera = useRef(null);
	const db = useDb();
	const navigation = useNavigation();
	const isFocused = useIsFocused();

	const [isScanDebounced, setIsScanDebounced] = useState(true);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const SCAN_DEBOUNCE_DELAY_MS = 500;

	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<Header title={__('itemScan')} />
			{isFocused && (
				<RNCamera
					ref={camera}
					style={{ height: '100%', width: '100%' }}
					captureAudio={false}
					onBarCodeRead={async ({ data }) => {
						if (!isScanDebounced || isModalVisible) {
							return;
						}
						setIsScanDebounced(false);
						const scannedItem = await db.selectItemByBarcode(data);
						if (scannedItem === null) {
							setIsModalVisible(true);
							console.log('Barecode scanned is unknown.');
							Alert.alert(
								__('itemNotFound'),
								__('unknownBarcode'),
								[
									{
										text: 'OK',
										onPress: async () => {
											setIsModalVisible(false);
											await sleep(SCAN_DEBOUNCE_DELAY_MS);
											setIsScanDebounced(true);
										},
									},
								],
								{ cancelable: false }
							);
						} else {
							console.log('Item scanned !');
							setIsScanDebounced(true);
							navigation.navigate('ItemScreen', { item: scannedItem });
						}
					}}
				/>
			)}
		</SafeAreaView>
	);
};

export default ScanScreen;
