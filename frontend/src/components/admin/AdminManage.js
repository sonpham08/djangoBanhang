import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { data } from '../../constants/data';

import AddCategory from './AddCategory';
import ManageCategory from './ManageCategory';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import ManageProduct from './ManageProduct';
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
            product: {}
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
        // data category with pagination
        this.dataCategory = nextProps.adcategories.map(
            (a, i) => a
        );
        this.pageSizeCategory = 2;
        this.pagesCountCategory=Math.ceil(this.dataCategory.length / this.pageSizeCategory);

        //data product with pagination
        this.dataProduct = nextProps.adproduct.map(
            (a, i) => a
        );
        this.pageSizeProduct = 1;
        this.pagesCountProduct = Math.ceil(this.dataProduct.length / this.pageSizeProduct);
    }

    handleSwitchPagination(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });
    }

    toggleAddForm = () => {
        this.setState({ openAddForm: !this.state.openAddForm , category: {}, product: {}});
    }

    openFormEditCategory = (category) => {
        this.setState({openAddForm: true, category: category});
    }

    closeAddForm = () => {
        this.setState({ openAddForm: false });
    }

    openAddFormProduct = (product) => {
        this.setState({openAddForm: true, product: product});
    }

    deleteProduct = (product_id) => {
        if(window.confirm("Are you sure to delete this product ? ")) {
            this.props.deleteProduct(product_id);
        }
    }
    
    addProduct = (name, price, quantity, size, weight, color, sound, memory,
        camera, pin, gurantee, promotion, start_promo, end_promo, category) => {
        this.props.addProduct(name, price, quantity, size, weight, color, sound, memory,
            camera, pin, gurantee, promotion, start_promo, end_promo, category);
        this.setState({openAddForm: false});
    }

    editProduct = (data) => {
        this.props.editProduct(data);
        this.setState({openAddForm: false});
    }

    render() {
        const { currentPage } = this.state;
        var { tab } = this.props;
        if (tab == 0) {
            if (localStorage.getItem('tabAd') == null) {
                tab = 1;
            } else {
                tab = localStorage.getItem('tabAd');
            }
        }
        if (this.props.adcategories.length > 0) {
            
            // elmCategory = this.props.adcategories.map((category, idx) => {
            //     return (
            //         <ManageCategory
            //             key={category.category_id}
            //             category={category}
            //             addCategory={this.props.addCategory}
            //             toggleAddForm={this.toggleAddForm}
            //             openFormEditCategory={this.openFormEditCategory} 
            //             deleteCategory={this.props.deleteCategory}/>
            //     );
            // });
        }

        if (tab == 1) {
            return (
                <ManageProduct
                product={this.state.product}
                category={this.state.category}
                adproduct={this.props.adproduct}
                adcategories={this.props.adcategories}
                toggleAddForm={this.toggleAddForm}
                openAddForm={this.state.openAddForm}
                closeAddForm={this.closeAddForm}
                addProduct={this.addProduct}
                editProduct={this.editProduct}
                openAddFormProduct={this.openAddFormProduct}/>
            );
        } else {
            if (tab == 4) {
                return (
                    <ManageCategory
                    adcategories={this.props.adcategories}
                    category={this.state.category}
                    openAddForm={this.state.openAddForm}
                    openFormEditCategory={this.openFormEditCategory}
                    deleteCategory={this.deleteCategory}
                    toggleAddForm={this.toggleAddForm}
                    closeAddForm={this.closeAddForm}
                    />
                )
            } else {
                if(tab == 2) {
                    return (
                        <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                            <div className="panel panel-danger">
                                <div className="panel-heading">
                                    <h3 className="panel-title">Quản lý nhân viên</h3>
                                </div>
                                <div className="panel-body">
                                    <div className="form_handle_manage_ad">

                                        <button type="button" className="btn btn-success">
                                        <Link to="/register"><i className="fas fa-plus"></i> Thêm danh mục </Link></button>
                                       
                                    </div>
                                    <table className="table table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th style={{ textAlign: 'center' }}>ID</th>
                                                <th style={{ textAlign: 'center' }}>Tên danh mục</th>
                                                <th style={{ textAlign: 'right' }}>Hiệu chỉnh</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr></tr>
                                        </tbody>
                                    </table>
    
                                </div>
                                <React.Fragment>
                                    <div className="pagination-wrapper">
                                        <Pagination aria-label="Page navigation example">
                                            <PaginationItem disabled={currentPage <= 0}>
                                                <PaginationLink
                                                    onClick={e => this.handleSwitchPagination(e, currentPage - 1)}
                                                    previous
                                                    href="#"
                                                />
                                            </PaginationItem>
                                            {[...Array(this.pagesCountCategory)].map((page, i) =>
                                                <PaginationItem active={i === currentPage} key={i}>
                                                    <PaginationLink onClick={e => this.handleSwitchPagination(e, i)} href="#">
                                                        {i + 1}
                                                    </PaginationLink>
                                                </PaginationItem>
                                            )}
                                            <PaginationItem disabled={currentPage >= this.pagesCountCategory - 1}>
                                                <PaginationLink
                                                    onClick={e => this.handleSwitchPagination(e, currentPage + 1)}
                                                    next
                                                    href="#"
                                                />
                                            </PaginationItem>
                                        </Pagination>
                                    </div>
                                </React.Fragment>
                            </div>
                        </div>
                    )
                }
            }
        }
        return null;
    }
}

export default AdminManage;
