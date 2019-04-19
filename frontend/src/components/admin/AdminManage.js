import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { data } from '../../constants/data';

import AddCategory from './AddCategory';
import ManageCategory from './ManageCategory';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import ManageProduct from './ManageProduct';
import ManageStaff from './MangeStaff';
import ManageCustomer from './MangeCustomer';
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
            staff: {}
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
        this.setState({ openAddForm: !this.state.openAddForm, category: {}, product: {}, staff: {} });
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

    openAddFormProduct = (product) => {
        this.setState({ openAddForm: true, product: product });
    }

    deleteProduct = (product_id) => {
        if (window.confirm("Are you sure to delete this product ? ")) {
            this.props.deleteProduct(product_id);
        }
    }

    addProduct = (name, price, quantity, size, weight, color, sound, memory,
        camera, pin, gurantee, promotion, start_promo, end_promo, category, image_name) => {
        console.log(image_name);
        
        this.props.addProduct(name, price, quantity, size, weight, color, sound, memory,
            camera, pin, gurantee, promotion, start_promo, end_promo, category, image_name);
        this.setState({ openAddForm: false });
    }

    editProduct = (data) => {
        this.props.editProduct(data);
        this.setState({ openAddForm: false });
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
                    deleteProduct={this.deleteProduct} />
                <ManageCategory
                    tab={tab}
                    adcategories={this.props.adcategories}
                    category={this.state.category}
                    openAddForm={this.state.openAddForm}
                    openFormEditCategory={this.openFormEditCategory}
                    deleteCategory={this.deleteCategory}
                    toggleAddForm={this.toggleAddForm}
                    closeAddForm={this.closeAddForm}
                />
                <ManageStaff
                    tab={tab}
                    adstaff={this.props.adstaff}
                    staff={this.state.staff}
                    toggleAddForm={this.toggleAddForm}
                    openAddForm={this.state.openAddForm}
                    closeAddForm={this.closeAddForm}
                    deleteStaff={this.props.deleteStaff}
                    onSaveChangeStaff={this.props.onSaveChangeStaff}
                    openFormEditStaff={this.openFormEditStaff}
                    addStaff={this.props.addStaff}
                />
                <ManageCustomer
                tab={tab}
                adcustomer={this.props.adcustomer}/>
            </div>
        )
    }
}

export default AdminManage;
