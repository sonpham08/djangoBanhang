import React, { Component } from 'react';
import { connect } from 'react-redux';

var $ = require("jquery");


class MenuProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentWillMount() {
        $(document).ready(function(){
            $(".menu-product-tivi").hide();
            $(".menu-product-mobiphone").hide();
            $(".menu-product-laptop").hide();
            $(".menu-product-refri").hide();
            $(".menu-product-software").hide();
            $(".menu-product-device").hide();
        })
    }

    showSubMenuItem(mode) {
        switch (mode) {
            case 'sub-tivi':
                $(".menu-product-tivi").show();
                $(".menu-product-mobiphone").hide();
                $(".menu-product-laptop").hide();
                $(".menu-product-refri").hide();
                $(".menu-product-software").hide();
                $(".menu-product-device").hide();
                break;
            case 'sub-phone':
                $(".menu-product-tivi").hide();
                $(".menu-product-mobiphone").show();
                $(".menu-product-laptop").hide();
                $(".menu-product-refri").hide();
                $(".menu-product-software").hide();
                $(".menu-product-device").hide();
                break;
            case 'sub-laptop':
                $(".menu-product-tivi").hide();
                $(".menu-product-mobiphone").hide();
                $(".menu-product-laptop").show();
                $(".menu-product-refri").hide();
                $(".menu-product-software").hide();
                $(".menu-product-device").hide();
                break;
            case 'sub-refrigerator':
                $(".menu-product-tivi").hide();
                $(".menu-product-mobiphone").hide();
                $(".menu-product-laptop").hide();
                $(".menu-product-refri").show();
                $(".menu-product-software").hide();
                $(".menu-product-device").hide();
                break;
            case 'sub-software':
                $(".menu-product-tivi").hide();
                $(".menu-product-mobiphone").hide();
                $(".menu-product-laptop").hide();
                $(".menu-product-refri").hide();
                $(".menu-product-software").show();
                $(".menu-product-device").hide();
                break;
            case 'sub-device':
                $(".menu-product-tivi").hide();
                $(".menu-product-mobiphone").hide();
                $(".menu-product-laptop").hide();
                $(".menu-product-refri").hide();
                $(".menu-product-software").hide();
                $(".menu-product-device").show();
                break;
            default:
                break;
        }
    }

    hideSubMenuItem(mode) {
        switch (mode) {
            case 'sub-tivi':
                $(".menu-product-tivi").hide();
                $(".menu-product-mobiphone").hide();
                $(".menu-product-laptop").hide();
                $(".menu-product-refri").hide();
                $(".menu-product-software").hide();
                $(".menu-product-device").hide();
                break;
            case 'sub-phone':
                $(".menu-product-mobiphone").hide();
                $(".menu-product-mobiphone").show();
                $(".menu-product-laptop").hide();
                $(".menu-product-refri").hide();
                $(".menu-product-software").hide();
                $(".menu-product-device").hide();
                break;
            case 'sub-laptop':
                $(".menu-product-tivi").hide();
                $(".menu-product-mobiphone").hide();
                $(".menu-product-laptop").show();
                $(".menu-product-refri").hide();
                $(".menu-product-software").hide();
                $(".menu-product-device").hide();
                break;
            case 'sub-refrigerator':
                $(".menu-product-tivi").hide();
                $(".menu-product-mobiphone").hide();
                $(".menu-product-laptop").hide();
                $(".menu-product-refri").show();
                $(".menu-product-software").hide();
                $(".menu-product-device").hide();
                break;
            case 'sub-software':
                $(".menu-product-tivi").hide();
                $(".menu-product-mobiphone").hide();
                $(".menu-product-laptop").hide();
                $(".menu-product-refri").hide();
                $(".menu-product-software").show();
                $(".menu-product-device").hide();
                break;
            case 'sub-device':
                $(".menu-product-tivi").hide();
                $(".menu-product-mobiphone").hide();
                $(".menu-product-laptop").hide();
                $(".menu-product-refri").hide();
                $(".menu-product-software").hide();
                $(".menu-product-device").show();
                break;
            default:
                break;
        }
    }

    hideAllSubMenu() {
        $(".menu-product-tivi").hide();
        $(".menu-product-mobiphone").hide();
        $(".menu-product-laptop").hide();
        $(".menu-product-refri").hide();
        $(".menu-product-software").hide();
        $(".menu-product-device").hide();
    }

    render() {
        var {adcategories}=this.props;
        console.log(adcategories);
        var listCategory = [];
        if(adcategories.length > 0) {
            listCategory = adcategories.map((category, idx) => {
                let label = "";
                switch(category.name) {
                    case "Xiaomi": label = "sub-tivi"; break;
                    case "Honor": label = "sub-phone"; break;
                    case "Samsung": label = "sub-laptop"; break;
                    case "Iphone": label = "sub-refrigerator"; break;
                    case "Oppo": label = "sub-software"; break;
                    case "Huawuei": label = "sub-device"; break;
                    default: label = "";
                }
                return (
                    <li key={idx} 
                    onMouseOver={() => this.showSubMenuItem(label)}
                    style={{cursor: 'pointer'}}
                    >{category.name}</li>
                );
            });
        }
        return (
            <div className="container">
                <div className="menu-product" onMouseLeave={this.hideAllSubMenu}>
                    <ul className="ul-menu-product">
                        {/* <li onMouseOver={() => this.showSubMenuItem('sub-tivi')}>
                        <i className="fas fa-tv"></i>&nbsp;<a href="#">Oppo</a></li>
                        <li onMouseOver={() => this.showSubMenuItem('sub-phone')}>
                        <i className="fas fa-phone"></i>&nbsp;<a href="#">Samsung</a></li>
                        <li onMouseOver={() => this.showSubMenuItem('sub-laptop')}>
                        <i className="fas fa-laptop"></i>&nbsp;<a href="#">Huawuei</a></li>
                        <li onMouseOver={() => this.showSubMenuItem('sub-refrigerator')}>
                        <i className="fas fa-tablet"></i>&nbsp;<a href="#">Iphone</a></li>
                        <li onMouseOver={() => this.showSubMenuItem('sub-software')}>
                        <i className="fab fa-adn"></i>&nbsp;<a href="#">Honor</a></li>
                        <li onMouseOver={() => this.showSubMenuItem('sub-device')}>
                        <i className="fas fa-wrench"></i>&nbsp;<a href="#">Xiaomi</a></li> */}
                        {listCategory}
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

                    {/* Sub menu for laptop */}
                    <div className="menu-product-laptop">
                        <ul className="ul-menu-product-laptop">
                            <li>
                                <a href="#">Dien thoai > </a>
                            </li>
                            <li><a href="#">Dien thoai </a></li>
                            <li><a href="#">Asus 50inch</a></li>
                            <li><a href="#">Asus 49inch</a></li>
                            <li><a href="#">Asus 50inch</a></li>
                        </ul>
                        <ul className="ul-menu-product-laptop">
                            <li>
                                <a href="#">Dien thoai > </a>
                            </li>
                            <li><a href="#">Nokia 49inch</a></li>
                            <li><a href="#">Nokia 50inch</a></li>
                            <li><a href="#">Nokia 49inch</a></li>
                            <li><a href="#">Nokia 50inch</a></li>
                        </ul>
                    </div>
                    {/* Sub menu for refrigerator */}
                    <div className="menu-product-refri">
                        <ul className="ul-menu-product-refri">
                            <li>
                                <a href="#">Tu lanh > </a>
                            </li>
                            <li><a href="#">Dien thoai </a></li>
                            <li><a href="#">Asus 50inch</a></li>
                            <li><a href="#">Asus 49inch</a></li>
                            <li><a href="#">Asus 50inch</a></li>
                        </ul>
                        <ul className="ul-menu-product-refri">
                            <li>
                                <a href="#">Dien thoai > </a>
                            </li>
                            <li><a href="#">Nokia 49inch</a></li>
                            <li><a href="#">Nokia 50inch</a></li>
                            <li><a href="#">Nokia 49inch</a></li>
                            <li><a href="#">Nokia 50inch</a></li>
                        </ul>
                    </div>

                    {/* Sub menu for software */}
                    <div className="menu-product-software">
                        <ul className="ul-menu-product-software">
                            <li>
                                <a href="#">Phan mem va phu kien > </a>
                            </li>
                            <li><a href="#">Dien thoai </a></li>
                            <li><a href="#">Asus 50inch</a></li>
                            <li><a href="#">Asus 49inch</a></li>
                            <li><a href="#">Asus 50inch</a></li>
                        </ul>
                        <ul className="ul-menu-product-software">
                            <li>
                                <a href="#">Dien thoai > </a>
                            </li>
                            <li><a href="#">Nokia 49inch</a></li>
                            <li><a href="#">Nokia 50inch</a></li>
                            <li><a href="#">Nokia 49inch</a></li>
                            <li><a href="#">Nokia 50inch</a></li>
                        </ul>
                    </div>
                    {/* Sub menu for device */}
                    <div className="menu-product-device">
                        <ul className="ul-menu-product-device">
                            <li>
                                <a href="#">Thiet bi ngoai vi > </a>
                            </li>
                            <li><a href="#">Dien thoai </a></li>
                            <li><a href="#">Asus 50inch</a></li>
                            <li><a href="#">Asus 49inch</a></li>
                            <li><a href="#">Asus 50inch</a></li>
                        </ul>
                        <ul className="ul-menu-product-device">
                            <li>
                                <a href="#">Dien thoai > </a>
                            </li>
                            <li><a href="#">Nokia 49inch</a></li>
                            <li><a href="#">Nokia 50inch</a></li>
                            <li><a href="#">Nokia 49inch</a></li>
                            <li><a href="#">Nokia 50inch</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default MenuProduct;
