import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions';
import * as adminActions from '../../actions/adminActions';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminManage from './AdminManage';
import AdminSideMenu from './AdminSideMenu';

var $ = require("jquery");

class AdminHome extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            tab: 0, 
            resetAccepted: false
        }
    }

    componentWillMount() {
        this.props.adminActions.getListCategory();
        this.props.adminActions.getListProduct();
    }

    getUserInfo = () => {
        this.props.authActions.getUserInfo();
    }

    logout = () => {
        this.props.authActions.logout();
    }

    selectFormToOpen = (tab) => {
        this.setState({tab: tab});
    }

    addProduct = (name, price, quantity, size, weight, color, sound, memory,
    camera, pin, gurantee, promotion, start_promo, end_promo, category) => {
        this.props.adminActions.addProduct(name, price, quantity, size, weight, color, sound, memory,
            camera, pin, gurantee, promotion, start_promo, end_promo, category);
    }

    editProduct = (data) => {
        this.props.adminActions.editProduct(data);
    }

    deleteProduct = (product_id) => {
        this.props.adminActions.deleteProduct(product_id);
    }

    addCategory = (name) => {
        this.props.adminActions.addCategory(name);
    }

    onSaveCategory = (category) => {
        this.props.adminActions.editCategory(category);
    }

    deleteCategory = (category_id) => {
        this.props.adminActions.deleteCategory(category_id);
    }

    render() {
        var {isAuthenticated,user,adcategories, adproduct} = this.props;
        return (
            <div style={{background:'gainsboro'}} style={{paddingTop: '63px'}}>
                <AdminHeader
                isAuthenticated={isAuthenticated}
                user={user}
                getUserInfo={this.getUserInfo}
                logout={this.logout}/>
                <AdminSideMenu
                selectFormToOpen={this.selectFormToOpen}
                />
                <AdminManage
                adproduct={adproduct}
                adcategories={adcategories}
                tab={this.state.tab}
                addProduct={this.addProduct}
                editProduct={this.editProduct}
                deleteProduct={this.deleteProduct}
                addCategory={this.addCategory}
                onSaveCategory={this.onSaveCategory}
                deleteCategory={this.deleteCategory}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth,
        user: state.user,
        adcategories: state.adcategories,
        adproduct: state.adproduct
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        adminActions: bindActionCreators(adminActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
