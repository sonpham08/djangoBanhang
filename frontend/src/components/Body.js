import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';
import AdminHome from './admin/AdminHome';
var $ = require("jquery");

const usersInitial = {

}

class Body extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.authActions.authCheckState();
    }

    render() {
        if(this.props.user.is_superuser == true) return <AdminHome/>
            return <Home/>
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
