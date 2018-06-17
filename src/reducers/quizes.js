import { QUIZ_STARTED, QUIZ_COMPLETED } from '../actions/types';

const quizes = (state = {}, action) => {
	switch (action.type) {

		case QUIZ_STARTED: {
			return {
				...state,
				current: { deck: action.deck }
			};
		}
		case QUIZ_COMPLETED: {
			const quiz = action.quiz;

			const title = 
				quiz.title;

			const day = new Date(quiz.completedOn).
				toISOString().
				substring(0, 'YYYY-MM-DD'.length);

			const results = {
				completedOn: quiz.completedOn,
				percentCorrect: quiz.percentCorrect,
			};

			const res = { ...state };
			res.completed = { ...res.completed };
			res.completed[day] = { ...res.completed[day] };
			res.completed[day][title] = res.completed[day][title] ? 
				[ ...res.completed[day][title] ] : [];
			res.completed[day][title].push(results);
			return res;
		}
		default:
			return state;
	}
};

export default quizes;
