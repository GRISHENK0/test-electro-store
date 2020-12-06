import React, { useRef } from 'react';
import { Alert, SafeAreaView } from 'react-native';
import { RNCamera } from 'react-native-camera';

const ScanScreen: React.FunctionComponent = () => {
	const camera = useRef(null);

	return (
		<SafeAreaView
			style={{
				flex: 1,
			}}
		>
			<RNCamera
				ref={camera}
				style={{ height: '100%', width: '100%' }}
				captureAudio={false}
				onBarCodeRead={({ data }) => {
					Alert.alert(
						'Code barre détecté',
						data,
						[{ text: 'OK', onPress: () => console.log('OK Pressed') }],
						{ cancelable: false }
					);
				}}
			/>
		</SafeAreaView>
	);
};

export default ScanScreen;
