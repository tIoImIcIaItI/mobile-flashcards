import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button } from 'react-native';

// displays the title of the Deck
// displays the number of cards in the deck
// displays an option to start a quiz on this specific deck
// An option to add a new question to the deck
class Deck extends Component {

	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam('deck', {}).title
	});

	render() {
		const { navigation } = this.props;
		const { deck } = this.props;
		const questions = deck.questions || [];

		return (
			<View style={styles.container}>

				<Text>{deck.title}</Text>

				<Text>{questions.length} card{questions.length !== 1 && 's'}</Text>

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
		alignItems: 'stretch',
		// justifyContent: 'center',
	},
});

const mapStateToProps = (state, { navigation }) => ({
	deck: (state.decks || {}).decks[navigation.getParam('deck', {}).title] 
});
  
export default connect(mapStateToProps, null)(Deck);
