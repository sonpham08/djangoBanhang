import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter , ModalTitle} from 'react-bootstrap';

import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
var $ = require("jquery");


class AdminHeader extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: "",
            token: null
        }
    }

    componentWillMount() {
        let token = localStorage.getItem('token');
        if(token) {
            this.props.getUserInfo();
            this.setState({
                username: this.props.user.username,
                token: this.props.isAuthenticated
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user) {
            this.setState({
                username: nextProps.user.username,
                token: nextProps.isAuthenticated
            });
        }
        
    }

    onLogout = () => {
        this.props.logout();
        window.location.reload(true);
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
                                this.state.token == null ?
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

export default AdminHeader;
