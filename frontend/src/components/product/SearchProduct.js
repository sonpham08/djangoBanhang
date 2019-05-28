import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
var $ = require("jquery");


class SearchProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 0,
        };
    }

    componentWillMount() {
        this.dataProduct = this.props.adproduct.map(
            (a, i) => a
        );
        this.pageSizeProduct = 20;
        this.pagesCountProduct = Math.ceil(this.dataProduct.length / this.pageSizeProduct);
    }

    // componentDidMount() {
    //     console.log(this.props);
    //     this.dataProduct = this.props.adproduct.map(
    //         (a, i) => a
    //     );
    //     this.pageSizeProduct = 4;
    //     this.pagesCountProduct = Math.ceil(this.dataProduct.length / this.pageSizeProduct);
    // }

    componentWillReceiveProps(nextProps) {
        //data product list with pagination
        this.dataProduct = nextProps.adproduct.map(
            (a, i) => a
        );
        this.pageSizeProduct = 20;
        this.pagesCountProduct = Math.ceil(this.dataProduct.length / this.pageSizeProduct);
    }

    handleSwitchPagination(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });
    }

    showProductDetail = (product) => {
        this.props.showProductDetail(product);
        let listProduct = JSON.parse(localStorage.getItem('listPro')) || [];
        listProduct.push(product);
        localStorage.setItem("listPro", JSON.stringify(listProduct));
    }

    render() {
        const { currentPage } = this.state;
        console.log(this.dataProduct);
        
        return (
            <div className="product-list">

                <div className="panel panel-default" style={{ border: 'none', marginBottom: '0' }}>
                    <div className="panel-heading" style={{ background: 'gainsboro', padding: '0' }}>
                        {/* <h3 style={{ marginTop: '0' }}>Gợi ý cho bạn</h3> */}
                    </div>
                    <div className="panel-body" style={{ background: 'gainsboro', padding: '0' }}>
                        <div className="row" style={{ marginRight: '0', marginLeft: '0' }}>
                            <PaginationItem
                                disabled={currentPage <= 0}
                                className="prev_car_product"
                                style={{ display: currentPage <= 0 ? "none" : "" }}

                            >
                                <PaginationLink
                                    onClick={e => this.handleSwitchPagination(e, currentPage - 1)}
                                    previous
                                    href="#"
                                    disabled={currentPage <= 0}
                                />
                            </PaginationItem>
                            {this.dataProduct != undefined && this.dataProduct.length != 0 ?
                                this.dataProduct
                                    .slice(
                                        currentPage * this.pageSizeProduct,
                                        (currentPage + 1) * this.pageSizeProduct
                                    )
                                    .map((product, idx) =>
                                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 product-list-panel" key={idx} onClick={() => this.showProductDetail(product)}>
                                            <img src={"static/dataset/" + product.image} className="img-responsive" alt="Image" />
                                            <h5 
                                            style={{textAlign:'center', margin: '0', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}
                                            ><strong>{product.name}</strong></h5>
                                            <p style={{ color: 'red', float: 'left' }}>{product.price - (product.price * product.promotion / 100)}Đ</p>
                                            &nbsp;
                                        {product.promotion != 0 && <small><i><strike>{product.price}Đ</strike></i></small>}
                                            <button type="button" className="btn btn-primary" style={{ float: 'right', height: '30px' }}>
                                                Còn lại <span className="badge badge-light">{product.quantity}</span>
                                                <span className="sr-only">unread messages</span>
                                            </button>
                                        </div>
                                    )
                                : <h2 style={{textAlign: 'center'}}>No Product Found</h2>}
                            <PaginationItem
                                disabled={currentPage >= this.pagesCountProduct - 1}
                                className="next_car_product"
                                style={{ display: currentPage >= this.pagesCountProduct - 1 ? "none" : "" }}>
                                <PaginationLink
                                    onClick={e => this.handleSwitchPagination(e, currentPage + 1)}
                                    next
                                    href="#"
                                />
                            </PaginationItem>
                        </div>

                    </div>

                </div>
                
            </div>
        )
    }
}

export default SearchProduct;
