import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import Login from './Login';
import * as authActions from '../actions/authActions';
import { Button, Modal, ModalBody, ModalFooter , ModalTitle} from 'react-bootstrap';
import ModalLogin from './commons/ModalLogin';
import { bindActionCreators } from 'redux';
var $ = require("jquery");


class SubHeader extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: ""
        }
    }

    componentWillMount() {
        let token = localStorage.getItem('token');
        if(token) {
            this.props.authActions.getUserInfo();
            this.setState({username: this.props.user.username});
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({username: nextProps.user.username});
    }

    onLogout = () => {
        this.props.authActions.onLogout();
        window.location.reload(true);
    }

    render() {
        return (
            <nav className="navbar navbar-default" style={{ background: '#e5101d', position: 'fixed', top: '0', width: '100%', zIndex: '1000',borderColor: '#e5101d', borderRadius: '0' }}>
                <div className="container-fluid">

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav navbar-right">
                            {
                                this.state.username == "" ?
                                <li style={{display: 'flex'}}>
                                    <Link to="/login" style={{ color: "white", paddingRight: '0px' }}>Đăng nhập&nbsp;|&nbsp;</Link>
                                    <Link to="/register" style={{ color: "white", paddingLeft: '0px' }}> Đăng ký</Link>
                                </li>
                                :
                                <li><Link to="/" style={{ color: "white" }} onClick={this.onLogout}>Đăng xuất</Link></li>
                            }
                            <li>
                                <Link to="/"
                                style={{ color: "white", textDecoration: 'none' }}
                                >{this.state.username}</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        authActions: bindActionCreators(authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader);
