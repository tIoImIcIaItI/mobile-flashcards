import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import DataStore from '../data/DataStore';
import DeckSummary from './DeckSummary';

class Decks extends Component {

  static navigationOptions = {
    title: 'Decks'
  };

  state = {
    decks: {}
  };

  load = () =>
    DataStore.
      getDecks().
      then(decks => this.setState({ decks })).
      catch(console.error);

  async componentDidMount() { // TODO: remove this once we get redux set up
    await DataStore.
      addSampleData().
      then(() => this.load()).
      catch(console.error);
  }

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    const deck = item.value;

    return (
      <DeckSummary
        deck={deck}
        onView={() => navigation.navigate('Deck', { deck })}
      />);
  };

  render() {
    const { navigation } = this.props;
    const { decks } = this.state;

    const items =
      Object.entries(decks || {}).
        map(e => ({ key: e[0], value: e[1] }));

    return (
      <View style={styles.container}>

        <Button
          title='Refresh'
          onPress={() => this.load()}
        />

        <Button
          title='New Deck'
          onPress={() => navigation.navigate('AddDeck')}
        />

        <FlatList
          data={items}
          renderItem={this.renderItem}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Decks;
