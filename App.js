import React from 'react';
import { createStackNavigator } from 'react-navigation';
import Decks from './components/Decks';
import Deck from './components/Deck';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';
import DataStore from './data/data';

// Allow users to create a deck which can hold an unlimited number of cards.
// Allow users to add a card to a specific deck.
// The front of the card should display the question.
// The back of the card should display the answer.
// Users should be able to quiz themselves on a specific deck and receive a score once they're done.
// Users should receive a notification to remind themselves to study if they haven't already for that day.

await DataStore.addSampleData();

const App = createStackNavigator({
  Decks: { screen: Decks },
  Deck: { screen: Deck },
  AddDeck: { screen: AddDeck },
  AddCard: { screen: AddCard },
  Quiz: { screen: Quiz },
});

export default App;
