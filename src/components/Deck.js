import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import { StyleSheet, Text, View, Button } from 'react-native';

// displays the title of the Deck
// displays the number of cards in the deck
// displays an option to start a quiz on this specific deck
// An option to add a new question to the deck
class Deck extends Component {

	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam('deck', {}).title
	});

	startQuiz = (navigation, deck) => {
		
		this.props.startNewQuiz(deck);

		navigation.navigate('Quiz', { deck });
	};

	render() {
		const { deck, navigation } = this.props;
		const questions = deck.questions || [];

		return (
			<View style={styles.container}>

				<Text>{deck.title}</Text>

				<Text>{questions.length} card{questions.length !== 1 && 's'}</Text>

				<Button
					title='Start Quiz'
					disabled={questions.length < 1}
					onPress={() => this.startQuiz(navigation, deck)} />

				<Button
					title='Add Card'
					onPress={() => navigation.navigate('AddCard', { deck })} />

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'stretch',
		// justifyContent: 'center',
	},
});

const mapStateToProps = (state, { navigation }) => ({
	deck: (state.decks || {}).decks[navigation.getParam('deck', {}).title] 
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ActionCreators, dispatch);
  
export default connect(mapStateToProps, mapDispatchToProps)(Deck);
