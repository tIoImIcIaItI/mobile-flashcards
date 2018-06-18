import { createStackNavigator } from 'react-navigation';
import Decks from './Decks';
import Deck from './Deck';
import AddDeck from './AddDeck';
import AddCard from './AddCard';
import Quiz from './Quiz';

export default Navigator = createStackNavigator({
	Decks: { screen: Decks },
	Deck: { screen: Deck },
	AddDeck: { screen: AddDeck },
	AddCard: { screen: AddCard },
	Quiz: { screen: Quiz },
});
