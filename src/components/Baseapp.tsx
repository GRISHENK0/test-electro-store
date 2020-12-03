/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView, ScrollView, View, Text, StatusBar } from 'react-native';

import {
	Header,
	LearnMoreLinks,
	DebugInstructions,
	ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { baseappStyles } from '../styles';

declare const global: { HermesInternal: null | {} };

const Baseapp: React.FunctionComponent = () => {
	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView>
				<ScrollView
					contentInsetAdjustmentBehavior="automatic"
					style={baseappStyles.scrollView}
				>
					<Header />
					{global.HermesInternal == null ? null : (
						<View style={baseappStyles.engine}>
							<Text style={baseappStyles.footer}>Engine: Hermes</Text>
						</View>
					)}
					<View style={baseappStyles.body}>
						<View style={baseappStyles.sectionContainer}>
							<Text style={baseappStyles.sectionTitle}>Step One</Text>
							<Text style={baseappStyles.sectionDescription}>
								Edit <Text style={baseappStyles.highlight}>App.tsx</Text> to
								this screen and then come back to see your edits.
							</Text>
						</View>
						<View style={baseappStyles.sectionContainer}>
							<Text style={baseappStyles.sectionTitle}>See Your Changes</Text>
							<Text style={baseappStyles.sectionDescription}>
								<ReloadInstructions />
							</Text>
						</View>
						<View style={baseappStyles.sectionContainer}>
							<Text style={baseappStyles.sectionTitle}>Debug</Text>
							<Text style={baseappStyles.sectionDescription}>
								<DebugInstructions />
							</Text>
						</View>
						<View style={baseappStyles.sectionContainer}>
							<Text style={baseappStyles.sectionTitle}>Learn More</Text>
							<Text style={baseappStyles.sectionDescription}>
								Read the docs to discover what to do next:
							</Text>
						</View>
						<LearnMoreLinks />
					</View>
				</ScrollView>
			</SafeAreaView>
		</>
	);
};

export default Baseapp;
