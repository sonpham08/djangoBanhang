import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import * as authActions from '../../actions/authActions';
import * as adminActions from '../../actions/adminActions';
import * as userActions from '../../actions/userActions';
import * as staffActions from '../../actions/staffActions';
// import { Button, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import SubHeader from '../SubHeader';
import moment from 'moment';
import 'moment-timezone';
import toastr from 'toastr';
import DetailBox from './DetailBox';
var $ = require("jquery");


class StaffHome extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            tab: 0,
            product: {},
            bill: {},
            currentPage: 0,
            search_name: ""
        }
    }

    componentWillMount() {
        let token = localStorage.getItem('token');
        if (token != undefined) {
            this.props.authActions.getUserInfo();
        }
    }

    async componentDidMount() {
        // let tab = parseInt(localStorage.getItem('tab'));
        // this.setState({ tab: tab });
        await new Promise(resolve => resolve(this.props.adminActions.getListCategory()));
        await new Promise(resolve => resolve(this.props.adminActions.getListStaffShip()));
        await new Promise(resolve => resolve(this.props.adminActions.getListCustomer()));
        await new Promise(resolve => resolve(this.props.adminActions.getListProduct()));
        await new Promise(resolve => resolve(this.props.staffActions.getBill()));
    }

    componentWillReceiveProps(nextProps) {
        //data product with pagination
        this.dataBill = nextProps.detail.map(
            (a, i) => a
        );
        this.pageSizeBill = 7;
        this.pagesCountBill = Math.ceil(this.dataBill.length / this.pageSizeBill);

        //data product with pagination
        this.dataProduct = nextProps.adproduct.map(
            (a, i) => a
        );
        this.pageSizeProduct = 5;
        this.pagesCountProduct = Math.ceil(this.dataProduct.length / this.pageSizeProduct);
    }

    handleSwitchPagination(e, index) {
        e.preventDefault();
        this.setState({
            currentPage: index
        });
    }

    open(e, tab) {
        e.preventDefault();
        if (tab == 'transfer' && $("#transfer").hasClass('active') == false) {
            localStorage.setItem('tab', 1);
            this.setState({ tab: 1 });
            // $(".side nav li").removeClass("active");
            // $("#personal").addClass("active");
        }
        if (tab == 'product' && $("#product").hasClass('active') == false) {
            localStorage.setItem('tab', 2);
            this.setState({ tab: 2 });
        }
    }

    onLogout = () => {
        this.props.authActions.logout();
        window.location.reload(true);
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;  
        var value = target.value;
        this.setState({
            [name]:value
        });
    }

    showDetailProduct = (product, bill) => {
        this.setState({ product: product, bill: bill });
    }

    confirmBill = (staff, bill_id, rest, quantity, product_id) => {
        let status_product = 3;
        this.props.staffActions.editBillWithStaffAndQuantity(bill_id, staff.staff_id, status_product);
        this.props.staffActions.editQuanityProductAfterBuy(product_id, rest);
        this.props.staffActions.addDealedProduct(quantity, product_id);
        toastr.success("Đơn hàng đã được duyệt");
    }

    changeStatusProduct = (bill_id, staff_id, status_product) => {
        if(window.confirm('Đơn hàng đã được chuyển đến người dùng!')) {
            this.props.staffActions.editBillWithStaffAndQuantity(bill_id, staff_id, status_product);
            toastr.success("Đơn hàng đã được giao");
        }
    }

    deleteBill = (product, bill_id) => {
        if(window.confirm('Bạn có chắc là xóa hóa đơn này ?')) {
            this.props.staffActions.deleteBill(product, bill_id);
        }
    }

    onSearchProductName = () => {
        let product_name = this.refs.search_name.value;
        if(product_name != "") {
            this.setState({search_name: product_name});
        } else {
            window.location.reload(true);
        }
    }

    render() {
        var { product, detail, adcustomer, staff } = this.props;
        var { currentPage } = this.state;
        
        var { tab, search_name } = this.state;
        if (tab == 0) {
            if (localStorage.getItem('tab') == undefined) {
                tab = 1;
            } else {
                tab = parseInt(localStorage.getItem('tab'));
            }
        }
        var listDetails = [];
        if(search_name != "") {
            this.dataProduct = this.dataProduct.filter((product) => {
                return product.name == search_name;
            });
        }
        if (this.dataBill != undefined) {
            listDetails = this.dataBill
                .slice(
                    currentPage * this.pageSizeBill,
                    (currentPage + 1) * this.pageSizeBill)
                .map((EachDetail, idx) => {
                    // let time = moment.unix(EachDetail.bill.create_date).local().format('YYYY-MM-DD HH:mm:ss');
                    let user = adcustomer[adcustomer.findIndex(obj => obj.id == EachDetail.user)].fullname;
                    let staffs = staff[staff.findIndex(obj => obj.staff_id == EachDetail.bill.staff)].name;
                    let timestamp = moment(EachDetail.bill.create_date).unix();
                    let date = moment(timestamp).format("MM/DD/YYYY HH:mm");
                    
                    return (
                        <tr key={idx}>
                            <td>{EachDetail.bill.bill_id}</td>
                            <td>{user}</td>
                            <td>{date}</td>
                            <td>{EachDetail.bill.status_product == 1 ? "Chưa thanh toán" : (EachDetail.bill.status_product == 2 ? "Đã giao hàng":"Đang giao hàng")}</td>
                            <td align={"center"}>
                                {EachDetail.bill.status_product == 1 ? <i
                                    className="fas fa-caret-down"
                                    data-toggle="modal" data-target="#detailmodal"
                                    onClick={() => this.showDetailProduct(EachDetail.product, EachDetail.bill)}
                                ></i> :
                                    (EachDetail.bill.status_product == 2) ?
                                        <i className="fas fa-check"></i> : <i className="fas fa-exchange-alt"></i>
                                }
                            </td>
                            <td>{staffs}</td>
                            <td align="right">
                                <button type="button" className="btn btn-default mg-left"
                                 onClick={() => this.changeStatusProduct(EachDetail.bill.bill_id, EachDetail.bill.staff, 2)}>
                                    <i className="fas fa-edit"></i> Đã giao hàng</button>
                                <button type="button" className="btn btn-danger mg-left"
                                 disabled={EachDetail.bill.status_product == 1 ? false:true}
                                 onClick={() => this.deleteBill(EachDetail.product, EachDetail.bill.bill_id)}
                                 >
                                    <i className="fas fa-trash"></i> Xóa</button>
                            </td>
                        </tr>
                    )
                });
        }
        if(tab == 1) {
            return (
                <div style={{ background: 'gainsboro' }}>
                    <SubHeader
                        onLogout={this.onLogout} />
    
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <div className="collapse navbar-collapse navbar-ex1-collapse">
                            <ul className="nav navbar-nav side-nav">
                                <li>
                                    <Link to="/" style={{padding: '0'}}>
                                        <img src="/static/img/lg.png"
                                        style={{height: '50px', width: '225px'}}/> 
                                    </Link>
                                </li>
                                <li id="transfer">
                                    <Link to="#"
                                        className={tab == 1 ? "active" : ""}
                                        onClick={(e) => this.open(e, 'transfer')}><i className="fa fa-fw fa-user-plus"></i>Kiểm tra đơn hàng</Link>
                                </li>
                                <li id="product">
                                    <Link to="#"
                                        className={tab == 2 ? "active" : ""}
                                        onClick={(e) => this.open(e, 'product')}><i className="fab fa-product-hunt"></i>Sản phẩm trong kho</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
    
                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10" style={{ marginTop: '63px' }}>
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
                                        {
                                            listDetails
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <DetailBox
                                product={this.state.product}
                                bill={this.state.bill}
                                staff={staff}
                                confirmBill={this.confirmBill}
                            />
    
                            <React.Fragment>
                                <div className="pagination-wrapper">
                                    <Pagination aria-label="Page navigation example">
                                        <PaginationItem disabled={currentPage <= 0}>
                                            <PaginationLink
                                                onClick={e => this.handleSwitchPagination(e, currentPage - 1)}
                                                previous
                                                href="#"
                                            />
                                        </PaginationItem>
                                        {[...Array(this.pagesCountBill)].map((page, i) =>
                                            <PaginationItem active={i === currentPage} key={i}>
                                                <PaginationLink onClick={e => this.handleSwitchPagination(e, i)} href="#">
                                                    {i + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )}
                                        <PaginationItem disabled={currentPage >= this.pagesCountBill - 1}>
                                            <PaginationLink
                                                onClick={e => this.handleSwitchPagination(e, currentPage + 1)}
                                                next
                                                href="#"
                                            />
                                        </PaginationItem>
                                    </Pagination>
                                </div>
                            </React.Fragment>
                        </div>
                    </div>
                </div>
            )
        }
        
        if(tab == 2) {
            return (
                <div style={{ background: 'gainsboro' }}>
                    <SubHeader
                        onLogout={this.onLogout} />
    
                    <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                        <div className="collapse navbar-collapse navbar-ex1-collapse">
                            <ul className="nav navbar-nav side-nav">
                                <li>
                                    <Link to="/" style={{padding: '0'}}>
                                        <img src="/static/img/lg.png"
                                        style={{height: '50px', width: '225px'}}/> 
                                    </Link>
                                </li>
                                <li id="transfer">
                                    <Link to="#"
                                        className={tab == 1 ? "active" : ""}
                                        onClick={(e) => this.open(e, 'transfer')}><i className="fa fa-fw fa-user-plus"></i>Kiểm tra đơn hàng</Link>
                                </li>
                                <li id="product">
                                    <Link to="#"
                                        className={tab == 2 ? "active" : ""}
                                        onClick={(e) => this.open(e, 'product')}><i className="fab fa-product-hunt"></i>Sản phẩm trong kho</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
    
                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10" style={{ marginTop: '63px' }}>
    
                        <div className="panel panel-danger">
                            <div className="panel-heading">
                                <h3 className="panel-title">Quản lý sản phẩm</h3>
                                <div className="form_cate_ad">
                                <label>Tên sản phẩm: </label>
                                <input type="text" className="form-control" 
                                ref="search_name"/>
                                <i className="fas fa-search"
                                style={{marginTop: '10px', marginLeft: '3px'}}
                                onClick={this.onSearchProductName}></i>
                            </div>
                            </div>
                            <div className="panel-body">
                                <table className="table table-striped table-hover">
                                    <thead>
                                        <tr>
                                            <th>Tên sản phẩm</th>
                                            <th>Giá</th>
                                            <th>Kích cỡ</th>
                                            <th>Số lượng nhập</th>
                                            <th>Hệ điều hành</th>
                                            <th>Màu sắc</th>
                                            <th>CPU</th>
                                            <th>Bộ nhớ</th>
                                            <th>Máy ảnh(MP)</th>
                                            <th>Pin(mAh)</th>
                                            <th>Bảo hành</th>
                                            <th>Khuyến mãi</th>
                                            <th>Loại máy</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.dataProduct != undefined ?
                                                this.dataProduct
                                                    .slice(
                                                        currentPage * this.pageSizeProduct,
                                                        (currentPage + 1) * this.pageSizeProduct
                                                    )
                                                    .map((product, idx) =>
                                                        <tr key={idx}>
                                                            <td>{product.name}</td>
                                                            <td>{product.price}</td>
                                                            <td>{product.size}</td>
                                                            <td>{product.quantity}</td>
                                                            <td>{product.hdh}</td>
                                                            <td>{product.color}</td>
                                                            <td>{product.CPU}</td>
                                                            <td>{product.memory}</td>
                                                            <td>{product.camera}</td>
                                                            <td>{product.pin}</td>
                                                            <td>{product.gurantee}</td>
                                                            <td>{product.promotion}%</td>
                                                            <td>{product.category.name}</td>
                                                        </tr>

                                                    ) : <tr></tr>
                                        }
                                    </tbody>
                                </table>

                            </div>
                            <React.Fragment>
                                <div className="pagination-wrapper">
                                    <Pagination aria-label="Page navigation example">
                                        <PaginationItem disabled={currentPage <= 0}>
                                            <PaginationLink
                                                onClick={e => this.handleSwitchPagination(e, currentPage - 1)}
                                                previous
                                                href="#"
                                            />
                                        </PaginationItem>
                                        {[...Array(this.pagesCountProduct)].map((page, i) =>
                                            <PaginationItem active={i === currentPage} key={i}>
                                                <PaginationLink onClick={e => this.handleSwitchPagination(e, i)} href="#">
                                                    {i + 1}
                                                </PaginationLink>
                                            </PaginationItem>
                                        )}
                                        <PaginationItem disabled={currentPage >= this.pagesCountProduct - 1}>
                                            <PaginationLink
                                                onClick={e => this.handleSwitchPagination(e, currentPage + 1)}
                                                next
                                                href="#"
                                            />
                                        </PaginationItem>
                                    </Pagination>
                                </div>
                            </React.Fragment>
                        </div>

                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        product: state.product,
        detail: state.detail,
        adcustomer: state.adcustomer,
        staff: state.staff,
        adproduct: state.adproduct
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
