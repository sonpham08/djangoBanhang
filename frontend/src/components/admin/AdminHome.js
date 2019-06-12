import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions';
import * as adminActions from '../../actions/adminActions';
import * as staffActions from '../../actions/staffActions';
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
        await new Promise(resolve => resolve(this.props.adminActions.getListCustomer()));
        await new Promise(resolve => resolve(this.props.adminActions.getListStaff()));
        await new Promise(resolve => resolve(this.props.adminActions.getListStaffShip()));
        await new Promise(resolve => resolve(this.props.adminActions.getListTransporter()));
        await new Promise(resolve => resolve(this.props.adminActions.getCoin()));
        await new Promise(resolve => resolve(this.props.staffActions.getBill()));
        this.props.adminActions.statictic_basic_year(2019, 0);
        this.props.adminActions.statictic_category(2019, 0);
    }

    // componentWillReceiveProps(nextProps) {
    //     if(nextProps.statistic.status !== this.props.statistic.status) {

    //     }
    // }

    getUserInfo = () => {
        this.props.authActions.getUserInfo();
    }

    logout = () => {
        this.props.authActions.logout();
    }

    selectFormToOpen = (tab) => {
        this.setState({tab: tab});
    }

    addProduct = (name, price, size,quantity ,hdh, color, CPU, memory,
    camera, pin, gurantee, promotion, start_promo, end_promo, category, image_name) => {
        this.props.adminActions.addProduct(name, price, size,quantity ,hdh, color, CPU, memory,
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

    addStaffship = (name, phone, transporter) => {
        this.props.adminActions.addStaffship(name,phone,transporter);
    }

    editStaffship = (staffship) => {
        this.props.adminActions.editStaffship(staffship);
    }

    openCoin = (user_id) => {
        this.props.adminActions.initialCoinForCustomer(user_id);
    }

    onFilterReport = (year, month) => {
        this.props.adminActions.statictic_basic_year(year, month);
        this.props.adminActions.statictic_category(year, month);
    }

    render() {
        var {isAuthenticated,
            user,
            adcategories, 
            adproduct, 
            adstaff, 
            adcustomer,
            adstaffship,
            detail,
            coin,
            transporter,
            statistic
        } = this.props;
        console.log(adstaff);
        
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
                detail={detail}
                coin={coin}
                statistic={statistic}
                transporter={transporter}
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
                openCoin={this.openCoin}
                onFilterReport={this.onFilterReport}
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
        adstaffship: state.adstaffship,
        detail: state.detail,
        coin: state.coin,
        transporter: state.transporter,
        statistic: state.statistic
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        adminActions: bindActionCreators(adminActions, dispatch),
        staffActions: bindActionCreators(staffActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminHome);
