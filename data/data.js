const data =
  {
    React: {
      title: 'React',
      questions: [
        {
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
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  };

// To manage your AsyncStorage database, you'll want to create four different helper methods.
// getDecks: return all of the decks along with their titles, questions, and answers. 
// getDeck: take in a single id argument and return the deck associated with that id. 
// saveDeckTitle: take in a single title argument and add it to the decks. 
// addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 

class DataStore {

  static decks = data;//{};

  // static addSampleData = () => {
  //   DataStore.decks = data;
  //   return DataStore.decks;
  // };

  // getDecks: return all of the decks along with their titles, questions, and answers. 
  static getDecks = () => {
    return DataStore.decks;
  };

  // getDeck: take in a single id argument and return the deck associated with that id. 
  static getDeck = (title) => {
    return DataStore.decks[title];
  };

  // saveDeckTitle: take in a single title argument and add it to the decks. 
  static saveDeckTitle = (title) => {
    DataStore.decks[title] = {
      title,
      questions: []
    };
  };

  // addCardToDeck: take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 
  static addCardToDeck = (title, card) => {
    DataStore.decks[title].questions.push(card);
  };

}

export default DataStore;
