import { QUIZ_STARTED, QUIZ_COMPLETED } from './types';

export const startNewQuiz = (deck) => (dispatch) => {
	dispatch(quizStarted(deck));
}

export function quizStarted(deck) {
	return {
		type: QUIZ_STARTED,
		deck
	};
}

export const completeQuiz = (results) => (dispatch) => {
	dispatch(quizCompleted(results));
}

export function quizCompleted(quiz) {
	return {
		type: QUIZ_COMPLETED,
		quiz
	};
}
