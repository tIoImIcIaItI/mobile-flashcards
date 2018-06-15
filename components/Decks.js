import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import DeckSummary from './DeckSummary';

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
    alignItems: 'stretch',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => ({
  decks: (state.decks || {}).decks
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Decks);
