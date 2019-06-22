import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from './Header';
import MenuCategory from './MenuCategory';
import ProductList from './product/ProductList';
import ProductListPC from './product/ProductListPC';
import ProductListNew from './product/ProductListNew';
import ProductDetail from './product/ProductDetail';
import SearchProduct from './product/SearchProduct';
import Footer from './Footer';
import toastr from 'toastr';
import Cart from './product/Cart';
import * as authActions from '../actions/authActions';
import * as userActions from '../actions/userActions';
import * as adminActions from '../actions/adminActions';
import FlashSale from './product/FlashSale';

import {
    Chat,
    Channel,
    ChannelHeader,
    Thread,
    Window
  } from "stream-chat-react";
import { MessageList, MessageInput } from "stream-chat-react";
import { StreamChat } from "stream-chat";
  
import "stream-chat-react/dist/css/index.css";

// const chatClient = new StreamChat("qk4nn7rpcn75"); // Demo Stream Key
// const userToken =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiY29vbC1za3ktOSJ9.mhikC6HPqPKoCP4aHHfuH9dFgPQ2Fth5QoRAfolJjC4"; // Demo Stream Token

// chatClient.setUser(
//   {
//     id: "cool-sky-9",
//     name: "Cool sky",
//     image: "https://getstream.io/random_svg/?id=cool-sky-9&name=Cool+sky"
//   },
//   userToken
// );

// const channel = chatClient.channel("messaging", "godevs", {
//   // image and name are required, however, you can add custom fields
//   image:
//     "https://cdn.chrisshort.net/testing-certificate-chains-in-go/GOPHER_MIC_DROP.png",
//   name: "Talk about Go"
// });

var $ = require("jquery");

