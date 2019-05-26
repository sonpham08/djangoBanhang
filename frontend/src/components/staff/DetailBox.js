import React, { Component } from 'react';
import {
    Pagination,
    PaginationItem,
    PaginationLink,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';

var $ = require("jquery");

class DetailBox extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    informBill = (e) => {
        e.preventDefault();
        let staff = this.refs.choose_staff.value;
        let quantity = this.props.product.number_product_order;
        let rest = this.props.product.rest_product;
        let product_id = this.props.product.product_id;
        let bill_id = this.props.bill.bill_id;
        this.props.confirmBill(staff, bill_id, rest, quantity, product_id);
    }

    render() {
        var {product,staff}=this.props;
        let checkout = (parseInt(product.price) - parseInt(product.promotion)) || 0;
        return (
            <div className="modal fade" id="detailmodal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Đơn hàng đang chờ xét duyệt</h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                    <img src={"static/dataset/"+product.image} style={{width: '100%'}}/>
                                </div>                              
                                <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">                                 
                                    <form className="form-horizontal" role="form" onSubmit={this.informBill}>
                                        <div className="form-group">                                           
                                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                                <label>Tên sản phẩm: </label>
                                            </div>                                        
                                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                                <p>{product.name}</p>
                                            </div>                                          
                                        </div>
                                        <div className="form-group">                                           
                                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                                <label>Màu sắc: </label>
                                            </div>                                        
                                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                                <div className="square_color" style={{background: product.color}}></div>
                                            </div>                                          
                                        </div>
                                        <div className="form-group">                                           
                                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                                <label>Số lượng: </label>
                                            </div>                                        
                                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                                <p>{product.number_product_order}</p>
                                            </div>                                          
                                        </div>
                                        <div className="form-group">                                           
                                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                                <label>Thanh toán: </label>
                                            </div>                                        
                                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                                <p>{checkout} Đ</p>
                                            </div>                                          
                                        </div>
                                        <div className="form-group">                                           
                                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                                <label>Chọn nhân viên giao hàng: </label>
                                            </div>                                        
                                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                                <select name="" id="input" className="form-control" required="required" ref="choose_staff">
                                                    <option value={-1}>All</option>
                                                    {
                                                        staff.map((sta, idx) =>
                                                            <option key={idx} value={sta.staff_id}>{sta.name}</option>
                                                        )
                                                    }
                                                </select>
                                            </div>                                          
                                        </div>
                                        <div className="form-group">
                                            <div className="col-sm-10 col-sm-offset-2">
                                                <button 
                                                type="submit" 
                                                className="btn btn-primary"
                                                style={{float: 'right', marginTop: '23px'}}
                                                >Xác nhận</button>
                                            </div>
                                        </div>
                                    </form>                                 
                                </div>                              
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default DetailBox;
