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
            product: {
                image: "",
                name: "",
                color: "",
                quantity: "",
                price: "",
                promotion: ""
            },
            select_product_buy: "",
            toggleActive: false,
        };
    }

    componentDidMount() {
        // if(this.props.coin) {
        //     this.setState({coin: this.props.coin});
        // }
    }

    onToggle = () => {
        this.setState({ toggleActive: !this.state.toggleActive });
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;  
        var value = target.value;
        this.setState({
            [name]:value
        });
    }

    onBuyNowFromCart = (product) => {
        if(this.props.user.username == "") {
            window.location.href="/login";
        } else {

            let numbuy = product.num_buy;
            let num_coin = this.refs.open_coin.checked == true ? this.props.coin[0].count : 0;
            
            if(numbuy > product.quantity) {
                toastr.warning(`Kho hàng chỉ còn ${product.quantity} sản phẩm!`);
            }
            else {
                product.number_product_order = numbuy;
                product.coin = {
                    coin_id: this.props.coin[0].coin_id,
                    count: this.props.coin[0].count,
                    num_coin_use: num_coin
                };
                this.setState({ product: product });
            }
        }
    }

    deleteFromCart = (cart_id) => {
        this.props.deleteFromCart(cart_id);
    }

    render() {
        var {cart,user,staff,transporter,coin}=this.props;
        const { product}=this.state;
        console.log(coin);
        
        const listCart = cart.product
        .map((product_each,idx) => {
            return (
                <div className="row" key={idx} style={{paddingBottom: '40px'}}>
                        <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                            <img src={"static/dataset/"+product_each.image} className="img_on_cart"/>
                        </div>
                             
                        <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4"
                        style={{borderLeft: '1px solid', borderRight: '1px solid'}}>
                            <p>{product_each.name}</p>
                        </div>
                             
                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1"
                        style={{borderRight: '1px'}}>
                            <input type="number" className="form-control" value={product_each.num_buy} readOnly/>
                        </div>
                             
                        <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1" style={{marginTop: '6px'}}>
                            <i className="fa fa-trash" aria-hidden="true"
                            style={{cursor: 'pointer'}}
                            title="Delete"
                            onClick={() => this.deleteFromCart(product_each.cart_id)}
                            ></i>
                        </div>
                        
                        <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"
                            style={{borderLeft: '1px solid', display: 'flex'}}>
                            <div className="row">
                                <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                                    <h5 
                                    style={{color: 'red', marginBottom: '0', marginTop: '0'}}
                                    >{(product_each.price - (product_each.price * product_each.promotion/100)).toLocaleString(navigator.language, { minimumFractionDigits: 0 })} Đ</h5>
                                    {product_each.promotion != 0 && 
                                    <h5><i><strike>{(product_each.price * product_each.promotion/100).toLocaleString(navigator.language, { minimumFractionDigits: 0 })} Đ</strike></i></h5>}
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
                    <p style={{marginLeft: '751px'}}>Sử dụng xu: </p>

                        <div className="checkbox" style={{marginTop: '0px', marginLeft: '10px'}}>
                        <label>
                            <input type="checkbox" data-toggle="toggle" ref="open_coin"/>
                        </label>
                        </div>
                    </div>
                    <div className="panel-body">              
                        <div className="row">                     
                                {listCart}     
                                    <BuyNowBox
                                        user={user}
                                        product={product}
                                        transporter={transporter}
                                        staff={staff}
                                        createBill={this.props.createBill}
                                        deleteFromCart={this.deleteFromCart}
                                        updateCoin={this.props.updateCoin}
                                    />
                                    
                        </div>
                    </div>
                </div>
            </div>         
        )
    }
}

export default Cart;
