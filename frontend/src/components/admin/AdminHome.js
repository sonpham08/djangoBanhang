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

    async componentWillMount() {
        this.props.adminActions.getListCategory();
        await new Promise(resolve => resolve(this.props.adminActions.getListProduct()));
        this.props.adminActions.getListStaff();
        this.props.adminActions.getListCustomer();
        this.props.adminActions.getListStaffShip();
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

    addProduct = (name, price, size,quantity ,weight, color, sound, memory,
    camera, pin, gurantee, promotion, start_promo, end_promo, category, image_name) => {
        this.props.adminActions.addProduct(name, price, size,quantity ,weight, color, sound, memory,
            camera, pin, gurantee, promotion, start_promo, end_promo, category, image_name);
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

    onSaveChangeStaff = (staff) => {
        // edit
        this.props.adminActions.editStaffInfo(staff);
    }

    deleteStaff = (id) => {
        this.props.adminActions.deleteStaff(id);
    }

    addStaff = (staff) => {
        this.props.authActions.authSignup(
            staff.username, staff.email, staff.password, staff.fullname, true, false,
            staff.phone, staff.address, staff.cmnd
        );
    }

    deleteStaffShip = (id) => {
        this.props.adminActions.deleteStaffship(id);
    }

    addStaffship = (name, phone) => {
        this.props.adminActions.addStaffship(name,phone);
    }

    editStaffship = (staffship) => {
        this.props.adminActions.editStaffship(staffship);
    }

    render() {
        var {isAuthenticated,user,adcategories, adproduct, adstaff, adcustomer,adstaffship} = this.props;

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
                adstaffship={adstaffship}
                adstaff={adstaff}
                adproduct={adproduct}
                adcategories={adcategories}
                adcustomer={adcustomer}
                tab={this.state.tab}
                addProduct={this.addProduct}
                editProduct={this.editProduct}
                deleteProduct={this.deleteProduct}
                addCategory={this.addCategory}
                onSaveCategory={this.onSaveCategory}
                deleteCategory={this.props.deleteCategory}
                deleteStaff={this.deleteStaff}
                onSaveChangeStaff={this.onSaveChangeStaff}
                addStaff={this.addStaff}
                deleteStaffShip={this.deleteStaffShip}
                addStaffship={this.addStaffship}
                editStaffship={this.editStaffship}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth,
        user: state.user,
        adcategories: state.adcategories,
        adproduct: state.adproduct,
        adstaff: state.adstaff,
        adcustomer: state.adcustomer,
        adstaffship: state.adstaffship
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        adminActions: bindActionCreators(adminActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
