import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import * as authActions from '../../actions/authActions';
import * as userActions from '../../actions/userActions';
import * as staffActions from '../../actions/staffActions';
// import { Button, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import { Button, Form, FormGroup, Label, Input, FormText,Row, Col, Badge } from 'reactstrap';
import SubHeader from '../SubHeader';
import InfoBox from './InfoBox';
import moment from 'moment';
import 'moment-timezone';
import toastr from 'toastr';
import AddCommentBox from './AddCommentBox';
var $ = require("jquery");


class CheckTransfer extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            tab: 1,
            currentPage: 0,
            content_cmt: "",
            product_id: 0,
            user_id: 0,
            rating: 0
        }
    }

    componentWillMount() {
        let token = localStorage.getItem('token');
        if(token != undefined) {
            this.props.authActions.getUserInfo();
        }
    }

    async componentDidMount() {
        let tab = localStorage.getItem('tabTransfer');
        this.setState({tab: parseInt(tab)});
        await new Promise(resolve => resolve(this.props.staffActions.getBillUser()));
    }

    componentWillUnmount() {
        localStorage.removeItem('tabTransfer');
    }

    componentWillReceiveProps(nextProps) {
        //data product with pagination
        this.dataBill = nextProps.detail.map(
            (a, i) => a
        );
        this.pageSizeBill = 7;
        this.pagesCountBill = Math.ceil(this.dataBill.length / this.pageSizeBill);
    }

    open (e,tab) {
        e.preventDefault();
        if(tab == 'personal' && $("#personal").hasClass('active') == false) {
            localStorage.setItem('tab', 1);
            this.setState({tab: 1});
            // $(".side nav li").removeClass("active");
            // $("#personal").addClass("active");
        }
           
        if(tab == 'transfer' && $("#transfer").hasClass('active') == false) {
            localStorage.setItem('tab', 2);
            this.setState({tab: 2});
        }
            
    }

    onLogout = () => {
        this.props.authActions.logout();
        window.location.reload(true);
    }

    changeInfo = (user_info) => {
        this.props.userActions.changeInfo(user_info);
    }
    
    sendDataToAddContent = (product_id, user_id, rating) => {
        this.setState({user_id: user_id, product_id: product_id, rating: rating});
    }

    userAddComment = (content, product_id, user_id) => {
        this.props.userActions.userAddComment(content, product_id, user_id);
        toastr.success("Thêm đánh giá thành công. Cảm ơn quý khách đã sử dụng dịch vụ!");
    }

    userRatingProduct = (product_id, rating) => {
        this.props.userActions.userRatingProduct(product_id, rating);
    }

    render() {
        var {detail, user}=this.props;
        var { currentPage } = this.state;
        var listDetails = [];
        if (this.dataBill != undefined) {
            listDetails = this.dataBill
                .slice(
                    currentPage * this.pageSizeBill,
                    (currentPage + 1) * this.pageSizeBill)
                .map((EachDetail, idx) => {
                    let timestamp = moment(EachDetail.bill.create_date).unix();
                    let date = moment(timestamp).format("MM/DD/YYYY HH:mm");
                    
                    return (
                        <tr key={idx}>
                            <td>{EachDetail.bill.bill_id}</td>
                            <td>{date}</td>
                            <td>{EachDetail.bill.status_product == 1 ? "Chưa thanh toán" : (EachDetail.bill.status_product == 2 ? "Đã giao hàng":"Đang giao hàng")}</td>
                            <td>{EachDetail.product.name}</td>
                            <td>{EachDetail.product.number_product_order}</td>
                            <td>
                                {EachDetail.bill.status_product == 2 && 
                                <button 
                                className="btn btn-default"
                                data-toggle="modal" data-target="#addComment"
                                onClick={() => this.sendDataToAddContent(EachDetail.product.product_id, user.id, EachDetail.product.rating)}
                                >Thêm đánh giá</button>}
                                <AddCommentBox
                                user={this.state.user_id}
                                product={this.state.product_id}
                                rating={this.state.rating}
                                userAddComment={this.userAddComment}
                                userRatingProduct={this.userRatingProduct}/>
                            </td>
                        </tr>
                    )
                });
        }
        return (
            <div style={{ background: 'gainsboro' }}>
                <SubHeader
                onLogout={this.onLogout}/>
                
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <div className="collapse navbar-collapse navbar-ex1-collapse">
                        <ul className="nav navbar-nav side-nav">
                            <li>
                                <Link to="/" style={{padding: '0'}}>
                                    <img src="/static/img/lg.png"
                                    style={{height: '50px', width: '225px'}}/> 
                                </Link>
                            </li>
                            <li id="personal">
                                <Link to="#" 
                                style={{color: "white"}}
                                className={this.state.tab == 1 ? "active":""}
                                onClick={(e) => this.open(e,'personal')}><i className="fa fa-fw fa-user-plus"></i> Thông tin cá nhân</Link>
                            </li>
                            <li id="transfer">
                                <Link to="#"
                                style={{color: "white"}}
                                className={this.state.tab == 2 ? "active":""}
                                 onClick={(e) => this.open(e,'transfer')}><i className="fa fa-fw fas fa-file"></i> Kiểm tra đơn hàng</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                
                {/* Personal */}
                {this.state.tab == 1 &&
                    <InfoBox
                    user={this.props.user}
                    changeInfo={this.changeInfo}
                    /> 
                }
                
                {this.state.tab == 2 &&
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10" style={{marginTop: '63px'}}>
                    <div className="pn-right">
                        
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Mã đơn</th>
                                        <th>Ngày đặt</th>
                                        <th>Tình trạng</th>
                                        <th>Tên sản phẩm</th>
                                        <th>Số lượng</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        detail: state.detail,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
        staffActions: bindActionCreators(staffActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckTransfer);
