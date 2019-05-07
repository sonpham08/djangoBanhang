import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

var $ = require("jquery");


class ProductListPC extends Component {

    constructor(props) {
        super(props);
        this.state={
            currentPage: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        //data product list with pagination
        
        this.dataPromotion = nextProps.promotion.map(
            (a, i) => a
        );
        this.pageSizePromotion = 4;
        this.pagesCountPromotion = Math.ceil(this.dataPromotion.length / this.pageSizePromotion);
    }

    handleSwitchPagination(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });
    }

    render() {
        var { promotion } = this.props;
        const { currentPage } = this.state;
        console.log(promotion);
        var listPromotion = [];
        if(promotion != undefined) {
            listPromotion = promotion
            .slice(
                currentPage * this.pageSizePromotion,
                (currentPage + 1) * this.pageSizePromotion
            )
            .map((product_each, idx) => {
                return (
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 product-list-panel" key={idx}>
                        <img src={"static/dataset/"+product_each.image} className="img-responsive" alt="Image" />
                        <h5 style={{ textAlign: 'center' }}><strong>{product_each.name}</strong></h5>
                        <p style={{ color: 'red', float: 'left' }}>{product_each.price - (product_each.price*product_each.promotion/100)}Đ</p>
                        &nbsp;<small><i><strike>{product_each.price}Đ</strike></i></small>
                        <button type="button" className="btn btn-primary" style={{ float: 'right', height: '30px' }}>
                            Còn lại <span className="badge badge-light">{product_each.quantity}</span>
                            <span className="sr-only">unread messages</span>
                        </button>
                    </div>
                )
            });
        }
        
        return (
            <div className="product-list-pc">
                <div className="panel panel-danger">
                    <div className="panel-heading  tit_gradient">
                        <h3 className="panel-title">Các sản phẩm đang khuyến mãi</h3>
                    </div>
                    <div className="panel-body" style={{ background: "gainsboro" }}>

                        <div className="row">
                            <PaginationItem 
                            disabled={currentPage <= 0} 
                            style={{display: currentPage <=0 ? "none":""}}
                            className="prev_car_product">
                                <PaginationLink
                                    onClick={e => this.handleSwitchPagination(e, currentPage - 1)}
                                    previous
                                    href="#"
                                    disabled={currentPage <= 0}
                                />
                            </PaginationItem>
                            {listPromotion}
                            <PaginationItem 
                            disabled={currentPage >= this.pagesCountPromotion - 1} 
                            style={{display: currentPage >= this.pagesCountPromotion - 1 ? "none":""}}
                            className="next_car_product">
                                <PaginationLink
                                    onClick={e => this.handleSwitchPagination(e, currentPage + 1)}
                                    next
                                    href="#"
                                />
                            </PaginationItem>
                        </div>

                    </div>
                </div>
                <React.Fragment>
                    <div className="pagination-wrapper">
                        <Pagination aria-label="Page navigation example">
                            {/* <PaginationItem disabled={currentPage <= 0}>
                                <PaginationLink
                                    onClick={e => this.handleSwitchPagination(e, currentPage - 1)}
                                    previous
                                    href="#"
                                />
                            </PaginationItem> */}
                            {[...Array(this.pagesCountPromotion)].map((page, i) =>
                                <PaginationItem active={i === currentPage} key={i}>
                                    <PaginationLink onClick={e => this.handleSwitchPagination(e, i)} href="#">
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            )}
                            {/* <PaginationItem disabled={currentPage >= this.pagesCountPromotion - 1}>
                                <PaginationLink
                                    onClick={e => this.handleSwitchPagination(e, currentPage + 1)}
                                    next
                                    href="#"
                                />
                            </PaginationItem> */}
                        </Pagination>
                    </div>
                </React.Fragment>
            </div>
        )
    }
}

export default ProductListPC;
