import DataStore from '../data/DataStore';
import { DECKS_LOADED, DECK_ADDED, CARD_ADDED } from './types';

export const getDecks = () => (dispatch) => 
	DataStore.getDecks().
		then(decks => dispatch(decksLoaded(decks))).
		catch(console.error);

export function decksLoaded(decks) {
	return {
		type: DECKS_LOADED,
		decks
	};
}

export const newDeck = (title) => (dispatch) => 
	DataStore.saveDeckTitle(title).
		then(() => DataStore.getDeck(title)).
		then(deck => dispatch(deckAdded(title, deck))).
		catch(console.error);

export function deckAdded(title, deck) {
	return {
		type: DECK_ADDED,
		title, deck
	};
}

export const addCardToDeck = (title, card) => (dispatch) => 
	DataStore.addCardToDeck(title, card).
		then(() => dispatch(cardAdded(title, card))).
		catch(console.error);

export function cardAdded(title, card) {
	return {
		type: CARD_ADDED,
		title, card
	};
}
