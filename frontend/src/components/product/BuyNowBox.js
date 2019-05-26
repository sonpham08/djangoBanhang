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

class BuyNowBox extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    createBill = (e) => {
        e.preventDefault();
        let {product, user}=this.props;
        let coin = product.coin;
        let choose_transporter = this.refs.choose_transporter.value.split("-");
        let staff_id = parseInt(choose_transporter[0]);
        let price_transfer = parseInt(choose_transporter[1]);
        let bill = {
            total_price: product.price - product.price * (product.promotion/100) + price_transfer - product.number_coin_use*1000,
            address: user.address,
            status: "Nothing",
            user: user.id,
            status_product: 1,
            staff: staff_id,
            number_product_order: product.number_product_order,
            product_id: product.product_id,
        };
        // let email = {
        //     fullname: user.fullname,
        //     address: user.address,
        //     status_product: "Sản phẩm đã được chuyển cho"
        // };

        // update coin
        this.props.updateCoin(coin);
        
        this.props.createBill(bill);
        //get cart_id by product_id in cart

        //delete product out of cart
        this.props.deleteFromCart(product.cart_id);
        // $("#buymodal").modal('hide');
    }

    render() {
        var {product,user,staff}=this.props;
        console.log(product);
        
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
                                    <form className="form-horizontal" role="form" onSubmit={this.createBill}>
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
                                                <p>{product.number_product_order}</p>
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
                                                <label>Xu: </label>
                                            </div>                                        
                                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                                {product.coin && <p>Giảm {product.coin.num_coin_use * 1000} Đ với {product.coin.num_coin_use} xu.</p>}
                                            </div>                                          
                                        </div>

                                        <div className="form-group">                                           
                                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                                <label>Thanh toán: </label>
                                            </div>                                        
                                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                                <p>{product.price - (product.price * product.promotion/100)} Đ</p>
                                            </div>                                          
                                        </div>
        
                                        <div className="form-group">                                           
                                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                                <label>Hình thức thanh toán: </label>
                                            </div>                                        
                                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                            <select name="" id="input" className="form-control" required="required" ref="choose_transporter">
                                                <option value={0}>Thanh toán khi nhận hàng</option>
                                                <option value={1}>Thanh toán bằng thẻ</option>
                                            </select>
                                            </div>                                          
                                        </div>
                                        <div className="form-group">                                           
                                            <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                                <label>Bên giao hàng: </label>
                                            </div>                                        
                                            <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7">
                                            <select name="" id="input" className="form-control" required="required" ref="choose_transporter">
                                                {
                                                    staff.map((sta, idx) => 
                                                        <option key={idx} value={`${sta.staff_id}` + '-' + `${sta.price}`}>{sta.name} -- {sta.transporter[0].name} -- {sta.price}Đ</option>
                                                    )
                                                }
                                            </select>
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
