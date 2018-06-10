import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Button } from 'react-native';

// displays the title of each Deck
// displays the number of cards in each deck
class DeckSummary extends Component {

  render() {

    const { deck, onView } = this.props;
    const { title, questions } = deck;

    return (
      <View style={styles.item}>

        <Text style={styles.title}>{title}</Text>

        <Text style={styles.count}>{(questions || []).length} Cards</Text>

        <Button
          title={`View ${title}`}
          onPress={onView}
        />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    margin: 10
  },
  title: {
    fontWeight: '500',
    padding: 10,
    fontSize: 16,
    height: 44,
  },
  count: {
    padding: 10,
    fontSize: 16,
    height: 44,
  },
});

export default DeckSummary;
