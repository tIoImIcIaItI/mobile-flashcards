import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'stretch',
		margin: 16,
		justifyContent: 'space-between',
		height: '100%'
	},
	progressContainer: {

	},
	scoreContainer: {
		flexGrow: 1,
		justifyContent: 'flex-end'
	},
	finalScore: {
		fontSize: 96,
		fontWeight: '500',
		textAlign: 'center',
		textAlignVertical: 'center'
	},
	quizCompleteOptionsContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-end'
	},
	assessmentContainer: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'flex-end'
	}
});
