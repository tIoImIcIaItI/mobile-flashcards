import { QUIZ_STARTED } from '../actions/types';

const quizes = (state = {}, action) => {
	switch (action.type) {

		case QUIZ_STARTED: {
			return {
				...state,
				current: action.quiz
			};
		}
		default:
			return state;
	}
};

export default quizes;
