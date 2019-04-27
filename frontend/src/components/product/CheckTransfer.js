import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import * as authActions from '../../actions/authActions';
import * as userActions from '../../actions/userActions';
// import { Button, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import SubHeader from '../SubHeader';
import InfoBox from './InfoBox';
var $ = require("jquery");


class CheckTransfer extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            tab: 0,
        }
    }

    componentWillMount() {
        let token = localStorage.getItem('token');
        if(token != undefined) {
            this.props.authActions.getUserInfo();
        }
    }

    componentDidMount() {
        let tab = localStorage.getItem('tab');
        this.setState({tab: tab});
    }

    open (e,tab) {
        e.preventDefault();
        if(tab == 'personal' && $("#personal").hasClass('active') == false) {
            localStorage.setItem('tab', 1);
            this.setState({tab: 1});
            // $(".side nav li").removeClass("active");
            // $("#personal").addClass("active");
        }
           
        if(tab == 'transfer' && $("#transfer").hasClass('active') == false) {
            localStorage.setItem('tab', 2);
            this.setState({tab: 2});
        }
            
    }

    changeInfo = (user_info) => {
        console.log(user_info);
        this.props.userActions.changeInfo(user_info);
    }

    render() {
        return (
            <div style={{ background: 'gainsboro' }}>
                <SubHeader/>
                
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <div className="collapse navbar-collapse navbar-ex1-collapse">
                        <ul className="nav navbar-nav side-nav">
                            <li>
                                <Link to="/">GUN</Link>
                            </li>
                            <li id="personal">
                                <Link to="#" 
                                className={this.state.tab == 1 ? "active":""}
                                onClick={(e) => this.open(e,'personal')}><i className="fa fa-fw fa-user-plus"></i>Thông tin cá nhân</Link>
                            </li>
                            <li id="transfer">
                                <Link to="#"
                                className={this.state.tab == 2 ? "active":""}
                                 onClick={(e) => this.open(e,'transfer')}><i className="fa fa-fw fas fa-file"></i> Kiểm tra đơn hàng</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                
                {/* Personal */}
                {this.state.tab == 1 &&
                    <InfoBox
                    user={this.props.user}
                    changeInfo={this.changeInfo}/> 
                }
                
                {this.state.tab == 2 &&
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10" style={{marginTop: '63px'}}>
                    <div className="pn-right">
                        
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Mã đơn</th>
                                        <th>Ngày đặt</th>
                                        <th>Tình trạng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>son</td>
                                        <td>son</td>
                                        <td>son</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckTransfer);
