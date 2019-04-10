import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import * as authActions from '../../actions/authActions';
import { Button, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import Header from '../Header';
import MenuCategory from '../MenuCategory';
import AllSale from './AllSale';
import SpecialDaySale from './SpecialDaySale';
import { bindActionCreators } from 'redux';

var $ = require("jquery");


class Sale extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
        }
    }


    onLogout = () => {
        this.props.authActions.logout();
        window.location.reload(true);
    }

    getUserInfo = () => {
        this.props.authActions.getUserInfo();
    }

    render() {
        var {isAuthenticated,user} = this.props;
        return (
            <div style={{ background: 'gainsboro' }}>
                <Header 
                isAuthenticated={isAuthenticated}
                user={user}
                getUserInfo={this.getUserInfo}
                logout={this.onLogout}/>
                <MenuCategory />
                <div role="tabpanel" style={{ marginTop: '150px' }}>

                    <ul className="nav nav-tabs" role="tablist">
                        <li role="presentation" className="active width33">
                            <a href="#home" aria-controls="home" role="tab" data-toggle="tab" className="title_tab">Tất cả khuyến mãi</a>
                        </li>
                        <li role="presentation" className="width33">
                            <a href="#special_day" aria-controls="tab" role="tab" data-toggle="tab" className="title_tab">Khuyến mãi dịp lễ</a>
                        </li>
                        <li role="presentation" className="width33">
                            <a href="#inventory" aria-controls="tab" role="tab" data-toggle="tab" className="title_tab">Giảm giá hàng tồn kho</a>
                        </li>
                    </ul>


                    <div className="tab-content" id="tab-content-sale">
                        <div role="tabpanel" className="tab-pane active" id="home">
                            {/* Product sale for all */}
                            <AllSale/>
                        </div>
                        <div role="tabpanel" className="tab-pane" id="special_day">
                            {/* Product sale for SpecialDay */}
                            <SpecialDaySale/>
                        </div>
                        <div role="tabpanel" className="tab-pane" id="inventory">
                            {/* Product sale for SpecialDay */}
                            tab
                        </div>
                    </div>
                </div>
            </div>

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
        // onTryAutoSignup: () => {
        //     dispatch(actions.authCheckState());
        // },
        // onLogout: () => {
        //     dispatch(actions.logout());
        // }
        authActions: bindActionCreators(authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sale);
