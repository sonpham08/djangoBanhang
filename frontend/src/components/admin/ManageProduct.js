import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import AddProduct from './AddProduct';
var $ = require("jquery");

class ManageProduct extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
            tabAd: 1
        }
    }

    componentDidMount() {
        let tabAd = localStorage.getItem('tabAd') || 1;
        this.setState({ tabAd: tabAd });
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        
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

    openAddFormProduct = (product) => {
        this.props.openAddFormProduct(product);
    }

    deleteProduct = (product_id) => {
        this.props.deleteProduct(product_id);
    }

    render() {
        const { currentPage } = this.state;
        return (
            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">

                <div className="panel panel-danger">
                    <div className="panel-heading">
                        <h3 className="panel-title">Quản lý sản phẩm</h3>
                        <div className="form_cate_ad">
                            <label>Loại sản phẩm: </label>
                            <select name="" id="input" className="form-control" required="required">
                                <option value={1}>All</option>
                                {
                                    this.props.adcategories.map((category, idx) =>
                                        <option key={idx} value={category.category_id}>{category.name}</option>
                                    )
                                }
                            </select>
                        </div>

                    </div>
                    <div className="panel-body">
                        <div className="form_handle_manage_ad">

                            <button type="button" className="btn btn-success" onClick={this.props.toggleAddForm}><i className="fas fa-plus"></i> Thêm sản phẩm</button>
                        </div>
                        <table className="table table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng nhập</th>
                                    <th>Kích cỡ</th>
                                    <th>Cân nặng</th>
                                    <th>Màu sắc</th>
                                    <th>Âm thanh</th>
                                    <th>Bộ nhớ</th>
                                    <th>Máy ảnh</th>
                                    <th>Pin</th>
                                    <th>Bảo hành</th>
                                    <th>Khuyến mãi</th>
                                    <th>Ngày bắt đầu</th>
                                    <th>Ngày kết thúc</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.dataProduct != undefined ?
                                        this.dataProduct
                                            .slice(
                                                currentPage * this.pageSizeProduct,
                                                (currentPage + 1) * this.pageSizeProduct
                                            )
                                            .map((product, idx) =>
                                                <tr key={idx}>
                                                    <td>{product.name}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.quantity}</td>
                                                    <td>{product.size}</td>
                                                    <td>{product.weight}</td>
                                                    <td>{product.color}</td>
                                                    <td>{product.sound}</td>
                                                    <td>{product.memory}</td>
                                                    <td>{product.camera}</td>
                                                    <td>{product.pin}</td>
                                                    <td>{product.gurantee}</td>
                                                    <td>{product.promotion}</td>
                                                    <td>{product.start_promo}</td>
                                                    <td>{product.end_promo}</td>

                                                    <td style={{ cursor: 'pointer' }}>
                                                        <a onClick={() => this.openAddFormProduct(product)}>Sửa</a>
                                                        <a onClick={() => this.deleteProduct(product.product_id)}>   Xóa</a>
                                                    </td>
                                                </tr>

                                            ) : <tr></tr>
                                }
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
                                {[...Array(this.pagesCountProduct)].map((page, i) =>
                                    <PaginationItem active={i === currentPage} key={i}>
                                        <PaginationLink onClick={e => this.handleSwitchPagination(e, i)} href="#">
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}
                                <PaginationItem disabled={currentPage >= this.pagesCountProduct - 1}>
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

                <AddProduct
                    product={this.props.product}
                    adcategories={this.props.adcategories}
                    openAddForm={this.props.openAddForm}
                    closeAddForm={this.props.closeAddForm}
                    addProduct={this.props.addProduct}
                    editProduct={this.props.editProduct} />
            </div>

        )
    }
}


export default ManageProduct;
