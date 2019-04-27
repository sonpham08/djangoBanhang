import React, { Component } from 'react';
import Avatar from 'react-avatar';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: "",
            token: null,
        }
    }

    componentWillMount() {
        let token = localStorage.getItem('token');
        if(token != undefined) {
            this.props.getUserInfo();
            this.setState({
                username: this.props.user.username,
                token: this.props.isAuthenticated.token,
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.user != undefined) {
            this.setState({
                username: nextProps.user.username,
                token: nextProps.isAuthenticated.token
            });
        }
    }

    onLogout = () => {
        this.props.logout();
        window.location.reload(true);
    }

    openFormCustomUser = () => {
        
        if(this.refs.dropdownmenu.style.display == 'none') {
            this.refs.dropdownmenu.style.display = 'block';
        }else {
            this.refs.dropdownmenu.style.display = 'none';
        }
    }

    navigateToHome = () => {
        window.location.href="/";
    }

    showCart = () => {
        if(this.props.user.username == "") {
            window.location.href="/login";
        } else {
            this.props.showCart();
        }
    }

    render() {
        console.log(this.props.cart);
        
        return (
            <nav className="navbar navbar-default" style={{ background: '#e5101d', position: 'fixed', top: '0', width: '100%', zIndex: '1000',borderColor: '#e5101d', borderRadius: '0' }}>
                <div className="container-fluid">
                    {/* <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="/" style={{ color: "white", paddingTop: '15px' }}>Gun</a>
                    </div> */}

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        <ul className="nav navbar-nav">
                            <li><Link to="/" style={{ color: "white" }} onClick={this.navigateToHome}>GUN</Link></li>
                            <li><a href="/transfer" style={{ color: "white" }}>Kiểm tra đơn hàng <span className="sr-only">(current)</span></a></li>
                            <li><Link to="/sale" style={{ color: "white" }}>Khuyến mãi</Link></li>
                        </ul>
                        <div className="search-container">
                            <form action="/action_page.php">
                            <input type="text" placeholder="Search.." name="search"/>
                            <button type="submit"><i className="fa fa-search"></i></button>
                            </form>
                        </div>
                        <ul className="nav navbar-nav navbar-right">
                            <li style={{fontSize: '35px'}} className="li_icon_cart" onClick={this.showCart}>
                                <span 
                                className="glyphicon glyphicon-shopping-cart icon_cart" 
                                style={{cursor: 'pointer'}}
                                title="Giỏ hàng">
                                </span>
                                <span className="num_on_cart">{this.props.cart.product.length }</span>
                            </li>
                            <li><Link to="#" style={{ color: "white" }}>Sản phẩm vừa xem</Link></li>
                            {
                                this.state.token == null ?
                                <li style={{display: 'flex'}}>
                                    <Link to="/login" style={{ color: "white", paddingRight: '0px' }}>Đăng nhập&nbsp;|&nbsp;</Link>
                                    <Link to="/register" style={{ color: "white", paddingLeft: '0px' }}> Đăng ký</Link>
                                </li>
                                :
                                <li><Link to="/" style={{ color: "white" }} onClick={this.onLogout}>Đăng xuất</Link></li>
                            }
                            {this.state.token != null ?
                                <div className="dropdown" style={{float:'right', marginTop: '15px'}}>
                                    <li>
                                        <Link
                                        to="/"
                                        id="my-dropdown" 
                                        className="dropdown-toggle"
                                        data-toggle="dropdown" 
                                        onClick={this.openFormCustomUser}>
                                            <Avatar 
                                            name={this.state.username} 
                                            round="80px" size="30"
                                            />
                                        </Link>
                                    </li>
                                
                                    <ul className="dropdown-menu" ref="dropdownmenu">
                                    <li><Link to="/transfer">Hiệu chỉnh</Link></li>
                                    </ul>
                                
                                </div> : ""}
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

export default Header;
