import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import DataStore from '../data/data';

// An option to enter in the title for the new deck
// An option to submit the new deck title
class AddDeck extends Component {

	static navigationOptions = {
		title: 'Add Deck'
	};

	state = {
		title: ''
	};

	onSubmit = () => {

		const { navigation } = this.props;
		const { title } = this.state;

		DataStore.saveDeckTitle(title);

		const deck = DataStore.getDeck(title);

		navigation.replace('Deck', { deck });
	};

	render() {

		return (
			<View>

				<TextInput
					style={styles.input}
					onChangeText={title => this.setState({ title })}
					value={this.state.title}
				/>

				<Button
					title='Create'
					onPress={this.onSubmit}
				/>

			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	input: {
		height: 40
	},
});

export default AddDeck;
