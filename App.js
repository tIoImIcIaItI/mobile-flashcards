import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from './src/reducers/index';
import AppInit from './src/components/AppInit';

// Allow users to create a deck which can hold an unlimited number of cards.
// Allow users to add a card to a specific deck.
// The front of the card should display the question.
// The back of the card should display the answer.
// Users should be able to quiz themselves on a specific deck and receive a score once they're done.
// Users should receive a notification to remind themselves to study if they haven't already for that day.

const loggerMiddleware = createLogger({
	predicate: (getState, action) => __DEV__
});

const configureStore = (initialState) =>
	createStore(
		reducer,
		initialState,
		compose(
			applyMiddleware(
				thunkMiddleware,
				loggerMiddleware))
	);

export default class App extends Component {

	store = configureStore({});

	render() {
		return (
			<Provider store={this.store}>
				<AppInit />
			</Provider>
		);
	}
}
