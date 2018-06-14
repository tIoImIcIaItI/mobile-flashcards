import DataStore from '../data/DataStore';
import { DECKS_LOADED } from './types';

export const getDecks = () => (dispatch) => 
	DataStore.
		addSampleData().
		then(() => DataStore.getDecks()).
		then(decks => dispatch(decksLoaded(decks))).
		catch(console.error);

export function decksLoaded(decks) {
	return {
		type: DECKS_LOADED,
		decks
	};
}
