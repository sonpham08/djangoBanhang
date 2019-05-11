import React, { Component } from 'react';
import { Pagination, 
    PaginationItem, 
    PaginationLink ,
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter 
} from 'reactstrap';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import BuyNowBox from './BuyNowBox';
import toastr from 'toastr';
var $ = require("jquery");

class Cart extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            num_buy: 1,
            product: {
                image: "",
                name: "",
                color: "",
                quantity: "",
                price: "",
                promotion: ""
            },
            select_product_buy: ""
        };
    }

    componentWillReceiveProps(nextProps) {
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;  
        var value = target.value;
        this.setState({
            [name]:value
        });
        this.setState({
            flag_for_msg: false,
        });
    }

    onBuyNowFromCart = (product) => {
        if(this.props.user.username == "") {
            window.location.href="/login";
        } else {
            let numbuy = parseInt(this.state.num_buy);
            if(numbuy > product.quantity) {
                toastr.warning(`Kho hàng chỉ còn ${product.quantity} sản phẩm!`);
            }
            else {
                product.number_product_order = numbuy;
                this.setState({ product: product });
            }
        }
    }

    deleteFromCart = (cart_id) => {
        this.props.deleteFromCart(cart_id);
    }

    render() {
        const {cart,user,staff}=this.props;
        const {num_buy, product}=this.state;
        const listCart = cart.product
        .map((product_each,idx) => {
            return (
                <div className="row" key={idx}>
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <img src={"static/dataset/"+product_each.image} className="img_on_cart"/>
                        </div>
                             
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"
                        style={{borderLeft: '1px solid', borderRight: '1px solid'}}>
                            <p>{product_each.name}</p>
                        </div>
                             
                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"
                        style={{borderRight: '1px'}}>
                            <input type="number" className="form-control" name="num_buy"
                            value={num_buy} onChange={this.onChange}/>
                        </div>
                             
                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">
                            <i className="fa fa-trash" aria-hidden="true"
                            style={{cursor: 'pointer'}}
                            onClick={() => this.deleteFromCart(product_each.cart_id)}
                            ></i>
                        </div>
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"
                            style={{borderLeft: '1px solid', display: 'flex'}}>
                            <div className="row">
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <h5 
                                    style={{color: 'red', marginBottom: '0', marginTop: '0'}}
                                    >{product_each.price - (product_each.price * product_each.promotion/100)} Đ</h5>
                                    {product_each.promotion != 0 && 
                                    <h5><i><strike>{product_each.price * product_each.promotion/100} Đ</strike></i></h5>}
                                </div>  
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">             
                                    <button type="button" className="btn btn-success"
                                    style={{float: 'left'}}
                                    onClick={() => this.onBuyNowFromCart(product_each)}
                                    data-toggle="modal" data-target="#buymodal"
                                    >Thanh toán</button>
                                        {/* <input type="checkbox" value={product_each.product_id} name="select_product_buy"/> */}
                                </div>
                            </div>
                        </div>    
                </div>
            )
        });
        return (
            <div style={{background:'gainsboro'}}>
                <div className="panel panel-primary">
                    <div className="panel-heading" style={{display: 'flex', background: '#007b5e'}}>Giỏ hàng của tôi 
                    <p><i> (Hiện tại đang có {this.props.cart.product.length} sản phẩm)</i></p>
                    </div>
                    <div className="panel-body">              
                        <div className="row">                     
                                {listCart}     
                                { num_buy <= product.quantity &&     
                                    <BuyNowBox
                                        user={user}
                                        product={product}
                                        staff={staff}
                                        createBill={this.props.createBill}
                                        deleteFromCart={this.deleteFromCart}
                                    />
                                }                   
                        </div>
                    </div>
                </div>
            </div>         
        )
    }
}

export default Cart;
