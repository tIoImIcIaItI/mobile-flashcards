import { QUIZ_STARTED, QUIZ_COMPLETED } from './types';

export const startNewQuiz = (deck) => (dispatch) => {
    const quiz = {
        deck,
        curCard: deck.questions.length > 0 ? deck.questions[0] : null,
		curCardNumber: 1,
		totalCardNumbers: deck.questions.length,
        numCorrect: 0,
		numAnswered: 0,
		percentComplete: 0.0,
        percentCorrect: 100.0
    };
	dispatch(quizStarted(quiz));
}

export function quizStarted(quiz) {
	return {
		type: QUIZ_STARTED,
		quiz
	};
}

export const completeQuiz = (results) => (dispatch) => {
    const quiz = {
        ...results,
		completedOn: Date.now()
    };
	dispatch(quizCompleted(quiz));
}

export function quizCompleted(quiz) {
	return {
		type: QUIZ_COMPLETED,
		quiz
	};
}
