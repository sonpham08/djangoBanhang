import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import WaitingForAcceptList from './WaitingforAcceptList.jsx';
import CreateTopicForm from './CreateTopicForm.jsx';
import HistoryList from './HistoryList';
import Search from '../components/commons/Search';

var $ = require("jquery");

class Home extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            tab: 0, // 0: Waiting for accept list, 1: createfield, 2: approval history
            resetAccepted: false
        }
    }

    componentWillMount() {
        
        $(document).ready(function(){
            $(".menu-product-tivi").hide();
            $(".menu-product-mobiphone").hide();
        })
    }

    showSubMenuProductTivi() {
        $(".menu-product-tivi").toggle();
    }

    showSubMenuProductMobiphone() {
        $(".menu-product-mobiphone").toggle();
    }

    render() {
        
        return (

            <div style={{background:'silver'}}>
                <nav className="navbar navbar-default" style={{ background: 'darkred', position: 'fixed', top: '0', width: '100%', zIndex: '1000' }}>
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#" style={{ color: "white" }}>Gun</a>
                        </div>

                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li className="active"><a href="#" style={{ color: "white" }}>Kiểm tra đơn hàng <span className="sr-only">(current)</span></a></li>
                                <li><a href="#" style={{ color: "white" }}>Khuyến mãi</a></li>
                                <li><a href="#" style={{ color: "white" }}>Đặt hàng</a></li>
                                {/* <li className="dropdown">
                        <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></a>
                        <ul className="dropdown-menu">
                            <li><a href="#">Action</a></li>
                            <li><a href="#">Another action</a></li>
                            <li><a href="#">Something else here</a></li>
                            <li role="separator" className="divider"></li>
                            <li><a href="#">Separated link</a></li>
                            <li role="separator" className="divider"></li>
                            <li><a href="#">One more separated link</a></li>
                        </ul>
                        </li> */}
                            </ul>
                            <form className="navbar-form navbar-left">
                                <div className="form-group">
                                    <input type="text" className="form-control" placeholder="Search" />
                                </div>
                                <button type="submit" className="btn btn-default">Submit</button>
                            </form>
                            <ul className="nav navbar-nav navbar-right">
                                <li><a href="#" style={{ color: "white" }}>Sản phẩm vừa xem</a></li>
                                <li><a href="#" style={{ color: "white" }}>Đăng nhập, đăng ký</a></li>

                                <li className="dropdown">
                                    <a style={{ color: "white" }} href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Giúp đỡ <span className="caret"></span></a>
                                    <ul className="dropdown-menu">
                                        <li><a href="#" style={{ color: "white" }}>Chế độ bảo hành</a></li>
                                        <li><a href="#" style={{ color: "white" }}>Liên lạc</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <div className="menu-product">
                        <ul className="ul-menu-product">
                            <li onMouseOver={this.showSubMenuProductTivi()}><i className="fas fa-tv"></i>&nbsp;<a href="#">Tivi</a></li>
                            <li onMouseOver={this.showSubMenuProductMobiphone()}><i className="fas fa-phone"></i>&nbsp;<a href="#">Dien thoai</a></li>
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
                <div className="body" style={{ marginTop: '150px', padding: '5px 40px' }}>
                    <div className="row">
                        <div className="product-list">

                            <div className="panel panel-default">
                                <div className="panel-body" style={{background:'silver'}}>

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
                    </div>

                    <div className="row">
                        <div className="product-list-tivi">                          
                            <div className="panel panel-danger">
                                <div className="panel-heading">
                                        <h3 className="panel-title">Laptop khủng</h3>
                                  </div>
                                <div className="panel-body">

                                    <div className="row">
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
                                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 product-list-panel">
                                            <img src="https://images.ctfassets.net/wcfotm6rrl7u/5zMaxqvVlu26yymcmiae4E/935bacff5bf8687866045426e393d011/Nokia_105-Hero.png?fm=png" className="img-responsive" alt="Image" />
                                            <p>Dien thoai nokia 3435 chinh hang gia soc</p>
                                            <h3>17.420.400vnd</h3>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default Home;
