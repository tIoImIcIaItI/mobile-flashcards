import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import AddCard from './AddCard';
import Quiz from './Quiz';

// displays the title of the Deck
// displays the number of cards in the deck
// displays an option to start a quiz on this specific deck
// An option to add a new question to the deck
class Deck extends Component {

	static navigationOptions = {
		title: 'Deck'
	};

	render() {

		const { navigation } = this.props;
		const deck = this.props.navigation.getParam('deck', {});
		const questions = deck.questions || [];

		return (
			<View style={styles.container}>

				<Text>{deck.title}</Text>

				<Text>{questions.length} question{questions.length !== 1 && 's'}</Text>

				<Button
					title='Start Quiz'
					onPress={() => navigation.navigate('Quiz', { deck })} />

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
		alignItems: 'center',
		// justifyContent: 'center',
	},
});

export default Deck;
