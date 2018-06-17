import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button } from 'react-native';
import styles from '../styles/quiz-card';

// displays a card question
// an option to view the answer (flips the card)
// an option to view the question (flips the card)
// a "Correct" button
// an "Incorrect" button
class QuizCard extends Component {

    static propTypes = {
        curCardNumber: PropTypes.number.isRequired,
        totalCardNumbers: PropTypes.number.isRequired,
        question: PropTypes.string.isRequired,
        answer: PropTypes.string.isRequired
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
            curCardNumber, totalCardNumbers,
			question, answer
        } = this.props;

        const content = 
            showingQuestion ? question : answer;

        const title = 
            showingQuestion ? 'show answer' : 'show question';

		return (
            <View style={styles.container}>

                <Text style={styles.progress}>
                    {`${curCardNumber} / ${totalCardNumbers}`}
                </Text>

                <Text style={styles.content}>
                    {content}
                </Text>

				<Button
					title={title}
					onPress={() => this.toggleContent()} />

			</View>
		);
	}
}
 
export default QuizCard;
