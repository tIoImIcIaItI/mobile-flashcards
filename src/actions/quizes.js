import { QUIZ_STARTED } from './types';

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
