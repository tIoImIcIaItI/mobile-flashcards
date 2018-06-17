import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import { View, Button, TextInput, Text } from 'react-native';
import styles from '../styles/add-card';

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

	onSubmit = ({ title }) => {
		const { navigation } = this.props;
		const { question, answer } = this.state;

		const card = {
			question,
			answer
		};

		return this.props.addCardToDeck(title, card).
			then(() => navigation.pop()).
			catch(console.error);
	};

	render() {
		const deck = this.props.navigation.getParam('deck', {});

		return (
			<View style={styles.container}>

				<Text>
					Question
				</Text>

				<TextInput
					style={styles.input}
					onChangeText={question => this.setState({ question })}
					value={this.state.question}
				/>

				<Text>
					Answer
				</Text>

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

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(ActionCreators, dispatch);

export default connect(null, mapDispatchToProps)(AddCard);
