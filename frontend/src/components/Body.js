import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import { bindActionCreators } from 'redux';
import * as authActions from '../actions/authActions';
import AdminHome from './admin/AdminHome';
import StaffHome from './staff/StaffHome';
import Footer from './Footer';
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
        if(this.props.user.is_superuser == true) {
            return (
                <AdminHome/>
            )
                
        } else {
            if(this.props.user.is_staff_gun == true) {
                return (
                    <StaffHome/>
                )
            } else {
                return (
                    <div>
                        <Home/>
                        <Footer/>
                    </div>
                )
            }
        }
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
