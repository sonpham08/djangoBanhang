import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './Header';
import MenuCategory from './MenuCategory';
import ProductList from './product/ProductList';
import ProductListPC from './product/ProductListPC';
import ProductDetail from './product/ProductDetail';
import Cart from './product/Cart';
import * as authActions from '../actions/authActions';
import * as userActions from '../actions/userActions';

var $ = require("jquery");

class Home extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            showDetail: false,
            product: {},
            showCart: false,
            cart: {}
        }
    }

    componentWillMount() {
        let token = localStorage.getItem('token');
        if(token != undefined) {
            this.props.userActions.getListCart();
        }
    }

    async componentDidMount() {
        await new Promise(resolve => resolve(this.props.userActions.getListProductUser()));
        await new Promise(resolve => resolve(this.props.userActions.getListStaffship()));
    }

    getUserInfo = () => {
        this.props.authActions.getUserInfo();
    }

    logout = () => {
        this.props.authActions.logout();
    }

    showProductDetail = (product) => {
        this.setState({showDetail: true, product: product});
    }

    showCart = () => {
        this.setState({showCart: true});
    }

    addToCart = (product_id, user_id) => {
        this.props.userActions.addToCart(product_id, user_id);
    }

    deleteFromCart = (cart_id) => {
        this.props.userActions.deleteFromCart(cart_id);
    }

    createBill = (bill) => {
        this.props.userActions.createBill(bill);
    }

    render() {
        var {showDetail,showCart}=this.state;
        var {isAuthenticated,user, uscategories,cart, staff} = this.props;
        
        return (
            <div style={{background:'gainsboro'}}>
                <Header
                cart={cart}
                isAuthenticated={isAuthenticated}
                user={user}
                getUserInfo={this.getUserInfo}
                logout={this.logout}
                showCart={this.showCart}
                />
                {showDetail == false && showCart == false &&
                <div className="row">     
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">   
                    </div>
                    <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10">
                        <MenuCategory />
                    </div>            
                    <div className="col-xs-1 col-sm-1 col-md-1 col-lg-1">                      
                    </div> 
                </div>
                }
                {showDetail == false && showCart == false &&
                <div className="body" style={{ marginTop: '150px', padding: '5px 40px' }}>
                   
                        <div className="row">
                            <ProductList
                            usproduct={this.props.usproduct}
                            showProductDetail={this.showProductDetail}
                            {...this.props}/>
                        </div>

                        <div className="row">
                            <ProductListPC
                            product={this.state.product}/>
                        </div>
                </div>
                }

                {showDetail == true && showCart == false &&
                <div className="body" style={{ marginTop: '52px', padding: '5px 40px' }}>
                    <div className="row">
                        <ProductDetail
                        {...this.props}
                        product={this.state.product}
                        addToCart={this.addToCart}
                        />
                    </div>
                </div>
                }

                {showCart == true &&
                <div className="body" style={{ marginTop: '52px', padding: '5px 40px' }}>
                    <Cart
                    {...this.props}
                    deleteFromCart={this.deleteFromCart}
                    createBill={this.createBill}
                    staff={staff}
                    />
                </div>
                }
                
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth,
        user: state.user,
        usproduct: state.usproduct,
        uscategories: state.uscategories,
        cart: state.cart,
        staff: state.staff
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
