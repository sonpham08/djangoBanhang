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
    Alert
} from 'reactstrap';
import classnames from 'classnames';

var $ = require("jquery");


class ProductDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: '1',
            alert: ""
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
          this.setState({
            activeTab: tab
          });
        }
    }

    addProductToCard = (product) => {
        // let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
        // cart.push(product);
        // localStorage.setItem('cart', JSON.stringify(cart));
        // this.props.updateNumOnCart();
        if(this.props.user.username == "") {
            window.location.href="/login";
        } else {
            this.props.addToCart(product.product_id, this.props.user.id);
        }
        
    }

    buyNow = () => {
        if(this.props.user.username == "") {
            window.location.href="/login";
        } 
    }

    render() {
        var {product} = this.props;
        console.log(this.props.user);
        
        return (
            <div style={{background:'gainsboro'}}>
                    <div className="panel panel-primary">
                          <div className="panel-body">
                                <div className="row">              
                                    <div className="col-xs-5 col-sm-5 col-md-5 col-lg-5">
                                        <img src={product.image} style={{width: '100%'}}/>
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
                                                <h3 style={{color: 'red', marginTop: '-3px', marginLeft: '10px'}}>{product.price - product.promotion} Đ</h3>
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
                                                <input type="number" className="form-control"/>
                                            </div>                                                                    
                                        </div>
                                        <div className="row mg-bottom" style={{marginLeft: '2px'}}>                                                                       
                                            <button type="button" className="btn btn-primary" onClick={() => this.addProductToCard(product)}>
                                            Thêm vào giỏ hàng
                                            </button>&nbsp;

                                            <button type="button" className="btn btn-danger" onClick={this.buyNow}>
                                            Mua ngay</button>
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
                                            <th>Cân nặng</th>
                                            <th>Màu sắc</th>
                                            <th>Âm thanh</th>
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
                                            <td>{product.weight}</td>
                                            <td>{product.color}</td>
                                            <td>{product.sound}</td>
                                            <td>{product.memory}</td>
                                            <td>{product.camera}</td>
                                            <td>{product.pin}</td>
                                            <td>{product.gurantee}</td>
                                            <td>{product.promotion}</td>
                                            <td>{product.category.name}</td>
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
                                        <h1>4.5/</h1><h3 style={{marginTop: '30px', color: 'red'}}>5 
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i>
                                            <i className="fas fa-star"></i></h3>
                                        </Col>
                                        <Col sm="6" style={{marginTop: '22px'}}>
                                            <div className="list_rating">
                                                <Badge color="primary" style={{marginRight: '5px'}}>5 sao</Badge>
                                                <Badge color="secondary" style={{marginRight: '5px'}}>4 sao</Badge>
                                                <Badge color="success" style={{marginRight: '5px'}}>3 sao</Badge>
                                                <Badge color="danger" style={{marginRight: '5px'}}>2 sao</Badge>
                                                <Badge color="warning" style={{marginRight: '5px'}}>1 sao</Badge>
                                            </div>
                                        </Col>
                                    </Row>
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
