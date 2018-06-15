import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View, Button } from 'react-native';

// displays a card question
// an option to view the answer (flips the card)
// an option to view the question (flips the card)
// a "Correct" button
// an "Incorrect" button
class QuizCard extends Component {

    static propTypes = {
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired,
        correct: PropTypes.func.isRequired,
        incorrect: PropTypes.func.isRequired,
    };

    state = {
        showingQuestion: true
    };

    toggleContent = () => {
        this.setState({
            showingQuestion: !this.state.showingQuestion
        });
    };

	render() {
        const { showingQuestion } = this.state;

		const { 
			question, answer,
            correct, incorrect 
        } = this.props;

        const content = 
            showingQuestion ? question : answer;

        const title = 
            showingQuestion ? 'show answer' : 'show question';

		return (
            <View>

                <Text>
                    {content}
                </Text>

				<Button
					title={title}
					onPress={() => this.toggleContent()} />

				<Button
					title='Correct'
					onPress={() => correct()} />

				<Button
					title='Incorrect'
					onPress={() => incorrect()} />

			</View>
		);
	}
}
 
export default QuizCard;
