import { combineReducers } from 'redux';
import { DECKS_LOADED } from '../actions/types';

const initialState = {
	decks: {}
}

const decks = (state = initialState, action) => {
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

export default reducer = combineReducers({
  decks,
});
