import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import Navigator from './Navigator';
import DataStore from '../data/DataStore';
import { setNotification, clearNotification } from '../notifications/index';

class AppInit extends Component {

    componentDidMount() {

        // DataStore.
        //     addSampleData().
        //     then(() => this.props.getDecks()).
        //     catch(console.error);
        this.props.getDecks();

        DataStore.
            hasTakenQuizOn(new Date()).
            then(answer => {
                if (!answer) {
                    const when = Date.now() + (1 * 60 * 1000);
                    // console.log(`setting notification for ${new Date(when)}`);
                    clearNotification().
                        then(() => setNotification(when, 'day'));
                } else {
                    // console.log('clearing notifications');
                    clearNotification();
                }
            }).
            catch(console.error);
    }

    render() {
        return (<Navigator />);
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(ActionCreators, dispatch);

export default connect(null, mapDispatchToProps)(AppInit);
