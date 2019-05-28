import React, { Component } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
var $ = require("jquery");


class FlashSale extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentWillMount() {
        this.dataProduct = this.props.usproduct.flashproduct.map(
            (a, i) => a
        );
    }

    componentWillReceiveProps(nextProps) {
        //data product list with pagination
        this.dataProduct = nextProps.usproduct.flashproduct.map(
            (a, i) => a
        );
    }

    showProductDetail = (product) => {
        console.log(product);
        
        this.props.showProductDetail(product);
        let listProduct = JSON.parse(localStorage.getItem('listPro')) || [];
        listProduct.push(product);
        localStorage.setItem("listPro", JSON.stringify(listProduct));
    }

    render() {
        // if(this.props.usproduct.flashproduct.length == 0) return '';
        return (
            <div className="product-list">

                <div className="panel panel-default">
                    <div className="panel-heading" style={{display: "flex"}}>
                    <i className="fas fa-bolt" style={{fontSize: '20px', color:'red'}}></i>&nbsp;
                        <h3 className="panel-title">Flash Sale</h3>
                    </div>
                    <div className="panel-body" style={{ background: 'gainsboro', padding: '0' }}>

                        <div className="row" style={{ marginRight: '0', marginLeft: '0' }}>
                            
                            {this.dataProduct != undefined ?
                                this.dataProduct
                                .map((product, idx) =>
                                    <div 
                                    className="col-xs-3 col-sm-3 col-md-3 col-lg-3 product-list-panel" 
                                    key={idx} 
                                    onClick={() => this.showProductDetail(product)}
                                    style={{width: '14%'}}>
                                        <img src={"static/dataset/"+product.image} className="img-responsive" alt="Image" 
                                        style={{minHeight: '170px', maxHeight: '170px'}}/>
                                        <h5
                                        title={product.name}
                                        style={{textAlign:'center', margin: '0', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden'}}
                                        ><strong>{product.name}</strong></h5>
                                        <p style={{color: 'red', float: 'left'}}>{product.price - (product.price * product.promotion/100)}Đ</p>
                                        &nbsp;
                                        {product.promotion != 0 && <small><i><strike>{product.price}Đ</strike></i></small> }
                                        {/* <button type="button" className="btn btn-primary" style={{float: 'right', height: '30px'}}>
                                        Còn lại <span className="badge badge-light">{product.quantity}</span>
                                        <span className="sr-only">unread messages</span>
                                        </button> */}
                                    </div>
                                )
                                : <h2></h2>}
                            
                        </div>

                    </div>
                </div>
                {/* pagination here */}
            </div>
        )
    }
}

export default FlashSale;
