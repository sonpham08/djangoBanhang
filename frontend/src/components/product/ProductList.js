import React, { Component } from 'react';
import { connect } from 'react-redux';

var $ = require("jquery");


class ProductList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="product-list">

                <div className="panel panel-default">
                    <div className="panel-body" style={{ background: 'silver' }}>

                        <div className="row">
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 product-list-panel">
                                <img src="static/img/header.jpg" className="img-responsive" alt="Image" />
                                <p>Dien thoai nokia 3435 chinh hang gia soc</p>
                                <h3>17.420.400vnd</h3>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 product-list-panel">
                                <img src="https://images.ctfassets.net/wcfotm6rrl7u/5zMaxqvVlu26yymcmiae4E/935bacff5bf8687866045426e393d011/Nokia_105-Hero.png?fm=png" className="img-responsive" alt="Image" />
                                <p>Dien thoai nokia 3435 chinh hang gia soc</p>
                                <h3>17.420.400vnd</h3>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 product-list-panel">
                                <img src="https://images.ctfassets.net/wcfotm6rrl7u/5zMaxqvVlu26yymcmiae4E/935bacff5bf8687866045426e393d011/Nokia_105-Hero.png?fm=png" className="img-responsive" alt="Image" />
                                <p>Dien thoai nokia 3435 chinh hang gia soc</p>
                                <h3>17.420.400vnd</h3>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 product-list-panel">
                                <img src="https://images.ctfassets.net/wcfotm6rrl7u/5zMaxqvVlu26yymcmiae4E/935bacff5bf8687866045426e393d011/Nokia_105-Hero.png?fm=png" className="img-responsive" alt="Image" />
                                <p>Dien thoai nokia 3435 chinh hang gia soc</p>
                                <h3>17.420.400vnd</h3>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 product-list-panel">
                                <img src="https://images.ctfassets.net/wcfotm6rrl7u/5zMaxqvVlu26yymcmiae4E/935bacff5bf8687866045426e393d011/Nokia_105-Hero.png?fm=png" className="img-responsive" alt="Image" />
                                <p>Dien thoai nokia 3435 chinh hang gia soc</p>
                                <h3>17.420.400vnd</h3>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 product-list-panel">
                                <img src="https://images.ctfassets.net/wcfotm6rrl7u/5zMaxqvVlu26yymcmiae4E/935bacff5bf8687866045426e393d011/Nokia_105-Hero.png?fm=png" className="img-responsive" alt="Image" />
                                <p>Dien thoai nokia 3435 chinh hang gia soc</p>
                                <h3>17.420.400vnd</h3>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 product-list-panel">
                                <img src="https://images.ctfassets.net/wcfotm6rrl7u/5zMaxqvVlu26yymcmiae4E/935bacff5bf8687866045426e393d011/Nokia_105-Hero.png?fm=png" className="img-responsive" alt="Image" />
                                <p>Dien thoai nokia 3435 chinh hang gia soc</p>
                                <h3>17.420.400vnd</h3>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 product-list-panel">
                                <img src="https://images.ctfassets.net/wcfotm6rrl7u/5zMaxqvVlu26yymcmiae4E/935bacff5bf8687866045426e393d011/Nokia_105-Hero.png?fm=png" className="img-responsive" alt="Image" />
                                <p>Dien thoai nokia 3435 chinh hang gia soc</p>
                                <h3>17.420.400vnd</h3>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 product-list-panel">
                                <img src="https://images.ctfassets.net/wcfotm6rrl7u/5zMaxqvVlu26yymcmiae4E/935bacff5bf8687866045426e393d011/Nokia_105-Hero.png?fm=png" className="img-responsive" alt="Image" />
                                <p>Dien thoai nokia 3435 chinh hang gia soc</p>
                                <h3>17.420.400vnd</h3>
                            </div>
                            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 product-list-panel">
                                <img src="https://images.ctfassets.net/wcfotm6rrl7u/5zMaxqvVlu26yymcmiae4E/935bacff5bf8687866045426e393d011/Nokia_105-Hero.png?fm=png" className="img-responsive" alt="Image" />
                                <p>Dien thoai nokia 3435 chinh hang gia soc</p>
                                <h3>17.420.400vnd</h3>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
