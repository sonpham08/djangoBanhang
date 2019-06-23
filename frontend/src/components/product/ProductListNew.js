import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination, PaginationItem, PaginationLink, Badge } from 'reactstrap';
import moment from 'moment';
import 'moment-timezone';

var $ = require("jquery");


class ProductListNew extends Component {

    constructor(props) {
        super(props);
        this.state={
            currentPage: 0,
        };
    }

    componentWillReceiveProps(nextProps) {
        //data product list with pagination
        
        this.dateNews = nextProps.news.map(
            (a, i) => a
        );
        this.pageSizeNews = 4;
        this.pagesCountNews = Math.ceil(this.dateNews.length / this.pageSizeNews);
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
        var { news } = this.props;
        const { currentPage } = this.state;
        var listNews = [];
        if(news != undefined) {
            listNews = news
            .slice(
                currentPage * this.pageSizeNews,
                (currentPage + 1) * this.pageSizeNews
            )
            .map((product_each, idx) => {
                let timestamp = moment(product_each.end_promo).unix();
                let date = moment.unix(timestamp).format("YYYY-MM-DD HH:mm");
                return (
                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 product-list-panel" key={idx} onClick={() => this.showProductDetail(product_each)}>
                        <img src={"static/dataset/"+product_each.image} className="img-responsive" alt="Image" />
                        <h5 
                        style={{textAlign:'center', margin: '0', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}
                        ><strong>{product_each.name}</strong></h5>
                        <p style={{ color: 'red', float: 'left' }}>{(product_each.price - (product_each.price*product_each.promotion/100)).toLocaleString(navigator.language, { minimumFractionDigits: 0 })}Đ</p>
                        &nbsp;<small><i><strike>{product_each.price.toLocaleString(navigator.language, { minimumFractionDigits: 0 })}Đ</strike></i></small>&nbsp;
                        {product_each.promotion != 0 &&
                        <Badge style={{background: 'red'}}>-{product_each.promotion}%</Badge>
                        }
                        <br/><p className="rest_promotion">{date}</p>
                        {/* <button type="button" className="btn btn-primary" style={{ float: 'right', height: '30px' }}>
                            Còn lại <span className="badge badge-light">{product_each.quantity}</span>
                            <span className="sr-only">unread messages</span>
                        </button> */}
                        <div style={{marginLeft: '55px',right: '0', display: 'initial', float: 'right', position: 'absolute'}}>
                            <i className="fas fa-star" style={{color: product_each.rating >= 5 ? 'red':''}}></i>
                            <i className="fas fa-star" style={{color: product_each.rating >= 4 ? 'red':''}}></i>
                            <i className="fas fa-star" style={{color: product_each.rating >= 3 ? 'red':''}}></i>
                            <i className="fas fa-star" style={{color: product_each.rating >= 2 ? 'red':''}}></i>
                            <i className="fas fa-star" style={{color: product_each.rating >= 1 ? 'red':''}}></i>
                        </div>
                    </div>
                )
            });
        }
        return (
            <div className="product-list-pc">
                <div className="panel panel-danger">
                    <div className="panel-heading  tit_gradient">
                        <h3 className="panel-title">Các sản phẩm mới nhất</h3>
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
                            {listNews}
                            <PaginationItem 
                            disabled={currentPage >= this.pagesCountNews - 1} 
                            style={{display: currentPage >= this.pagesCountNews - 1 ? "none":""}}
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
                {/* pagination here */}
            </div>
        )
    }
}

export default ProductListNew;
