import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ActionCreators } from './actions/index';
import Navigator from './Navigator';

class AppInit extends Component {

    componentDidMount() {
        this.props.getDecks();
    }

    render() {
        return (<Navigator />);
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(ActionCreators, dispatch);

export default connect(null, mapDispatchToProps)(AppInit);
