import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import { StyleSheet, View, Button, TextInput } from 'react-native';

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
		const { newDeck, navigation } = this.props;
		const { title } = this.state;

		return newDeck(title).
			then(deck => navigation.replace('Deck', { deck })).
			catch(console.error);
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

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(ActionCreators, dispatch);

export default connect(null, mapDispatchToProps)(AddDeck);
