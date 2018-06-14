import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
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
        deck={deck}
        onView={() => navigation.navigate('Deck', { deck })}
      />);
  };

  render() {
    const { navigation, decks, getDecks } = this.props;

    console.log('\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n');
    console.log(Object.keys(decks));
    console.log(decks);
    console.log('\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n');

    const items =
      Object.entries(decks || {}).
        map(e => ({ key: e[0], value: e[1] }));

    return (
      <View style={styles.container}>

        <Button
          title='Refresh'
          onPress={() => getDecks()}
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

const mapStateToProps = (state) => ({
  decks: state.decks
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Decks);
