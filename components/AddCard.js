import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import DataStore from '../data/data';

// An option to enter in the question
// An option to enter in the answer
// An option to submit the new question
class AddCard extends Component {

	static navigationOptions = {
		title: 'Add Card'
	};

	state = {
		question: '',
		answer: ''
	};

	onSubmit = (deck) => {
		const { navigation } = this.props;
		const { question, answer } = this.state;

		const card = {
			question,
			answer
		};
		
		DataStore.addCardToDeck(deck.title, card);

		navigation.pop();
	};

	render() {

		const deck = this.props.navigation.getParam('deck', {});

		return (
			<View style={styles.container}>

				<TextInput
					style={styles.input}
					onChangeText={question => this.setState({ question })}
					value={this.state.question}
				/>

				<TextInput
					style={styles.input}
					onChangeText={answer => this.setState({ answer })}
					value={this.state.answer}
				/>

				<Button
					title='Add'
					onPress={() => this.onSubmit(deck)}
				/>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		// alignItems: 'center',
		// justifyContent: 'center',
	},
	input: {
		height: 40
	},
});

export default AddCard;
