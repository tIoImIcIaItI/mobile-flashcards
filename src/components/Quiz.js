import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Button } from 'react-native';
import QuizCard from './QuizCard';
import styles from '../styles/quiz';

const Quiz = (props) => {
    const {
        deck,
        curCard,
        
        totalCardNumbers,
        percentCorrect,
        percentComplete,
        isComplete,
        curCardNumber,
        showingQuestion,
        
        flipCard,
        processAnswer,
        restartQuiz,
        goBack
    } = props;

    const complete = Math.trunc(percentComplete);
    const correct = Math.trunc(Math.round(percentCorrect));

    return (
        <View style={styles.container}>

            {!isComplete && <View style={styles.progressContainer}>
                <Text>{`${complete} % complete`}</Text>

                <Text>{`${correct} % correct`}</Text>
            </View>}

            {curCard && <QuizCard
                showingQuestion={showingQuestion}
                curCardNumber={curCardNumber}
                totalCardNumbers={totalCardNumbers}
                question={curCard.question}
                answer={curCard.answer}
                flipCard={flipCard} />}

            {curCard && <View style={styles.assessmentContainer}>
                <Button
                    title='Incorrect'
                    color='#721c24'
                    onPress={() => processAnswer(false)} />

                <Button
                    title='Correct'
                    color='#155724'
                    onPress={() => processAnswer(true)} />
            </View>}

            {isComplete && <View style={styles.scoreContainer}>
                <Text style={styles.finalScore}>{`${correct} %`}</Text>
            </View>}

            {isComplete && <View style={styles.quizCompleteOptionsContainer}>
                <Button
                    title='Restart Quiz'
                    onPress={() => restartQuiz(deck)} />

                <Button
                    title='Back to Deck'
                    onPress={() => goBack()} />
            </View>}

        </View>
    );
};

Quiz.propTypes = {
    deck: PropTypes.object.isRequired,
    curCard: PropTypes.object/*.isOptional*/,

    totalCardNumbers: PropTypes.number.isRequired,
    percentCorrect: PropTypes.number.isRequired,
    percentComplete: PropTypes.number.isRequired,
    isComplete: PropTypes.bool.isRequired,
    curCardNumber: PropTypes.number.isRequired,
    showingQuestion: PropTypes.bool.isRequired,
    
    flipCard: PropTypes.func.isRequired,
    processAnswer: PropTypes.func.isRequired,
    restartQuiz: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
};

export default Quiz;
