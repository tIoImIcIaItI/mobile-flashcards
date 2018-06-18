import React, { Component } from 'react';
import { Text, View, FlatList, Button } from 'react-native';
import styles from '../styles/deck-summary';

// displays the title of each Deck
// displays the number of cards in each deck
const DeckSummary = (props) => {
	const { 
		deck: { title, questions }, 
		onView 
	} = props;

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

export default DeckSummary;
