import React, { Component } from 'react';
import { connect } from 'react-redux';

var $ = require("jquery");


class ProductList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.usproduct);
        
        return (
            <div className="product-list">

                <div className="panel panel-default" style={{border: 'none'}}>
                    <div className="panel-body" style={{ background: 'gainsboro' , padding: '0'}}>

                        <div className="row">
                            {this.props.usproduct != undefined ?
                                this.props.usproduct.map((product, idx) => 
                                    <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 product-list-panel" key={idx}>
                                        <img src={product.image} className="img-responsive" alt="Image" />
                                        <p>{product.name}</p>
                                        <h3>{product.price}vnd</h3>
                                    </div>
                                )
                                 : <h2>No Product Found</h2>}
                            {/* <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 product-list-panel">
                                <img src="https://images.ctfassets.net/wcfotm6rrl7u/5zMaxqvVlu26yymcmiae4E/935bacff5bf8687866045426e393d011/Nokia_105-Hero.png?fm=png" className="img-responsive" alt="Image" />
                                <p>Dien thoai nokia 3435 chinh hang gia soc</p>
                                <h3>17.420.400vnd</h3>
                            </div> */}
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

export default ProductList;
