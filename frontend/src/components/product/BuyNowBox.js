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

class BuyNowBox extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        var {product,user}=this.props;
        
        return (
            <div className="modal fade" id="buymodal" role="dialog">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title">Đặt hàng</h4>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                    <img src={"static/dataset/"+product.image} style={{width: '100%'}}/>
                                </div>                              
                                <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">                                 
                                    <form className="form-horizontal" role="form">
                                        <div className="form-group">                                           
                                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                                <label>Người mua hàng: </label>
                                            </div>                                        
                                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                                <p>{user.fullname}</p>
                                            </div>                                          
                                        </div>
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
                                                <p>{product.quantity}</p>
                                            </div>                                          
                                        </div>
                                        <div className="form-group">                                           
                                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                                <label>Địa chỉ: </label>
                                            </div>                                        
                                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                                <p>{user.address}</p>
                                            </div>                                          
                                        </div>
                                        <div className="form-group">                                           
                                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                                <label>Số điện thoại: </label>
                                            </div>                                        
                                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                                <p>{user.phone}</p>
                                            </div>                                          
                                        </div>
                                        <div className="form-group">                                           
                                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                                <label>Thanh toán: </label>
                                            </div>                                        
                                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                                <p>{product.price - product.promotion}</p>
                                            </div>                                          
                                        </div>
                                        <div className="form-group">                                           
                                            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                                <p style={{color: 'red'}}>Bạn vui lòng kiểm tra thông tin. Nhấn mua hàng nếu hoàn tất</p>
                                            </div>                                                                           
                                        </div>
                                        <div className="form-group">
                                            <div className="col-sm-10 col-sm-offset-2">
                                                <button 
                                                type="submit" 
                                                className="btn btn-primary"
                                                style={{float: 'right', marginTop: '23px'}}
                                                >Gửi</button>
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

export default BuyNowBox;
