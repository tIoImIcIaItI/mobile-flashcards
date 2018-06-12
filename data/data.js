import {
  AsyncStorage
} from 'react-native';

const data = {
  React: {
    title: 'React',
    questions: [{
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [{
      question: 'What is a closure?',
      answer: 'The combination of a function and the lexical environment within which that function was declared.'
    }]
  }
};

// To manage your AsyncStorage database, you'll want to create four different helper methods.
// getDecks: return all of the decks along with their titles, questions, and answers. 
// getDeck: take in a single id argument and return the deck associated with that id. 
// saveDeckTitle: take in a single title argument and add it to the decks. 
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 

// Converts an array of arrays of key/value pairs into a single object with the keys as properties
const objectFromKeyValues = (entries) =>
  (entries || []).reduce((res, entry) => ({ ...res,
    [entry[0]]: entry[1]
  }), {});


class DataStore {

  // static decks = {};

  static addSampleData = () => {
    // DataStore.decks = data;
    // return DataStore.decks;
    return AsyncStorage.clear(error => {
      if (error) {
        console.error(`Failed to clear(): ${error}`);
        throw new Error(error);
      }

      Object.entries(data || {}).forEach(entry => {
        const { title, deck } = entry;
        await DataStore.addDeck(title, deck);
      });
    });
  };

  // getDecks: return all of the decks along with their titles, questions, and answers. 
  static getDecks = async () => {
    // return DataStore.decks;
    let res = {};

    await AsyncStorage.getAllKeys((error, keys) => {

      if (error || !keys || !keys.length) {
        console.error(`Failed to getAllKeys: ${error}`);
        throw new Error(error);
        // return;
      }

      await AsyncStorage.multiGet(keys, (error, entries) => {

        if (error || !entries || !entries.length) {
          console.error(`Failed to multiGet: ${error}`);
          throw new Error(error);
          // return;
        }

        entries = entries.map(entry => [entry[0], JSON.parse(entry[1] || '')]);

        res = objectFromKeyValues(entries);
      });
    });

    return res;
  };

  // getDeck: take in a single id argument and return the deck associated with that id. 
  static getDeck = async (title) => {
    if (!title || !title.length) throw new Error('Title must be non-empty');
    // return DataStore.decks[title];
    let res = null;

    await AsyncStorage.getItem(title, (error, result) => {
      if (error || !result) {
        console.error(`Failed to getItem(${title}): ${error}`);
        throw new Error(error);
        // return;
      }

      res = JSON.parse(result || '');
    });

    return res;
  };

  // saveDeckTitle: take in a single title argument and add it to the decks. 
  static saveDeckTitle = async (title) => {
    if (!title || !title.length) throw new Error('Title must be non-empty');
    // DataStore.decks[title] = {
    //   title,
    //   questions: []
    // };
    const value = {
      title,
      questions: []
    };

    await AsyncStorage.setItem(title, JSON.stringify(value), error => {
      if (error) {
        console.error(`Failed to setItem(${title}): ${error}`);
        throw new Error(error);
      }
    });
  };

  // addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 
  static addCardToDeck = async (title, card) => {
    if (!title || !title.length) throw new Error('Title must be non-empty');
    if (!card) throw new Error('Card must be something');
    // DataStore.decks[title].questions.push(card);
    let res = null;

    const update = {
      questions: [card]
    };

    await AsyncStorage.mergeItem(title, update, error => {
      if (error) {
        console.error(`Failed to setItem(${title}): ${error}`);
        throw new Error(error);
      }

      res = await DataStore.getDeck(title);

    });

    return res;
  };

  // saveDeckTitle: take in a single title argument and add it to the decks. 
  static addDeck = async (title, deck) => {
    if (!title || !title.length) throw new Error('Title must be non-empty');
    if (!deck) throw new Error('Deck must be something');

    await AsyncStorage.setItem(title, JSON.stringify(deck), error => {
      if (error) {
        console.error(`Failed to setItem(${title}): ${error}`);
        throw new Error(error);
      }
    });
  };

}

export default DataStore;
