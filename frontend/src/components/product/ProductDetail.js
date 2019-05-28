import React, { Component } from 'react';
import { 
    Pagination, 
    PaginationItem, 
    PaginationLink,
    Breadcrumb,
    BreadcrumbItem,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
    Card,
    Button,
    CardTitle,
    CardText,
    Row,
    Col,
    Table,
    Badge,
    Alert,
    Form, 
    FormGroup, 
    Label, 
    Input, 
    FormText,
} from 'reactstrap';
import Avatar from 'react-avatar';
import BuyNowBox from './BuyNowBox';
import toastr from 'toastr';
import classnames from 'classnames';

var $ = require("jquery");


class ProductDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            alert: "",
            how_many_buy: 1,
            how_many_coin: 0,
            product_buy: {
                price: 0,
                promotion: 0
            }
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        console.log(this.props);
        
    } 

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }

    addProductToCard = (product) => {
        if(this.props.user.username == "") {
            if(window.confirm('Bạn cần đăng nhập để thực hiện thao tác này!')) {
                window.location.href="/login";
            }   
        } else {
            this.props.addToCart(product.product_id, this.props.user.id, this.state.how_many_buy);
        }
        
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;  
        var value = target.value;
        this.setState({
            [name]:value
        });
    }

    buyNow = (product) => {
        if(this.props.user.username == "") {
            if(window.confirm('Bạn cần đăng nhập để thực hiện thao tác này!')) {
                window.location.href="/login";
            }   
        }else {
            let how_many_buy = parseInt(this.state.how_many_buy);
            let how_many_coin = parseInt(this.state.how_many_coin);
            if(how_many_buy > product.quantity) {
                toastr.warning(`Kho hàng chỉ còn ${product.quantity} sản phẩm!`);
            }
            else {
                product.number_product_order = how_many_buy;
                product.coin = {
                    coin_id: this.props.coin[0].coin_id,
                    count: this.props.coin[0].count,
                    num_coin_use: how_many_coin
                };
                this.setState({ product_buy: product });
            }
        }
    }

    deleteFromCart = (cart_id) => {
        this.props.deleteFromCart(cart_id);
    }

    render() {
        var {product, comment,user, staff, coin} = this.props;
        var {how_many_buy, product_buy, how_many_coin} = this.state;
        // filter comment
        if(comment.length > 0) {
            comment = comment.filter((cmt) => {
                return cmt.product == product.product_id;
            });
        }
        return (
            <div style={{background:'gainsboro'}}>
                    <div className="panel panel-primary">
                          <div className="panel-body">
                                <div className="row">              
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <img src={"static/dataset/"+product.image} style={{width: '100%'}}/>
                                    </div>                         
                                    <div className="col-xs-7 col-sm-7 col-md-7 col-lg-7" style={{borderLeft: '1px solid aliceblue'}}>
                                        <Breadcrumb tag="nav" listTag="div">
                                            <BreadcrumbItem tag="a" href="/">Trang chủ / </BreadcrumbItem>
                                            <BreadcrumbItem tag="span">Điện thoại</BreadcrumbItem>
                                        </Breadcrumb>
                                        <h3 style={{marginTop:'0'}}><strong>{product.name}</strong></h3><hr/>
                                        <div className="row mg-bottom">                                           
                                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                                <label>Giá: </label>
                                            </div>                                                            
                                            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10" style={{display: 'flex'}}>
                                                <h3 style={{color: 'red', marginTop: '-3px', marginLeft: '10px'}}>{product.price - (product.price * product.promotion/100)} Đ</h3>
                                                <i><strike> {product.price} Đ</strike></i>
                                            </div>                                                                    
                                        </div>
                                        <div className="row mg-bottom">                                           
                                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                                <label>Màu sắc: </label>
                                            </div>                                                            
                                            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10" style={{display: 'flex'}}>
                                                <div className="square_color" style={{background: product.color}}></div>
                                            </div>                                                                    
                                        </div>
                                        <div className="row mg-bottom">                                           
                                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                                                <label>Số lượng: </label>
                                            </div>                                                            
                                            <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2" style={{display: 'flex'}}>
                                                <input 
                                                type="number" 
                                                className="form-control" 
                                                name="how_many_buy"
                                                value={how_many_buy} 
                                                onChange={this.onChange}/>
                                            </div>                                                                    
                                        </div>
                                        <div className="row mg-bottom" style={{marginLeft: '2px'}}>                                                                       
                                            <button type="button" className="btn btn-primary" onClick={() => this.addProductToCard(product)}>
                                            Thêm vào giỏ hàng
                                            </button>&nbsp;

                                            <button 
                                            type="button" 
                                            className="btn btn-danger" 
                                            data-toggle="modal" data-target="#buymodal"
                                            onClick={() => this.buyNow(product)}>
                                            Mua ngay</button>
                                        </div><hr/>
                                        <div className="row mg-bottom" style={{marginLeft: '2px', display: 'flex'}}>                                                                       
                                            <i className="fas fa-coins"></i>
                                            <p style={{color: 'red', marginLeft: '5px', marginTop: '-3px', display: 'flex'}}>
                                                <strong>Bạn đang có {coin[0].count} coin. Bạn muốn sử dụng </strong>&nbsp;
                                                <input
                                                style={{width: '15%', marginTop: '-6px'}}
                                                type="number" 
                                                min={0}
                                                max={coin[0].count}
                                                className="form-control" 
                                                name="how_many_coin"
                                                value={how_many_coin} 
                                                onChange={this.onChange}/>&nbsp;
                                                <strong> coin.</strong>
                                            </p>
                                        </div><hr/>
                                        <div className="row mg-bottom" style={{marginLeft: '2px', display: 'flex'}}>                                                                       
                                            <i className="fas fa-check-circle"></i>
                                            <p style={{color: 'red', marginLeft: '5px', marginTop: '-3px'}}>
                                                <strong>Miễn phí đổi trả trong 7 ngày</strong>
                                            </p>
                                        </div><hr/>
        
                                        <div className="row mg-bottom" style={{marginLeft: '2px'}}>                                                                       
                                            <p style={{textAlign: 'left'}}><strong style={{color: 'red'}}>Shop được tài trợ bởi VinGroup.</strong>Mang lại cho
                                             khách hàng sự tin tưởng
                                            tuyệt đối</p>
                                        </div><hr/>
                                    </div>                                               
                                </div>
                          </div>
                    </div>

                    { how_many_buy <= product.quantity && this.props.user.username != "" &&
                        <BuyNowBox
                            user={user}
                            product={product_buy}
                            transporter={this.props.transporter}
                            staff={staff}
                            createBill={this.props.createBill}
                            deleteFromCart={this.deleteFromCart}
                            updateCoin={this.props.updateCoin}
                        />
                        }

                    <div className="panel panel-primary">
                        <div className="panel-body">
                            <Nav tabs>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggle('1'); }}
                                >
                                Thông tin sản phẩm
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggle('2'); }}
                                >
                                Đánh giá người dùng
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggle('3'); }}
                                >
                                Bình luận về sản phẩm
                                </NavLink>
                            </NavItem>
                            </Nav>
                            <TabContent activeTab={this.state.activeTab}>
                            <TabPane tabId="1">
                                <Row>
                                <Col sm="12">               
                                    <Table>
                                        <thead>
                                        <tr style={{color: 'white'}}>
                                            <th>Tên sản phẩm</th>
                                            <th>Giá</th>
                                            <th>Kích cỡ</th>
                                            <th>Số lượng nhập</th>
                                            <th>Hệ điều hành</th>
                                            <th>Màu sắc</th>
                                            <th>CPU</th>
                                            <th>Bộ nhớ</th>
                                            <th>Máy ảnh</th>
                                            <th>Pin</th>
                                            <th>Bảo hành</th>
                                            <th>Khuyến mãi</th>
                                            <th>Loại máy</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr style={{color: 'white'}}>
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
                                            <td>{product.promotion}</td>
                                            <td>{product.category.category_id}</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="2">
                                <Row>
                                <Col sm="12" style={{color: 'white'}}>
                                    <Row >
                                        <Col sm="6" style={{marginLeft: '0', display: 'flex'}}>
                                        <h1>{product.rating}/</h1><h3 style={{marginTop: '30px', color: 'red'}}>5 
                                            {product.rating >= 1 ? <i className="fas fa-star"></i>: ""}
                                            {product.rating >= 2 ? <i className="fas fa-star"></i>: ""}
                                            {product.rating >= 3 ? <i className="fas fa-star"></i>: ""}
                                            {product.rating >= 4 ? <i className="fas fa-star"></i>: ""}
                                            {product.rating >= 5 ? <i className="fas fa-star"></i>: ""}</h3>
                                        </Col>
                                        <Col sm="6" style={{marginTop: '22px'}}>
                                            <div className="list_rating">
                                                <Badge color="primary" style={{marginRight: '5px', background: product.rating == 5 ? "red": ""}}>5 sao</Badge>
                                                <Badge color="secondary" style={{marginRight: '5px', background: product.rating == 4 ? "red": ""}}>4 sao</Badge>
                                                <Badge color="success" style={{marginRight: '5px', background: product.rating == 3 ? "red": ""}}>3 sao</Badge>
                                                <Badge color="danger" style={{marginRight: '5px', background: product.rating == 2 ? "red": ""}}>2 sao</Badge>
                                                <Badge color="warning" style={{marginRight: '5px', background: product.rating == 1 ? "red": ""}}>1 sao</Badge>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                </Row>
                            </TabPane>
                            <TabPane tabId="3">
                                <Row>
                                <Col sm="12" style={{color: 'white'}}>
                                    {
                                        comment.map((cmt, idx) => {
                                            return(
                                                <div key={idx} className="fr_show_cmt">
                                                <Avatar 
                                                    name={cmt.user[0].fullname}
                                                    round="80px" size="30"
                                                />
                                                <p style={{marginRight: '10px', color: 'green'}}>{cmt.user[0].fullname}:</p>
                                                <p>{cmt.content}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </Col>
                                </Row>
                            </TabPane>
                            </TabContent>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail;
