import React, { Component } from 'react';
import { connect } from 'react-redux';

var $ = require("jquery");


class MenuProduct extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        $(document).ready(function(){
            $(".menu-product-tivi").hide();
            $(".menu-product-mobiphone").hide();
        })
    }

    showSubMenuProductTivi = () => {
        $(".menu-product-tivi").toggle();
    }

    showSubMenuProductMobiphone = () => {
        $(".menu-product-mobiphone").toggle();
    }

    render() {
        return (
            <div className="container">
                <div className="menu-product">
                    <ul className="ul-menu-product">
                        <li onClick={this.showSubMenuProductTivi}><i className="fas fa-tv"></i>&nbsp;<a href="#">Tivi</a></li>
                        <li onClick={this.showSubMenuProductMobiphone}><i className="fas fa-phone"></i>&nbsp;<a href="#">Dien thoai</a></li>
                        <li><i className="fas fa-laptop"></i>&nbsp;<a href="#">Laptop</a></li>
                        <li><i className="fas fa-tablet"></i>&nbsp;<a href="#">Tu lanh</a></li>
                        <li><i className="fab fa-adn"></i>&nbsp;<a href="#">Phan mem va phu kien</a></li>
                        <li><i className="fas fa-wrench"></i>&nbsp;<a href="#">Thiet bi ngoai vi</a></li>
                        <li><i className="fas fa-sliders-h"></i>&nbsp;<a href="#">Linh kien PC</a></li>
                    </ul>
                    {/* sub menu for tivi */}
                    <div className="menu-product-tivi">
                        <ul className="ul-menu-product-tivi">
                            <li>
                                <a href="#">Tivi ban chay > </a>
                            </li>
                            <li><a href="#">Duoi 49inch</a></li>
                            <li><a href="#">Duoi 50inch</a></li>
                            <li><a href="#">Duoi 49inch</a></li>
                            <li><a href="#">Duoi 50inch</a></li>
                        </ul>
                        <ul className="ul-menu-product-tivi">
                            <li>
                                <a href="#">Tivi ban chay > </a>
                            </li>
                            <li><a href="#">Duoi 49inch</a></li>
                            <li><a href="#">Duoi 50inch</a></li>
                            <li><a href="#">Duoi 49inch</a></li>
                            <li><a href="#">Duoi 50inch</a></li>
                        </ul>
                        <ul className="ul-menu-product-tivi">
                            <li>
                                <a href="#">Tivi ban chay > </a>
                            </li>
                            <li><a href="#">Duoi 49inch</a></li>
                            <li><a href="#">Duoi 50inch</a></li>
                            <li><a href="#">Duoi 49inch</a></li>
                            <li><a href="#">Duoi 50inch</a></li>
                        </ul>
                        <ul className="ul-menu-product-tivi">
                            <li>
                                <a href="#">Tivi ban chay > </a>
                            </li>
                            <li><a href="#">Duoi 49inch</a></li>
                            <li><a href="#">Duoi 50inch</a></li>
                            <li><a href="#">Duoi 49inch</a></li>
                            <li><a href="#">Duoi 50inch</a></li>
                        </ul>
                    </div>
                    {/* sub menu for dien thoai */}
                    <div className="menu-product-mobiphone">
                        <ul className="ul-menu-product-mobiphone">
                            <li>
                                <a href="#">ASUS > </a>
                            </li>
                            <li><a href="#">Asus 49inch</a></li>
                            <li><a href="#">Asus 50inch</a></li>
                            <li><a href="#">Asus 49inch</a></li>
                            <li><a href="#">Asus 50inch</a></li>
                        </ul>
                        <ul className="ul-menu-product-mobiphone">
                            <li>
                                <a href="#">Nokia > </a>
                            </li>
                            <li><a href="#">Nokia 49inch</a></li>
                            <li><a href="#">Nokia 50inch</a></li>
                            <li><a href="#">Nokia 49inch</a></li>
                            <li><a href="#">Nokia 50inch</a></li>
                        </ul>
                        <ul className="ul-menu-product-mobiphone">
                            <li>
                                <a href="#">Samsung ban chay > </a>
                            </li>
                            <li><a href="#">Samsung 49inch</a></li>
                            <li><a href="#">Samsung 50inch</a></li>
                            <li><a href="#">Samsung 49inch</a></li>
                            <li><a href="#">Samsung 50inch</a></li>
                        </ul>
                        <ul className="ul-menu-product-mobiphone">
                            <li>
                                <a href="#">Oppo ban chay > </a>
                            </li>
                            <li><a href="#">Oppo 49inch</a></li>
                            <li><a href="#">Oppo 50inch</a></li>
                            <li><a href="#">Oppo 49inch</a></li>
                            <li><a href="#">Oppo 50inch</a></li>
                        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(MenuProduct);
