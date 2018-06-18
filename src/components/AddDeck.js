import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import { View, Button, TextInput, Text } from 'react-native';
import styles from '../styles/add-deck';

// An option to enter in the title for the new deck
// An option to submit the new deck title
class AddDeck extends Component {

	static navigationOptions = {
		title: 'Add Deck'
	};

	state = {
		title: '',
		canSubmit: false
	};

	onSubmit = () => {
		const { newDeck, navigation } = this.props;
		const { title } = this.state;

		return newDeck(title).
			then(deck => navigation.replace('Deck', { deck })).
			catch(console.error);
	};

	render() {
		const { title, canSubmit } = this.state;

		return (
			<View style={styles.container}>

				<Text>
					Title
				</Text>

				<TextInput
					style={styles.input}
					onChangeText={title => this.setState({ 
						title, 
						canSubmit: title && title.length > 0 })}
					value={title}
				/>

				<Button
					title='Create'
					disabled={!canSubmit}
					onPress={this.onSubmit}
				/>

			</View>
		);
	}
}

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(ActionCreators, dispatch);

export default connect(null, mapDispatchToProps)(AddDeck);
