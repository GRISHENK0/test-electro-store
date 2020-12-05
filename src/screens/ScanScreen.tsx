import React, { useRef } from 'react';
import { SafeAreaView } from 'react-native';
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
					console.log(data);
				}}
			/>
		</SafeAreaView>
	);
};

export default ScanScreen;
