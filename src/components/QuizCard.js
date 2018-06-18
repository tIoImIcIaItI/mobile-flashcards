import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button } from 'react-native';
import styles from '../styles/quiz-card';

// displays a card question
// an option to view the answer (flips the card)
// an option to view the question (flips the card)
// a "Correct" button
// an "Incorrect" button
const QuizCard = (props)  => {
	const {
		showingQuestion,
		curCardNumber, totalCardNumbers,
		question, answer,
		flipCard
	} = props;

	return (
		<View style={styles.container}>

			<Text style={styles.progress}>
				{`${curCardNumber} / ${totalCardNumbers}`}
			</Text>

			<Text style={styles.content}>
				{showingQuestion ? question : answer}
			</Text>

			<Button
				title={showingQuestion ? 'show answer' : 'show question'}
				onPress={() => flipCard()} />

		</View>
	);
}

QuizCard.propTypes = {
	showingQuestion: PropTypes.bool.isRequired,
	curCardNumber: PropTypes.number.isRequired,
	totalCardNumbers: PropTypes.number.isRequired,
	question: PropTypes.string.isRequired,
	answer: PropTypes.string.isRequired,

	flipCard: PropTypes.func.isRequired
};

export default QuizCard;
