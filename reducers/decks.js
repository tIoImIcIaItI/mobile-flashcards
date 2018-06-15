import { DECKS_LOADED, DECK_ADDED, CARD_ADDED } from '../actions/types';

const decks = (state = {}, action) => {
	switch (action.type) {

		case DECKS_LOADED: {
			return {
				...state,
				decks: action.decks
			};
		}
		case DECK_ADDED: {
			const res = { ...state };
			res.decks = { ...res.decks };
			res.decks[action.title] = action.deck;
			return res;
		}
		case CARD_ADDED: {
			const res = { ...state };
			res.decks = { ...res.decks };
			res.decks[action.title] = { ...res.decks[action.title] };
			res.decks[action.title].questions = [ ...res.decks[action.title].questions ];
			res.decks[action.title].questions.push(action.card);
			return res;
		}
		default:
			return state;
	}
};

export default decks;