class Home extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);

        this.state = {
            showDetail: false,
            product: {},
            showCart: false,
            cart: {},
            search: {
                product_name: "",
                category: 0,
                camera: "",
                memory: "",
                price: ""
            }
        }
    }

    componentWillMount() {
        let token = localStorage.getItem('token');
        if(token != undefined) {
            this.props.userActions.getListCart();
        }
        // this.props.adminActions.getCoin()
    }

    async componentDidMount() {
        this.props.adminActions.getListProduct();
        this.props.userActions.getListProductUser()
        this.props.userActions.getListProductNew()
        this.props.userActions.getListProductPromotion()
        await new Promise(resolve => resolve(this.props.userActions.getListStaffship()));
        this.props.adminActions.getListCategory()
        this.props.adminActions.getListTransporter();
        await new Promise(resolve => resolve(this.props.adminActions.getCoin()));
        this.props.userActions.getComment();
        await new Promise(resolve => resolve(this.props.userActions.getFlashSale()));
        await new Promise(resolve => resolve(this.props.userActions.getLogging()));
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if(nextProps.user.logging !== this.props.user.logging && nextProps.user.id != "") {
            if(nextProps.user.logging.user.findIndex(obj => obj == nextProps.user.id) == -1) {
                this.props.userActions.logged(nextProps.user.id);
                let coin_user = nextProps.coin.filter(obj => {
                    return obj.user[0].user_id == nextProps.user.id
                });
                console.log(coin_user);
    
                if(coin_user.length > 0) {
                    this.props.userActions.addCoin(coin_user[0].coin_id, nextProps.user.id, coin_user[0].count);
                    toastr.success("Bạn đã được tặng 1 xu phần quà đăng nhập mỗi ngày!");
                }
                
            }
        }
    }

    componentWillUnmount() {
        localStorage.removeItem("listPro");
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

    addToCart = (product_id, user_id,how_many_buy) => {
        this.props.userActions.addToCart(product_id, user_id,how_many_buy);
    }

    deleteFromCart = (cart_id) => {
        this.props.userActions.deleteFromCart(cart_id);
    }

    createBill = (bill) => {
        this.props.userActions.createBill(bill);
    }

    onSearchProduct = (search_product) => {
        let search = this.state.search;
        search.product_name = search_product;
        search.category = 0;
        search.camera = "";
        search.memory = "";
        search.price = "";
        this.setState({
            search: search,
        })
    }

    onFilterProduct = (category) => {
        let search = this.state.search;
        search.category = category;
        search.product_name = "";
        search.camera = "";
        search.memory = "";
        search.price = "";
        this.setState({
            search: search
        });
    }

    onFilter = (category_id, name, value) => {
        let search = this.state.search;
        search.category = category_id;
        search.camera = name == "cam" ? value : "";
        search.memory = name == "memory" ? value : "";
        search.price = name == "price" ? value : "";
        this.setState({search:search});
    }

    updateCoin = (coin) => {
        this.props.userActions.updateCoin(coin);
    }

    getLogging = () => {
        this.props.userActions.getLogging();
    }

    sendEmail = (send) => {
        this.props.userActions.userSendmail(send);
    }

    render() {
        var {showDetail,showCart}=this.state;
        var {product_name, category, camera, memory, price} = this.state.search;
        var {isAuthenticated,
            user, 
            uscategories,
            cart, 
            staff,
            promotion, 
            news, 
            comment,
            transporter,
            coin,
            flashsale,
        } = this.props;
        const adproduct = this.props.adproduct;
        var newadproduct = Object.assign([], adproduct);
        console.log(user);
        // filter data flashsale to rest relate component
        if(flashsale.flashsale_user.empty == false) {
            flashsale.flashsale_user.data[0].flashproduct.map(flash => {
                for(var i=0; i<promotion.length; i++) {
                    if(flash.product_id == promotion[i].product_id) {
                        promotion[i].flashsale_perform = true;
                    }
                }
                for(var i=0; i<this.props.usproduct.length; i++) {
                    if(flash.product_id == this.props.usproduct[i].product_id) {
                        this.props.usproduct[i].flashsale_perform = true;
                    }
                }
                for(var i=0; i<news.length; i++) {
                    if(flash.product_id == news[i].product_id) {
                        news[i].flashsale_perform = true;
                    }
                }
                for(var i=0; i<cart.product.length; i++) {
                    if(flash.product_id == cart.product[i].product_id) {
                        cart.product[i].flashsale_perform = true;
                    }
                }
            });
        }
        
        // get coin filter by user_id
        if(user.id != "") {
            coin = coin.filter((co) => {
                if(Array.isArray(co.user)) {
                    return co.user[0].user_id == user.id;
                }else {
                    return co.user_id == user.id;
                }
            })
            
        } else {
            coin = [
                {coin_id: "", count: 0, user: []}
            ];
        }
        console.log(camera, memory, price, product_name);
        if(product_name != "") {
            newadproduct = newadproduct.filter((product) => {
                return product.name.toLowerCase().indexOf(product_name.toLowerCase()) != -1;
            });
        }
        if(category != 0) {
            newadproduct = newadproduct.filter((product) => {
                return product.category.category_id == category;
            })
        }
        //filter by camera
        if(camera != "") {
            switch (camera) {
                case 1:
                    newadproduct = newadproduct.filter((product) => {
                        return product.camera.split(',').length == 1;
                    });
                    break;
                case 2:
                    newadproduct = newadproduct.filter((product) => {
                        return product.camera.split(',').length == 2;
                    });
                    break;
                case 3:
                    newadproduct = newadproduct.filter((product) => {
                        return product.camera.split(',').length == 3;
                    });
                    break;
                default:
                    break;
            } 
        }
        //filter by memory
        if(memory != "") {
            switch (memory) { 
                case 12:
                    newadproduct = newadproduct.filter((product) => {
                        let memory = parseInt(product.memory);
                        return memory > 0 && memory <= 12;
                    });
                    break;
                case 24:
                    newadproduct = newadproduct.filter((product) => {
                        let memory = parseInt(product.memory);
                        return memory > 12 && memory <= 32;
                    });
                    break;
                case 32:
                    newadproduct = newadproduct.filter((product) => {
                        let memory = parseInt(product.memory);
                        return memory > 32;
                    });
                    break;
                default:
                    break;
            } 
        }
        // filter by price
        if(price != "") {
            switch (price) { 
                case 2:
                    newadproduct = newadproduct.filter((product) => {
                        return product.price <= 2000000;
                    });
                    break;
                case 10:
                    newadproduct = newadproduct.filter((product) => {
                        return product.price > 2000000 && product.price <= 10000000;
                    });
                    break;
                case 11:
                    newadproduct = newadproduct.filter((product) => {
                        return product.price > 10000000;
                    });
                    break;
                default:
                    break;
            }
        }
        return (
            <div style={{background:'gainsboro'}}>
                <Header
                cart={cart}
                isAuthenticated={isAuthenticated}
                user={user}
                getUserInfo={this.getUserInfo}
                logout={this.logout}
                showCart={this.showCart}
                showProductDetail={this.showProductDetail}
                onSearchProduct={this.onSearchProduct}
                // getLogging={this.getLogging}
                />
                {showDetail == false && showCart == false &&
                <div className="row">     
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        <MenuCategory
                        adcategories={this.props.adcategories}
                        onFilterProduct={this.onFilterProduct}
                        onFilter={this.onFilter}/>
                    </div>            
                </div>
                }
                {flashsale.flashsale_user.status == "loaded" && flashsale.flashsale_user.empty == false &&
                showDetail == false && showCart == false && product_name == "" && category == 0 &&
                    <div className="text_show_flash">
                        <marquee>
                        <i className="fas fa-bolt" style={{fontSize: '20px', color:'red'}}></i>
                        &nbsp;Flash Sale đã được kích hoạt từ {flashsale.flashsale_user.data[0].start}
                        &nbsp;đến {flashsale.flashsale_user.data[0].end}</marquee>
                    </div>
                }
                {(product_name != "" || category != 0) && showDetail == false && showCart == false &&
                    <div className="body" style={{ marginTop: '150px', padding: '5px 40px' }}>
                        <div className="row">
                            <SearchProduct
                            // {...this.props}
                            adproduct={newadproduct}
                            showProductDetail={this.showProductDetail}/>
                        </div>
                    </div>
                }

                {showDetail == false && showCart == false && product_name == "" && category == 0 &&
                <div className="body" style={{ marginTop: '0', padding: '5px 40px' }}>
                        <div className="row" 
                        style={{marginTop: flashsale.flashsale_user.empty == false ? '0' :'150px'}}>
                            <ProductListNew
                            news={news}
                            usproduct={this.props.usproduct}
                            showProductDetail={this.showProductDetail}
                            />
                        </div>
                        {flashsale.flashsale_user.empty == false &&
                            <div className="row">
                            <FlashSale
                            usproduct={flashsale.flashsale_user.data[0]}
                            showProductDetail={this.showProductDetail}
                            />
                        </div>
                        }
                        <div className="row">
                            <ProductList
                            usproduct={this.props.usproduct}
                            showProductDetail={this.showProductDetail}
                            {...this.props}/>
                        </div>

                        <div className="row">
                            <ProductListPC
                            usproduct={this.props.usproduct}
                            promotion={promotion}
                            showProductDetail={this.showProductDetail}/>
                        </div>
                </div>
                }

                {showDetail == true && showCart == false &&
                <div className="body" style={{ marginTop: '52px', padding: '5px 40px' }}>
                    <div className="row">
                        <ProductDetail
                        {...this.props}
                        coin={coin}
                        comment={comment}
                        product={this.state.product}
                        addToCart={this.addToCart}
                        createBill={this.createBill}
                        deleteFromCart={this.deleteFromCart}
                        updateCoin={this.updateCoin}
                        sendEmail={this.sendEmail}
                        />
                    </div>
                </div>
                }

                {showCart == true &&
                <div className="body" style={{ marginTop: '52px', padding: '5px 40px' }}>
                    <Cart
                    {...this.props}
                    coin={coin}
                    deleteFromCart={this.deleteFromCart}
                    createBill={this.createBill}
                    staff={staff}
                    updateCoin={this.updateCoin}
                    />
                </div>
                }
                {/* <Chat client={this.client} theme={"messaging light"}>
                    <Channel channel={this.channel}>
                    <Window>
                    <ChannelHeader />
                    <MessageList />
                    <MessageInput />
                    </Window>
                    <Thread />
                    </Channel>
                </Chat> */}
                <Footer/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth,
        user: state.user,
        usproduct: state.usproduct,
        adcategories: state.adcategories,
        cart: state.cart,
        staff: state.staff,
        promotion: state.promotion,
        news: state.news,
        comment: state.comment,
        adproduct: state.adproduct,
        transporter: state.transporter,
        coin: state.coin,
        flashsale: state.flashsale,
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        authActions: bindActionCreators(authActions, dispatch),
        userActions: bindActionCreators(userActions, dispatch),
        adminActions: bindActionCreators(adminActions, dispatch),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
