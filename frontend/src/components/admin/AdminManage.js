import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { data } from '../../constants/data';

import AddCategory from './AddCategory';
import ManageCategory from './ManageCategory';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import ManageProduct from './ManageProduct';
import ManageStaff from './MangeStaff';
import ManageCustomer from './MangeCustomer';
import ManageBill from './ManageBill';
import ManageStaffShip from './ManageStaffShip';
import ReportContent from './ReportContent';
import ManageCoin from './ManageCoin';
var $ = require("jquery");

class AdminManage extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            openAddForm: false,
            tab: 0,
            category: {},
            product: {},
            staff: {},
            staffship: {},
            filter: -1
        };
    }

    componentDidMount() {
        if (this.state.tab == 0) {
            if (localStorage.getItem('tabAd')) {
                let tab = localStorage.getItem('tabAd');
                this.setState({ tab: tab });
            }
        }
    }

    componentWillReceiveProps(nextProps) {
    }

    toggleAddForm = () => {
        this.setState({ openAddForm: !this.state.openAddForm, category: {}, product: {}, staff: {}
        , staffship: {} });
    }

    openFormEditCategory = (category) => {
        this.setState({ openAddForm: true, category: category });
    }

    openFormEditStaff = (staff) => {
        this.setState({ openAddForm: true, staff: staff });
    }

    closeAddForm = () => {
        this.setState({ openAddForm: false });
    }

    closeChangeForm = () => {
        this.setState({ openChangeForm: false });
    }

    openAddFormProduct = (product) => {
        this.setState({ openAddForm: true, product: product });
    }

    deleteProduct = (product_id) => {
        if (window.confirm("Are you sure to delete this product ? ")) {
            this.props.deleteProduct(product_id);
        }
    }

    addProduct = (name, price, size,quantity, hdh, color, CPU, memory,
        camera, pin, gurantee, promotion, start_promo, end_promo, category, image_name, description) => {
        this.props.addProduct(name, price, size, quantity, hdh, color, CPU, memory,
            camera, pin, gurantee, promotion, start_promo, end_promo, category, image_name, description);
        this.setState({ openAddForm: false });
    }

    editProduct = (data) => {
        this.props.editProduct(data);
        this.setState({ openAddForm: false });
    }

    openAddFormStaffShip = (staffship) => {
        this.setState({ openAddForm: true, staffship: staffship });
    }

    onSetstateForFilterProduct = (category_id) => {
        this.setState({filter: category_id});
    }

    render() {
        var { tab } = this.props;
        if (tab == 0) {
            if (localStorage.getItem('tabAd') == null) {
                tab = 1;
            } else {
                tab = localStorage.getItem('tabAd');
            }
        }
        return (
            <div>
                <ManageProduct
                    tab={tab}
                    filter={this.state.filter}
                    product={this.state.product}
                    category={this.state.category}
                    adproduct={this.props.adproduct}
                    adcategories={this.props.adcategories}
                    toggleAddForm={this.toggleAddForm}
                    openAddForm={this.state.openAddForm}
                    closeAddForm={this.closeAddForm}
                    addProduct={this.addProduct}
                    editProduct={this.editProduct}
                    openAddFormProduct={this.openAddFormProduct}
                    deleteProduct={this.deleteProduct}
                    onSetstateForFilterProduct={this.onSetstateForFilterProduct}
                    />
                <ManageCategory
                    tab={tab}
                    adcategories={this.props.adcategories}
                    category={this.state.category}
                    openAddForm={this.state.openAddForm}
                    openFormEditCategory={this.openFormEditCategory}
                    deleteCategory={this.deleteCategory}
                    toggleAddForm={this.toggleAddForm}
                    closeAddForm={this.closeAddForm}
                    addCategory={this.props.addCategory}
                    onSaveCategory={this.props.onSaveCategory}
                />
                <ManageStaff
                    tab={tab}
                    adstaff={this.props.adstaff}
                    staff={this.state.staff}
                    toggleAddForm={this.toggleAddForm}
                    openAddForm={this.state.openAddForm}
                    closeAddForm={this.closeAddForm}
                    closeChangeForm={this.closeChangeForm}
                    deleteStaff={this.props.deleteStaff}
                    openFormEditStaff={this.openFormEditStaff}
                    openFormChangePass={this.openFormChangePass}
                    addStaff={this.props.addStaff}
                />
                <ReportContent
                    tab={tab}
                    statistic={this.props.statistic}
                    onFilterReport={this.props.onFilterReport}/>
                <ManageCustomer
                tab={tab}
                adcustomer={this.props.adcustomer}
                openAddForm={this.state.openAddForm}
                openCoin={this.props.openCoin}/>
                <ManageBill
                tab={tab}
                adcustomer={this.props.adcustomer}
                adstaffship={this.props.adstaffship}
                detail={this.props.detail}
                />
                <ManageStaffShip
                tab={tab}
                openAddForm={this.state.openAddForm}
                adstaffship={this.props.adstaffship}
                staffship={this.state.staffship}
                transporter={this.props.transporter}
                toggleAddForm={this.toggleAddForm}
                closeAddForm={this.closeAddForm}
                openAddFormStaffShip={this.openAddFormStaffShip}
                deleteStaffShip={this.props.deleteStaffShip}
                addStaffship={this.props.addStaffship}
                editStaffship={this.props.editStaffship}/>
                
                <ManageCoin
                tab={tab}
                coin={this.props.coin}
                />
            </div>
        )
    }
}

export default AdminManage;
