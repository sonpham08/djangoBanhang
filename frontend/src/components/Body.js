import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import * as actions from '../actions/index';
var $ = require("jquery");

const usersInitial = {

}

class Body extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.onTryAutoSignup();
    }


    render() {
        return <Home/> 
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onTryAutoSignup:() => {
            dispatch(actions.authCheckState());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
