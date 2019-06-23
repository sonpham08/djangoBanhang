import React, { Component } from 'react';
import Avatar from 'react-avatar';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';

class Header extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            username: "",
            token: null,
            listJustSee: [],
        }
    }

    componentWillMount() {
        let token = localStorage.getItem('token');
        let listJustSee = JSON.parse(localStorage.getItem("listPro")) || [];
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

    openFormJustSee = () => {
        let listJustSee = JSON.parse(localStorage.getItem("listPro")) || [];
        if(this.refs.dropdownsee.style.display == 'none') {
            this.refs.dropdownsee.style.display = 'block';
            this.refs.dropdownsee.style.marginTop = '-45px';
            this.refs.dropdownsee.style.marginRight = this.state.token != null ? '230px':'335px';
            this.refs.dropdownsee.style.height = '78%';
            this.refs.dropdownsee.style.width = '26%';
            this.refs.dropdownsee.style.background = "rgb(229, 16, 29)";
            this.refs.dropdownsee.style.border = "none";
            this.refs.dropdownsee.style.boxShadow = 'none';
            this.setState({listJustSee:listJustSee});
        }else {
            this.refs.dropdownsee.style.display = 'none';
        }
    }

    navigateToHome = () => {
        window.location.href="/";
    }

    showCart = () => {
        if(this.props.user.username == "") {
            if(window.confirm("Bạn cần đăng nhập để thực hiện chức năng này!")) {
                window.location.href="/login";
            }
        } else {
            this.props.showCart();
        }
    }

    check = () => {
        if(window.confirm("Bạn cần đăng nhập để thực hiện chức năng này!")) {
            window.location.href="/login";
        }else {
            return "#";
        }
    }

    setTabForTransfer = (tab) => {
        localStorage.setItem('tabTransfer', tab);
    }

    showProductDetail = (product) => {
        this.props.showProductDetail(product);
    }

    onSearchProduct = (e) => {
        e.preventDefault();
        let search_product = this.refs.search_product.value;
        if(search_product != "") {
            this.props.onSearchProduct(search_product);
        }
    }

    render() {
        var {user}=this.props;
        var {listJustSee}=this.state;
        return (
            <nav className="navbar navbar-default" style={{ background: '#e5101d', position: 'fixed', top: '0', width: '100%', zIndex: '1000',borderColor: '#e5101d', borderRadius: '0' }}>
                <div className="container-fluid" style={{paddingLeft: '0'}}>

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1" style={{paddingLeft: '0'}}>
                        <ul className="nav navbar-nav">
                            <li><Link to="/" style={{ color: "white", padding: '0' }} onClick={this.navigateToHome}>
                            <img src="/static/img/lg.png"
                            style={{height: '50px', width: '163px'}}/>
                            </Link></li>
                            {/* <li><a href={user.username == "" ? "#":"/transfer"} style={{ color: "white" }}>Kiểm tra đơn hàng</a></li> */}
                            <li><Link to="/" style={{ color: "white" }} onClick={this.navigateToHome}><strong>Trang chủ</strong></Link></li>
                        </ul>
                        <div className="search-container">
                            <form className="form-horizontal" role="form" onSubmit={this.onSearchProduct}>
                            <input 
                            type="text" 
                            placeholder="Nhập tên sản phẩm..." 
                            name="search_product"
                            ref="search_product"/>
                            <button type="submit"><i className="fa fa-search"></i></button>
                            </form>
                        </div>
                        <ul className="nav navbar-nav navbar-right" style={{marginRight: this.state.token != null ? '-25px': '-80px'}}>
                            <li><Link 
                                to="#"
                                style={{ color: "white", background: "rgb(229, 16, 29)" }}
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                                id="dropdown-see"
                                onClick={this.openFormJustSee}
                                ><strong>Sản phẩm vừa xem</strong></Link></li>
                            <ul className="dropdown-menu" ref="dropdownsee">
                                {
                                    listJustSee.map((justsee, idx) =>
                                        <li key={idx} onClick={() => this.showProductDetail(justsee)}>
                                        <img src={"static/dataset/"+justsee.image} 
                                        style={{marginLeft: '2px', maxHeight: '27px',maxWidth: '27px',cursor: 'pointer', float: 'right', border: '1px solid', background: "white",
                                        minHeight: '27px', minWidth: '27px'}} />
                                        </li>
                                    )
                                }
                            </ul>
                            <li style={{fontSize: '35px'}} className="li_icon_cart" onClick={this.showCart}>
                                <span 
                                className="glyphicon glyphicon-shopping-cart icon_cart" 
                                style={{cursor: 'pointer'}}
                                title="Giỏ hàng">
                                </span>
                                <span className="num_on_cart">{this.props.cart.product.length }</span>
                            </li>
                            {
                                this.state.token == null &&
                                <li style={{display: 'flex', marginLeft:'26px'}}>
                                    <Link to="/login" style={{ color: "white", paddingRight: '0px' }}><strong>Đăng nhập</strong>&nbsp;|&nbsp;</Link>
                                    <Link to="/register" style={{ color: "white", paddingLeft: '0px' }}> <strong>Đăng ký</strong></Link>
                                </li>
                                
                            }
                            {this.state.token != null ?
                                <div className="dropdown" style={{float:'right', marginTop: '10px'}}>
                                    <li>
                                        <Link
                                        to="/"
                                        id="my-dropdown" 
                                        className="dropdown-toggle"
                                        data-toggle="dropdown"
                                        style={{background: "#e5101d"}}
                                        onClick={this.openFormCustomUser}>
                                            <Avatar 
                                            name={this.state.username} 
                                            round="80px" size="30"
                                            />
                                        </Link>
                                    </li>
                                
                                    <ul className="dropdown-menu" ref="dropdownmenu">
                                    <li className="p-d-10"><i className="fas fa-user"><Link to="/transfer" onClick={() => this.setTabForTransfer(1)}> Thông tin cá nhân</Link></i></li>
                                    <li className="p-d-10"><i className="fas fa-exchange-alt"><Link to="/transfer" onClick={() => this.setTabForTransfer(2)}> Kiểm tra đơn hàng</Link></i></li>
                                    <li className="p-d-10"><i className="fas fa-key"><Link to="/changepass"> Đổi mật khẩu</Link></i></li>
                                    <li className="p-d-10"><i className="fas fa-sign-out-alt"><Link to="/" onClick={this.onLogout}> Đăng xuất</Link></i></li>
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
