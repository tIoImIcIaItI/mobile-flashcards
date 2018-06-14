import { AsyncStorage } from 'react-native';
import Assert from '../utils/Assert';
import data from './sample-data';

// Converts a *small* array of arrays of key/value pairs into a single object with the keys as properties
const objectFromKeyValues = (entries) =>
	(entries || []).reduce((res, entry) => ({
		...res,
		[entry[0]]: entry[1]
	}), {});

const parseValue = (kvp = ['', '']) =>
	[kvp[0], JSON.parse(kvp[1])]

class DataStore {

	static addSampleData = () =>
		AsyncStorage.
			clear().
			then(() => Object.entries(data)).
			then(entries => entries.map(entry => DataStore.addDeck(...entry))).
			then(Promise.all).
			catch(console.error);

	static addDeck = (title, deck) => {
		Assert.notEmpty('title', title);
		Assert.notNothing('deck', deck);

		return AsyncStorage.
			setItem(title, JSON.stringify(deck)).
			catch(console.error);
	};

	// Return all of the decks along with their titles, questions, and answers. 
	static getDecks = () =>
		AsyncStorage.
			getAllKeys().
			then(keys => AsyncStorage.multiGet(keys)).
			then(kvps => kvps.map(parseValue)).
			then(objectFromKeyValues).
			catch(console.error);

	// Take in a single id argument and return the deck associated with that id. 
	static getDeck = (title) => {
		Assert.notEmpty('title', title);

		return AsyncStorage.
			getItem(title).
			then(JSON.parse).
			catch(console.error);
	};

	// Take in a single title argument and add it to the decks. 
	static saveDeckTitle = (title) => {
		Assert.notEmpty('title', title);

		const value = {
			title,
			questions: []
		};

		return AsyncStorage.
			setItem(title, JSON.stringify(value)).
			catch(console.error);
	};

	// Take in two arguments, title and card, 
	// and add the card to the list of questions for the deck with the associated title. 
	static addCardToDeck = (title, card) => {
		Assert.notEmpty('title', title);
		Assert.notNothing('card', card);

		return DataStore.getDeck(title).
			then(deck => ({ questions: [...deck.questions, card] })).
			then(update => AsyncStorage.mergeItem(title, JSON.stringify(update))).
			then(() => DataStore.getDeck(title)).
			catch(console.error);
	};

}

export default DataStore;
