import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import { Text, View, FlatList, Button } from 'react-native';
import DeckSummary from './DeckSummary';
import styles from '../styles/decks';

class Decks extends Component {

  static navigationOptions = {
    title: 'Decks'
  };

  renderItem = ({ item }) => {
    const { navigation } = this.props;
    const deck = item.value;

    return (
      <DeckSummary
        key={deck.title}
        deck={deck}
        onView={() => navigation.navigate('Deck', { deck })}
      />);
  };

  render() {
    const { navigation, decks, getDecks } = this.props;

    const items =
      Object.entries(decks || {}).
        map(e => ({ key: e[0], value: e[1] }));

    return (
      <View style={styles.container}>

        <Button
          style={styles.newDeck}
          title='New Deck'
          onPress={() => navigation.navigate('AddDeck')}
        />

        <FlatList
          style={styles.decksList}
          data={items}
          renderItem={this.renderItem}
        />

      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  decks: (state.decks || {}).decks
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Decks);
