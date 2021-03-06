import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
var $ = require("jquery");

class StaffProduct extends Component {
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
        //data product with pagination
        this.dataProduct = nextProps.adproduct.map(
            (a, i) => a
        );
        this.pageSizeProduct = 5;
        this.pagesCountProduct = Math.ceil(this.dataProduct.length / this.pageSizeProduct);
    }

    handleSwitchPagination(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });
    }

    render() {
        const { currentPage } = this.state;
        if(this.props.tab == 2) {
            return (
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
    
                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            <h3 className="panel-title">Quản lý sản phẩm</h3>
                        </div>
                        <div className="panel-body">

                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>Tên sản phẩm</th>
                                        <th>Giá</th>
                                        <th>Kích cỡ</th>
                                        <th>Số lượng nhập</th>
                                        <th>Hệ điều hành</th>
                                        <th>Màu sắc</th>
                                        <th>CPU</th>
                                        <th>Bộ nhớ</th>
                                        <th>Máy ảnh(MP)</th>
                                        <th>Pin(mAh)</th>
                                        <th>Bảo hành</th>
                                        <th>Khuyến mãi</th>
                                        <th>Loại máy</th>
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
                                                        <td>{product.size}</td>
                                                        <td>{product.quantity}</td>
                                                        <td>{product.hdh}</td>
                                                        <td>{product.color}</td>
                                                        <td>{product.CPU}</td>
                                                        <td>{product.memory}</td>
                                                        <td>{product.camera}</td>
                                                        <td>{product.pin}</td>
                                                        <td>{product.gurantee}</td>
                                                        <td>{product.promotion}%</td>
                                                        <td>{product.category.name}</td>
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

                </div>
    
            )
        }
        return null;
    }
}


export default StaffProduct;
