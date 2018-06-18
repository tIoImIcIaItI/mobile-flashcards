import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch',
		backgroundColor: 'white',
		elevation: 3,
		marginVertical: 16
	},
	progress: {
		margin: 4,
		fontSize: 12,
		textAlign: 'center'
	},
	content: {
		margin: 16,
		flexGrow: 1,
		fontSize: 22,
		fontWeight: '500',
		textAlign: 'center',
		textAlignVertical: 'center'
	}
});
