import React, { Component } from 'react';
import { connect } from 'react-redux';

var $ = require("jquery");


class MenuProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            category_id: ""
        }
    }

    componentWillMount() {
        $(document).ready(function () {
            $(".menu-product-tivi").hide();
            $(".menu-product-mobiphone").hide();
            $(".menu-product-laptop").hide();
            $(".menu-product-refri").hide();
            $(".menu-product-software").hide();
            $(".menu-product-device").hide();
        })
    }

    showSubMenuItem(category_id, mode) {
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
        this.setState({category_id: category_id});     
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

    filterProduct = (category_id) => {
        this.props.onFilterProduct(category_id);
    }

    onFilter = (category_id, name, value) => {
        console.log(category_id, name, value);
        this.props.onFilter(category_id, name, value);
    }

    render() {
        var { adcategories } = this.props;
        console.log(adcategories);
        var listCategory = [];
        var filterXiao = [];
        var filterHonor = [];
        var filterSamsung = [];
        var filterIphone = [];
        var filterOppo = [];
        var filterHuawuei = [];
        if (adcategories.length > 0) {
            listCategory = adcategories.map((category, idx) => {
                let label = "";
                switch (category.name) {
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
                        onMouseOver={() => this.showSubMenuItem(category.category_id, label)}
                        style={{ cursor: 'pointer' }}
                        value={category.category_id}
                        className="menu_cate_main"
                        onClick={() => this.filterProduct(category.category_id)}
                    >
                        {category.name}</li>
                );
            });
        }
        return (
            <div className="row">
                <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                </div>
                <div className="col-xs-9 col-sm-9 col-md-9 col-lg-9">
                    <div className="menu-product" onMouseLeave={this.hideAllSubMenu}>
                        <ul className="ul-menu-product">
                            {listCategory}
                        </ul>
                        {/* sub menu for tivi */}
                        <div className="menu-product-tivi xiao">
                            <ul className="ul-menu-product-tivi">
                                <li>
                                    <a href="#">Xiaomi > Camera trước sau > </a>
                                </li>
                                <li onClick={() => this.onFilter(this.state.category_id, "cam", 1)}><a href="#">1 CAM</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "cam", 2)}><a href="#">2 CAM</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "cam", 3)}><a href="#">3 CAM</a></li>
                            </ul>
                            <ul className="ul-menu-product-tivi">
                                <li>
                                    <a href="#">Xiaomi > Dung lượng bộ nhớ > </a>
                                </li>
                                <li onClick={() => this.onFilter(this.state.category_id, "memory", 12)}><a href="#">Dưới 12GB</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "memory", 24)}><a href="#">Dưới 24GB </a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "memory", 32)}><a href="#">25GB trở lên</a></li>
                            </ul>
                            <ul className="ul-menu-product-tivi">
                                <li>
                                    <a href="#">Xiaomi > Giá bán > </a>
                                </li>
                                <li onClick={() => this.onFilter(this.state.category_id, "price", 2)}><a href="#">Dưới 2tr</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "price", 10)}><a href="#">Dưới 10tr </a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "price", 11)}><a href="#">10 trở lên</a></li>
                            </ul>

                        </div>
                        {/* sub menu for dien thoai */}
                        <div className="menu-product-mobiphone honor">
                            <ul className="ul-menu-product-tivi">
                                <li>
                                    <a href="#">Honor > Camera trước sau > </a>
                                </li>
                                <li onClick={() => this.onFilter(this.state.category_id, "cam", 1)}><a href="#">1 CAM</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "cam", 2)}><a href="#">2 CAM</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "cam", 3)}><a href="#">3 CAM</a></li>
                            </ul>
                            <ul className="ul-menu-product-tivi">
                                <li>
                                    <a href="#">Honor > Dung lượng bộ nhớ > </a>
                                </li>
                                <li onClick={() => this.onFilter(this.state.category_id, "memory", 12)}><a href="#">Dưới 12GB</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "memory", 24)}><a href="#">Dưới 24GB </a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "memory", 32)}><a href="#">25GB trở lên</a></li>
                            </ul>
                            <ul className="ul-menu-product-tivi">
                                <li>
                                    <a href="#">Honor > Giá bán > </a>
                                </li>
                                <li onClick={() => this.onFilter(this.state.category_id, "price", 2)}><a href="#">Dưới 2tr</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "price", 10)}><a href="#">Dưới 10tr </a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "price", 11)}><a href="#">10 trở lên</a></li>
                            </ul>
                        </div>

                        {/* Sub menu for laptop */}
                        <div className="menu-product-laptop samsung">
                            <ul className="ul-menu-product-tivi">
                                <li>
                                    <a href="#">Samsung > Camera trước sau > </a>
                                </li>
                                <li onClick={() => this.onFilter(this.state.category_id, "cam", 1)}><a href="#">1 CAM</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "cam", 2)}><a href="#">2 CAM</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "cam", 3)}><a href="#">3 CAM</a></li>
                            </ul>
                            <ul className="ul-menu-product-tivi">
                                <li>
                                    <a href="#">Samsung > Dung lượng bộ nhớ > </a>
                                </li>
                                <li onClick={() => this.onFilter(this.state.category_id, "memory", 12)}><a href="#">Dưới 12GB</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "memory", 24)}><a href="#">Dưới 24GB </a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "memory", 32)}><a href="#">25GB trở lên</a></li>
                            </ul>
                            <ul className="ul-menu-product-tivi">
                                <li>
                                    <a href="#">Samsung > Giá bán > </a>
                                </li>
                                <li onClick={() => this.onFilter(this.state.category_id, "price", 2)}><a href="#">Dưới 2tr</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "price", 10)}><a href="#">Dưới 10tr </a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "price", 11)}><a href="#">10 trở lên</a></li>
                            </ul>
                        </div>
                        {/* Sub menu for refrigerator */}
                        <div className="menu-product-refri iphone">
                            <ul className="ul-menu-product-tivi">
                                <li>
                                    <a href="#">Iphone > Camera trước sau > </a>
                                </li>
                                <li onClick={() => this.onFilter(this.state.category_id, "cam", 1)}><a href="#">1 CAM</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "cam", 2)}><a href="#">2 CAM</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "cam", 3)}><a href="#">3 CAM</a></li>
                            </ul>
                            <ul className="ul-menu-product-tivi">
                                <li>
                                    <a href="#">Iphone > Dung lượng bộ nhớ > </a>
                                </li>
                                <li onClick={() => this.onFilter(this.state.category_id, "memory", 12)}><a href="#">Dưới 12GB</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "memory", 24)}><a href="#">Dưới 24GB </a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "memory", 32)}><a href="#">25GB trở lên</a></li>
                            </ul>
                            <ul className="ul-menu-product-tivi">
                                <li>
                                    <a href="#">Iphone > Giá bán > </a>
                                </li>
                                <li onClick={() => this.onFilter(this.state.category_id, "price", 2)}><a href="#">Dưới 2tr</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "price", 10)}><a href="#">Dưới 10tr </a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "price", 11)}><a href="#">10 trở lên</a></li>
                            </ul>
                        </div>

                        {/* Sub menu for software */}
                        <div className="menu-product-software oppo">
                            <ul className="ul-menu-product-tivi">
                                <li>
                                    <a href="#">Oppo > Camera trước sau > </a>
                                </li>
                                <li onClick={() => this.onFilter(this.state.category_id, "cam", 1)}><a href="#">1 CAM</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "cam", 2)}><a href="#">2 CAM</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "cam", 3)}><a href="#">3 CAM</a></li>
                            </ul>
                            <ul className="ul-menu-product-tivi">
                                <li>
                                    <a href="#">Oppo > Dung lượng bộ nhớ > </a>
                                </li>
                                <li onClick={() => this.onFilter(this.state.category_id, "memory", 12)}><a href="#">Dưới 12GB</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "memory", 24)}><a href="#">Dưới 24GB </a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "memory", 32)}><a href="#">25GB trở lên</a></li>
                            </ul>
                            <ul className="ul-menu-product-tivi">
                                <li>
                                    <a href="#">Oppo > Giá bán > </a>
                                </li>
                                <li onClick={() => this.onFilter(this.state.category_id, "price", 2)}><a href="#">Dưới 2tr</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "price", 10)}><a href="#">Dưới 10tr </a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "price", 11)}><a href="#">10 trở lên</a></li>
                            </ul>
                        </div>
                        {/* Sub menu for device */}
                        <div className="menu-product-device huawuei">
                            <ul className="ul-menu-product-tivi">
                                <li>
                                    <a href="#">Huawuei > Camera trước sau > </a>
                                </li>
                                <li onClick={() => this.onFilter(this.state.category_id, "cam", 1)}><a href="#">1 CAM</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "cam", 2)}><a href="#">2 CAM</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "cam", 3)}><a href="#">3 CAM</a></li>
                            </ul>
                            <ul className="ul-menu-product-tivi">
                                <li>
                                    <a href="#">Huawuei > Dung lượng bộ nhớ > </a>
                                </li>
                                <li onClick={() => this.onFilter(this.state.category_id, "memory", 12)}><a href="#">Dưới 12GB</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "memory", 24)}><a href="#">Dưới 24GB </a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "memory", 32)}><a href="#">25GB trở lên</a></li>
                            </ul>
                            <ul className="ul-menu-product-tivi">
                                <li>
                                    <a href="#">Huawuei > Giá bán > </a>
                                </li>
                                <li onClick={() => this.onFilter(this.state.category_id, "price", 2)}><a href="#">Dưới 2tr</a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "price", 10)}><a href="#">Dưới 10tr </a></li>
                                <li onClick={() => this.onFilter(this.state.category_id, "price", 11)}><a href="#">10 trở lên</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                </div>
            </div>
        )
    }
}

export default MenuProduct;
