import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Button, Text, View } from 'react-native';
import { __ } from '../i18n';
import { errorHandlerStyles } from '../styles';

const myErrorHandler = (error: Error) => {
	console.log(__('somethingWentWrong'), error);
};

const ErrorFallback: ({
	resetErrorBoundary,
}: {
	resetErrorBoundary: any;
}) => JSX.Element = ({ resetErrorBoundary }) => {
	return (
		<View style={[errorHandlerStyles.errorContainer]}>
			<View>
				<Text>{__('somethingWentWrong')}</Text>
				<Button title="try Again" onPress={resetErrorBoundary} />
			</View>
		</View>
	);
};

const ErrorHandler: React.FunctionComponent = ({ children }) => (
	<ErrorBoundary FallbackComponent={ErrorFallback} onError={myErrorHandler}>
		{children}
	</ErrorBoundary>
);

export default ErrorHandler;
