import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as authActions from '../../actions/authActions';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
var $ = require("jquery");

class AdminSideMenu extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            tabAd: 1
        }
    }

    componentDidMount() {
        let tabAd = localStorage.getItem('tabAd') || 1;
        this.setState({tabAd: tabAd});
    }

    open (e,tabAd) {
        e.preventDefault();
        if(tabAd == 1 && $("#manage_product").hasClass('active') == false) {
            localStorage.setItem('tabAd', 1);
            this.setState({tabAd: 1});
            // $(".side nav li").removeClass("active");
            // $("#personal").addClass("active");
            this.props.selectFormToOpen(1);
        }
           
        if(tabAd == 2 && $("#manage_staff").hasClass('active') == false) {
            localStorage.setItem('tabAd', 2);
            this.setState({tabAd: 2});
            this.props.selectFormToOpen(2);
        }
        if(tabAd == 3 && $("#statistic").hasClass('active') == false) {
            localStorage.setItem('tabAd', 3);
            this.setState({tabAd: 3});
            this.props.selectFormToOpen(3);
        }
        if(tabAd == 4 && $("#manage_category").hasClass('active') == false) {
            localStorage.setItem('tabAd', 4);
            this.setState({tabAd: 4});
            this.props.selectFormToOpen(4);
        }   
    }

    render() {
        return (
            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                <div className="collapse navbar-collapse navbar-ex1-collapse">
                    <ul className="nav navbar-nav side-nav">
                        <li>
                            <Link to="/">GUN</Link>
                        </li>
                        <li id="manage_product" >
                            <Link 
                            className={this.state.tabAd == 1 ? "active" : ""}
                            to="/transfer" 
                            style={{ color: "white" }}
                            
                            onClick={(e) => this.open(e, 1)}
                            >Quản lý sản phẩm <span className="sr-only">(current)</span></Link>
                        </li>
                        <li id="manage_staff" >
                            <Link 
                            className={this.state.tabAd == 2 ? "active" : ""}
                            to="/sale" 
                            style={{ color: "white" }}
                            
                            onClick={(e) => this.open(e, 2)}
                            >Quản lý nhân viên</Link>
                        </li>
                        <li id="statistic" >
                            <Link 
                            className={this.state.tabAd == 3 ? "active" : ""}
                            to="#" 
                            style={{ color: "white" }}
                            onClick={(e) => this.open(e, 3)}
                            >Thống kê</Link>
                        </li>
                        <li id="manage_category">
                            <Link 
                            className={this.state.tabAd == 4 ? "active" : ""}
                            to="#" 
                            style={{ color: "white" }}
                            onClick={(e) => this.open(e, 4)}
                            >Quản lý loại sản phẩm</Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}


export default AdminSideMenu;
