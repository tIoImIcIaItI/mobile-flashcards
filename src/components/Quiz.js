import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import { clearNotification } from '../notifications/index';
import DataStore from '../data/DataStore';
import { Text, View, Button } from 'react-native';
import QuizCard from './QuizCard';
import styles from '../styles/quiz';

// displays a card question
// an option to view the answer (flips the card)
// an option to view the question (flips the card)
// a "Correct" button
// an "Incorrect" button
// the number of cards left in the quiz
// Displays the percentage correct once the quiz is complete
class Quiz extends Component {

	constructor(props) {
		super(props);

		this.state =
			this.buildInitialState(
				props.current.deck);
	}

	buildInitialState = (deck) => ({
		deck,
		curCard: deck.questions.length > 0 ? deck.questions[0] : null,
		curCardNumber: 1,
		totalCardNumbers: deck.questions.length,
		numCorrect: 0,
		numAnswered: 0,
		percentComplete: 0.0,
		percentCorrect: 100.0
	});

	static navigationOptions = ({ navigation }) => ({
		title: `${navigation.getParam('deck', {}).title} Quiz`
	});

	completeQuiz = (results) => {

		DataStore.saveQuiz(results);

		this.props.completeQuiz(results);

		clearNotification();
	};

	correct = () => {
		const { deck, totalCardNumbers } = this.state;
		let { curCard, curCardNumber, numCorrect, numAnswered } = this.state;

		numCorrect += 1;
		numAnswered += 1;

		const percentCorrect = numCorrect / numAnswered * 100.0;
		const percentComplete = numAnswered / totalCardNumbers * 100.0;

		if (curCardNumber < totalCardNumbers) {

			curCardNumber += 1;
			curCard = deck.questions[curCardNumber - 1];

			this.setState({
				curCard, curCardNumber, numCorrect, numAnswered,
				percentCorrect, percentComplete,
			});
		} else {

			curCard = null;
			const completedOn = Date.now();

			this.setState({
				curCard, curCardNumber, numCorrect, numAnswered,
				percentCorrect, percentComplete, completedOn
			});

			this.completeQuiz({
				title: deck.title,
				percentCorrect,
				completedOn
			});
		}
	};

	incorrect = () => {
		const { deck, totalCardNumbers, numCorrect } = this.state;
		let { curCard, curCardNumber, numAnswered } = this.state;

		numAnswered += 1;

		const percentCorrect = numCorrect / numAnswered * 100.0;
		const percentComplete = numAnswered / totalCardNumbers * 100.0;

		if (curCardNumber < totalCardNumbers) {

			curCardNumber += 1;
			curCard = deck.questions[curCardNumber - 1];

			this.setState({
				curCard, curCardNumber, numAnswered,
				percentCorrect, percentComplete,
			});
		} else {

			curCard = null;
			const completedOn = Date.now();

			this.setState({
				curCard, curCardNumber, numCorrect, numAnswered,
				percentCorrect, percentComplete, completedOn
			});

			this.completeQuiz({
				title: deck.title,
				percentCorrect,
				completedOn
			});
		}
	};

	restartQuiz = (deck) => {
		this.setState(
			this.buildInitialState(deck));
	};

	goBack = () => {
		this.props.navigation.pop();
	};

	render() {
		if (!this.props.current)
			return (<View />);

		const {
			deck,
			curCard,
			curCardNumber,
			totalCardNumbers,
			percentComplete,
			percentCorrect,
			completedOn } = this.state;

		return (
			<View style={styles.container}>

				{curCard && <Button
					title='Restart'
					onPress={() => this.restartQuiz(deck)} />}

				<View style={styles.progressContainer}>
					<Text>{`${percentComplete} % complete`}</Text>

					<Text>{`${percentCorrect} % correct`}</Text>
				</View>

				{curCard && <QuizCard
					curCardNumber={curCardNumber}
					totalCardNumbers={totalCardNumbers}
					question={curCard.question}
					answer={curCard.answer} />}

				{curCard && <View style={styles.assessmentContainer}>

					<Button
						title='Incorrect'
						color='red'
						onPress={() => this.incorrect()} />

					<Button
						title='Correct'
						color='green'
						onPress={() => this.correct()} />

				</View>}

				{completedOn && <Button
					title='Back to Deck'
					onPress={() => this.goBack()} />}

			</View>
		);
	}
}

const mapStateToProps = (state, { navigation }) => ({
	current: (state.quizes || {}).current
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
