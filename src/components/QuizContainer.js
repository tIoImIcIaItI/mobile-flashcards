import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import { clearNotification } from '../notifications/index';
import DataStore from '../data/DataStore';
import { Text, View, Button } from 'react-native';
import Quiz from './Quiz';
import styles from '../styles/quiz';

// displays a card question
// an option to view the answer (flips the card)
// an option to view the question (flips the card)
// a "Correct" button
// an "Incorrect" button
// the number of cards left in the quiz
// Displays the percentage correct once the quiz is complete
class QuizContainer extends Component {

	constructor(props) {
		super(props);

		this.state =
			this.buildInitialState(
				props.current.deck);
	}

	buildInitialState = (deck) => ({
		deck,
		curCardNumber: 1,
		numCorrect: 0,
		numAnswered: 0,
		showingQuestion: true
	});

	deriveStateFrom = (state) => {
		const {
			deck,
			curCardNumber,
			numCorrect,
			numAnswered,
			showingQuestion
		} = { ...state };

		const totalCardNumbers = deck.questions.length;
		const percentCorrect = numAnswered ? numCorrect / numAnswered * 100.0 : 100.0;
		const percentComplete = totalCardNumbers ? numAnswered / totalCardNumbers * 100.0 : 0.0;
		const isComplete = numAnswered >= totalCardNumbers;
		const completedOn = isComplete ? Date.now() : undefined;
		const curCard = curCardNumber > 0 && curCardNumber <= totalCardNumbers ?
			deck.questions[curCardNumber - 1] : 
			null;

		return {
			deck,
			curCardNumber,
			totalCardNumbers,
			numCorrect,
			numAnswered,
			percentCorrect,
			percentComplete,
			isComplete,
			curCard,
			completedOn,
			showingQuestion
		};
	};

	static navigationOptions = ({ navigation }) => ({
		title: `${navigation.getParam('deck', {}).title} Quiz`
	});

	completeQuiz = (results) => {

		DataStore.saveQuiz(results);

		this.props.completeQuiz(results);

		clearNotification();
	};

	getAnsweredState = (prevState, isCorrect) => {
		const {
			curCardNumber,
			numCorrect,
			numAnswered,
			isComplete,
			completedOn
		} = this.deriveStateFrom(prevState);

		return {
			curCardNumber: curCardNumber + (isComplete ? 0 : 1),
			numAnswered: numAnswered + 1,
			numCorrect: numCorrect + (isCorrect ? 1 : 0),
			completedOn,
			showingQuestion: true };
	};

	checkForQuizComplete = () => {
		const {
			deck,
			percentComplete,
			isComplete,
			completedOn
		} = this.deriveStateFrom(this.state);

		if (isComplete)
			this.completeQuiz({
				title: deck.title,
				percentComplete,
				completedOn});
	};

	processAnswer = (isCorrect) =>
		this.setState(
			prevState => this.getAnsweredState(prevState, isCorrect), 
			this.checkForQuizComplete);

	restartQuiz = (deck) =>
		this.setState(
			this.buildInitialState(deck));

	goBack = () =>
		this.props.navigation.pop();

	flipCard = () =>
		this.setState(prevState => ({
			showingQuestion: !prevState.showingQuestion
		}));
	
	render() {
		const {
			deck,
			totalCardNumbers,
			percentCorrect,
			percentComplete,
			isComplete,
			curCard,
			curCardNumber,
			showingQuestion
		} = this.deriveStateFrom(this.state);

		return (
			<Quiz 
				deck={deck}
				totalCardNumbers={totalCardNumbers}
				percentCorrect={percentCorrect}
				percentComplete={percentComplete}
				isComplete={isComplete}
				curCard={curCard}
				curCardNumber={curCardNumber}
				showingQuestion={showingQuestion}

				flipCard={this.flipCard}
				processAnswer={this.processAnswer}
				restartQuiz={this.restartQuiz}
				goBack={this.goBack}
			/>
		);
	}
}

const mapStateToProps = ({ quizes }) => ({
	current: (quizes || {}).current
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(QuizContainer);
