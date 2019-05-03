import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import * as authActions from '../../actions/authActions';
import * as adminActions from '../../actions/adminActions';
import * as userActions from '../../actions/userActions';
import * as staffActions from '../../actions/staffActions';
// import { Button, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import SubHeader from '../SubHeader';
import moment from 'moment';
import 'moment-timezone';
import DetailBox from './DetailBox';
var $ = require("jquery");


class StaffHome extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            tab: 0,
            product: {}
        }
    }

    componentWillMount() {
        let token = localStorage.getItem('token');
        if(token != undefined) {
            this.props.authActions.getUserInfo();
        }
    }

    async componentDidMount() {
        let tab = localStorage.getItem('tab');
        this.setState({tab: tab});
        await new Promise(resolve => resolve(this.props.adminActions.getListStaffShip()));
        await new Promise(resolve => resolve(this.props.adminActions.getListCustomer()));
        await new Promise(resolve => resolve(this.props.staffActions.getBill()));
    }

    open (e,tab) {
        e.preventDefault();
        if(tab == 'transfer' && $("#transfer").hasClass('active') == false) {
            localStorage.setItem('tab', 1);
            this.setState({tab: 1});
            // $(".side nav li").removeClass("active");
            // $("#personal").addClass("active");
        }
            
    }

    onLogout = () => {
        this.props.authActions.logout();
        window.location.reload(true);
    }

    showDetailProduct = (product) => {
        this.setState({product: product});
    } 

    render() {
        var {product, detail, adcustomer,staff}=this.props;
        const listDetails = detail.map((detail, idx) => {
            // let time = moment.unix(detail.bill.create_date).local().format('YYYY-MM-DD HH:mm:ss');
            let user = adcustomer[adcustomer.findIndex(obj => obj.id == detail.bill.user)].fullname;
            let staffs = staff[staff.findIndex(obj => obj.staff_id == detail.bill.staff)].name;
            return (
                <tr key={idx}>
                    <td>{detail.bill.bill_id}</td>
                    <td>{user}</td>
                    <td>{detail.bill.create_date}</td>
                    <td>{detail.bill.status_product == 1 ? "Chưa giao hàng": "Đã giao hàng"}</td>
                    <td><i 
                    className="fas fa-caret-down" 
                    data-toggle="modal" data-target="#detailmodal"
                    onClick={() => this.showDetailProduct(detail.product)}
                    ></i></td>
                    <td>{staffs}</td>
                </tr>
            )
        });
        return (
            <div style={{ background: 'gainsboro' }}>
                <SubHeader
                onLogout={this.onLogout}/>
                
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <div className="collapse navbar-collapse navbar-ex1-collapse">
                        <ul className="nav navbar-nav side-nav">
                            <li>
                                <Link to="/">GUN</Link>
                            </li>
                            <li id="transfer">
                                <Link to="#" 
                                className={this.state.tab == 1 ? "active":""}
                                onClick={(e) => this.open(e,'transfer')}><i className="fa fa-fw fa-user-plus"></i>Kiểm tra đơn hàng</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10" style={{marginTop: '63px'}}>
                    <div className="pn-right">
                        
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Mã đơn</th>
                                        <th>Người mua</th>
                                        <th>Ngày đặt</th>
                                        <th>Tình trạng</th>
                                        <th>Chi tiết đơn hàng</th>
                                        <th>Nhân viên giao hàng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listDetails}
                                </tbody>
                            </table>
                        </div>
                        <DetailBox
                            product={this.state.product}/>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        product: state.product,
        detail: state.detail,
        adcustomer: state.adcustomer,
        staff: state.staff
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        staffActions: bindActionCreators(staffActions, dispatch),
        adminActions: bindActionCreators(adminActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StaffHome);
