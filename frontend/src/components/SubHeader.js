import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import Login from './Login';
import * as authActions from '../actions/authActions';
import { Button, Modal, ModalBody, ModalFooter , ModalTitle} from 'react-bootstrap';
import ModalLogin from './commons/ModalLogin';
import { bindActionCreators } from 'redux';
import Avatar from 'react-avatar';
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
        this.props.onLogout();
    }

    openFormCustomUser = () => {
        
        if(this.refs.dropdownmenu.style.display == 'none') {
            this.refs.dropdownmenu.style.display = 'block';
        }else {
            this.refs.dropdownmenu.style.display = 'none';
        }
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
                            <div className="dropdown" style={{float:'right', marginTop: '10px'}}>
                            <li>
                                <Link to="/"
                                style={{ color: "white", textDecoration: 'none', padding: '10px', background: "#e5101d" }}
                                id="my-dropdown" 
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                onClick={this.openFormCustomUser}
                                >{this.state.username}
                                <Avatar 
                                    name={this.state.username} 
                                    round="80px" size="30"
                                    style={{marginLeft: '10px'}}
                                />
                                </Link>
                                
                            </li>
                            <ul className="dropdown-menu" ref="dropdownmenu">
                                <li className="p-d-10"><i className="fas fa-key"><Link to="/changepass"> Đổi mật khẩu</Link></i></li>
                            </ul>
                            </div>
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
