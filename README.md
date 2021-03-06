# Mobile Flashcards

## Project Overview
For the UdaciCards project, you will build a mobile application for Android that allows users to study collections of flashcards. The app will allow users to create different categories of flashcards called "decks", add flashcards to those decks, then take quizzes on those decks.

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

## Functionality
* Allow users to create a deck which can hold an unlimited number of cards.
* Allow users to add a card to a specific deck.
* The front of the card should display the question.
* The back of the card should display the answer.
* Users should be able to quiz themselves on a specific deck and receive a score once they're done.
* Users should receive a notification to remind themselves to study if they haven't already for that day.

## Quick Start
The app has been tested *only* on the Android Studio default emulator (Nexus 5).
1. `yarn install`
2. `yarn run android`

## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `yarn start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

#### `yarn run android`

Like `yarn start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup).
