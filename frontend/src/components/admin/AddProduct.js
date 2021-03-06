import React, { Component } from 'react';
import DateTime from 'react-datetime';
import moment from 'moment';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import 'moment-timezone';
var $ = require("jquery");

class AddProduct extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            product_name: "",
            product_price: "",
            product_size: "",
            product_quantity: "",
            product_hdh: "",
            product_color: "",
            product_CPU: "",
            product_memory: "",
            product_camera: "",
            product_pin: "",
            product_gurantee: "",
            product_promotion: "",
            product_start_promo: "",
            product_end_promo: "",
            product_category: "",
            selectedFile: "",
            product_description: "",
            files: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.product.product_id != undefined) {
            this.setState({
                product_name: nextProps.product.name, 
                product_price: nextProps.product.price, 
                product_size: nextProps.product.size, 
                product_quantity: nextProps.product.quantity, 
                product_hdh: nextProps.product.hdh, 
                product_color: nextProps.product.color,
                product_CPU: nextProps.product.CPU, 
                product_memory: nextProps.product.memory, 
                product_camera: nextProps.product.camera,
                product_pin: nextProps.product.pin, 
                product_gurantee: nextProps.product.gurantee, 
                product_promotion: nextProps.product.promotion,
                product_start_promo: nextProps.product.start_promo, 
                product_end_promo: nextProps.product.end_promo, 
                product_category: nextProps.product.category,
                product_description: nextProps.product.description
            });
        }
        if(nextProps.openAddForm == false) {
            this.setState({
                product_name: "", product_price: "", product_quantity: "",
                product_size: "", product_hdh: "", product_color: "",
                product_CPU: "", product_memory: "", product_camera: "",
                product_pin: "", product_gurantee: "", product_promotion: "",
                product_start_promo: "", product_end_promo: "", product_category: "",
                product_description: "",
                
            });
        }
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

    onChangeDateStart = (date) => {
        let newDate = moment.tz(date._d, 'YYYY-MM-DD HH:mm:ss', 'UTC').format();
        this.setState({ product_start_promo:newDate });
        
    }

    onChangeDateEnd = (date) => {
        let newDate = moment.tz(date._d, 'YYYY-MM-DD HH:mm:ss', 'UTC').format();
        this.setState({ product_end_promo:newDate });
    }

    addProduct = (e) => {
        e.preventDefault();
        let name = this.state.product_name;
        let price = this.state.product_price;
        let size = this.state.product_size;
        let quantity = this.state.product_quantity;
        let hdh = this.state.product_hdh;
        let color = this.state.product_color;
        let CPU = this.state.product_CPU;
        let memory = this.state.product_memory;
        let camera = this.state.product_camera;
        let pin = this.state.product_pin;
        let gurantee = this.state.product_gurantee;
        let promotion = this.state.product_promotion;
        let start_promo = this.state.product_start_promo;
        let end_promo = this.state.product_end_promo;
        let category = this.state.product_category;
        let image_name = this.state.selectedFile;
        let description = this.state.product_description;

        if(this.props.product.product_id == undefined) {
            this.props.addProduct(name, price, size,quantity, hdh, color, CPU, memory,
                camera, pin, gurantee, promotion, start_promo, end_promo, category, image_name, description);
        } else {
            let data = {
                product_id: this.props.product.product_id,
                name: name,
                price: price,
                quantity: quantity,
                size: size, hdh: hdh, color: color, CPU: CPU, memory: memory,
                camera: camera, pin: pin, gurantee: gurantee, promotion: promotion,
                start_promo: start_promo, end_promo: end_promo, category: category, description: description
            };
            this.props.editProduct(data);
        }
        
        this.setState({
            product_name: "", product_price: "", product_quantity: "",
            product_size: "", product_hdh: "", product_color: "",
            product_CPU: "", product_memory: "", product_camera: "",
            product_pin: "", product_gurantee: "", product_promotion: "",
            product_start_promo: "", product_end_promo: "", product_category: ""
            
        });
    }

    fileSelectedHandler = e => {
        this.setState({
            selectedFile: e.target.files[0]
        });
        
    }

    render() {
        if(this.props.openAddForm == false) return null;
            return (
                <div>            
                    <div className="panel panel-danger">
                        <div className="panel-heading">
                                <h3 className="panel-title">{this.props.product.product_id == undefined ? "Thêm sản phẩm": "Chỉnh sửa sản phẩm"}</h3>
                        </div>
                        <div className="panel-body">
                                
                                <form onSubmit={this.addProduct} encType="multipart/form-data" method="POST" className="form-horizontal" role="form">
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Loại sản phẩm: </label>
                                        </div>
                                        <div className="col-md-11">
                                            
                                            <select name="" id="input" className="form-control" ref="product_category"
                                            name="product_category" onChange={this.onChange} value={this.state.product_category}>
                                                {
                                                    this.state.product_category == "" ?
                                                    <option value={-1}>All</option>
                                                    :
                                                    <option value={this.state.product_category.category_id}>{this.state.product_category.name}</option>
                                                }
                                                
                                                {
                                                    this.props.adcategories.map((category, idx) => 
                                                        <option key={idx} value={category.category_id}>{category.name}</option>
                                                    )
                                                }
                                            </select>
                                            
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Tên sản phẩm: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            ref="product_name"
                                            name="product_name"
                                            onChange={this.onChange}
                                            value={this.state.product_name}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Giá: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="number" 
                                            className="form-control" 
                                            ref="product_price"
                                            name="product_price"
                                            onChange={this.onChange}
                                            value={this.state.product_price}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Số lượng nhập: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="number" 
                                            className="form-control" 
                                            ref="product_quantity"
                                            name="product_quantity"
                                            onChange={this.onChange}
                                            value={this.state.product_quantity}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Kích cỡ: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            ref="product_size"
                                            name="product_size"
                                            onChange={this.onChange}
                                            value={this.state.product_size}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Hệ điều hành: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            ref="product_hdh"
                                            name="product_hdh"
                                            onChange={this.onChange}
                                            value={this.state.product_hdh}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Màu sắc: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            ref="product_color"
                                            name="product_color"
                                            onChange={this.onChange}
                                            value={this.state.product_color}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>CPU: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            ref="product_CPU"
                                            name="product_CPU"
                                            onChange={this.onChange}
                                            value={this.state.product_CPU}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Bộ nhớ: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            ref="product_memory"
                                            name="product_memory"
                                            onChange={this.onChange}
                                            value={this.state.product_memory}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Camera: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            ref="product_camera"
                                            name="product_camera"
                                            onChange={this.onChange}
                                            value={this.state.product_camera}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Pin: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            ref="product_pin"
                                            name="product_pin"
                                            onChange={this.onChange}
                                            value={this.state.product_pin}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Bảo hành: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            ref="product_gurantee"
                                            name="product_gurantee"
                                            onChange={this.onChange}
                                            value={this.state.product_gurantee}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Khuyến mãi: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="number" 
                                            className="form-control" 
                                            ref="product_promotion"
                                            name="product_promotion"
                                            onChange={this.onChange}
                                            value={this.state.product_promotion}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Ngày bắt đầu: </label>
                                        </div>
                                        <div className="col-md-3">
                                            {/* <input 
                                            type="datetime-local" 
                                            className="form-control" 
                                            ref="product_start_promo"
                                            name="product_start_promo"
                                            onChange={this.onChange}
                                            value={this.state.product_start_promo}/> */}
                                            <DateTime
                                            ref="product_start_promo"
                                            name="product_start_promo"
                                            onChange={this.onChangeDateStart}
                                            value={this.state.product_start_promo}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Ngày kết thúc: </label>
                                        </div>
                                        <div className="col-md-3">
                                            <DateTime
                                            ref="product_end_promo"
                                            name="product_end_promo"
                                            onChange={this.onChangeDateEnd}
                                            value={this.state.product_end_promo}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Mô tả sản phẩm: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <Input type="textarea" 
                                            name="product_description" 
                                            value={this.state.product_description} 
                                            onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Nhập ảnh: </label>
                                        </div>
                                        <div className="col-md-3">
                                            <input 
                                            type="file" 
                                            className="form-control" 
                                            accept=".jpg,.jpeg,.png"
                                            onChange={this.fileSelectedHandler}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-10 col-sm-offset-2">
                                            <button 
                                            type="submit" 
                                            className="btn btn-primary" 
                                            style={{float: 'right', marginLeft:'10px'}}
                                            >Lưu thay đổi</button>
                                            <button 
                                            type="button" 
                                            className="btn btn-default" 
                                            style={{float: 'right'}}
                                            onClick={this.props.closeAddForm}>Hủy bỏ</button>
                                        </div>
                                    </div>
                                </form>   
                        </div>
                    </div>               
                </div>
        );
    }
}

export default AddProduct;
