import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../actions/index';
import Navigator from './Navigator';
import DataStore from '../data/DataStore';

class AppInit extends Component {

    componentDidMount() {
        DataStore.
            addSampleData().
            then(() => this.props.getDecks()).
            catch(console.error);
    }

    render() {
        return (<Navigator />);
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(ActionCreators, dispatch);

export default connect(null, mapDispatchToProps)(AppInit);
