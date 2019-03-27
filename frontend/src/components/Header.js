import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import Login from './Login';
import * as actions from '../actions/index';
import { Button, Modal, ModalBody, ModalFooter , ModalTitle} from 'react-bootstrap';
import ModalLogin from './commons/ModalLogin';
var $ = require("jquery");


class Header extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }


    onLogout = () => {
        this.props.onLogout();
        window.location.reload(true);
    }

    render() {
        return (
            <nav className="navbar navbar-default" style={{ background: 'darkred', position: 'fixed', top: '0', width: '100%', zIndex: '1000' }}>
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#" style={{ color: "white" }}>Gun</a>
                    </div>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li className="active"><a href="#" style={{ color: "white" }}>Kiểm tra đơn hàng <span className="sr-only">(current)</span></a></li>
                            <li><a href="#" style={{ color: "white" }}>Khuyến mãi</a></li>
                            <li><a href="#" style={{ color: "white" }}>Đặt hàng</a></li>
                        </ul>
                        <form className="navbar-form navbar-left">
                            <div className="form-group">
                                <input type="text" className="form-control" placeholder="Search" />
                            </div>
                            <button type="submit" className="btn btn-default">Submit</button>
                        </form>
                        <ul className="nav navbar-nav navbar-right">
                            <li><Link to="#" style={{ color: "white" }}>Sản phẩm vừa xem</Link></li>
                            {
                                this.props.isAuthenticated.token == null ? 
                                <li><Link to="/login" style={{ color: "white" }}>Đăng nhập | đăng ký</Link></li>
                                
                                :
                                <li><Link to="/" style={{ color: "white" }} onClick={this.onLogout}>Đăng xuất</Link></li>
                            }
                            {/* <li className="dropdown">
                                <a style={{ color: "white" }} href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Giúp đỡ <span className="caret"></span></a>
                                <ul className="dropdown-menu">
                                    <li><Link to="#" style={{ color: "white" }}>Chế độ bảo hành</Link></li>
                                    <li><Link to="#" style={{ color: "white" }}>Liên lạc</Link></li>
                                </ul>
                            </li> */}
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
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        onTryAutoSignup:() => {
            dispatch(actions.authCheckState());
        },
        onLogout: () => {
            dispatch(actions.logout());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
