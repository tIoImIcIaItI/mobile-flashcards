import { createStackNavigator } from 'react-navigation';
import Decks from './components/Decks';
import Deck from './components/Deck';
import AddDeck from './components/AddDeck';
import AddCard from './components/AddCard';
import Quiz from './components/Quiz';

export default Navigator = createStackNavigator({
    Decks: { screen: Decks },
    Deck: { screen: Deck },
    AddDeck: { screen: AddDeck },
    AddCard: { screen: AddCard },
    Quiz: { screen: Quiz },
  });
