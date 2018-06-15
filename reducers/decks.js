import { DECKS_LOADED } from '../actions/types';

const decks = (state = { }, action) => {
	switch (action.type) {

		case DECKS_LOADED:
			return {
				...state,
				decks: action.decks
			};

		default:
			return state;
	}
};

export default decks;
