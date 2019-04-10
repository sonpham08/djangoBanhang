import React, { Component } from 'react';

var $ = require("jquery");

class AddProduct extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            product_name: "",
            product_price: "",
            product_quantity: "",
            product_size: "",
            product_weight: "",
            product_color: "",
            product_sound: "",
            product_memory: "",
            product_camera: "",
            product_pin: "",
            product_gurantee: "",
            product_promotion: "",
            product_start_promo: "",
            product_end_promo: "",
            product_category: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.product.product_id != undefined) {
            this.setState({
                product_name: nextProps.product.name, 
                product_price: nextProps.product.price, 
                product_quantity: nextProps.product.quantity,
                product_size: nextProps.product.size, 
                product_weight: nextProps.product.weight, 
                product_color: nextProps.product.color,
                product_sound: nextProps.product.sound, 
                product_memory: nextProps.product.memory, 
                product_camera: nextProps.product.camera,
                product_pin: nextProps.product.pin, 
                product_gurantee: nextProps.product.gurantee, 
                product_promotion: nextProps.product.promotion,
                product_start_promo: nextProps.product.start_promo, 
                product_end_promo: nextProps.product.end_promo, 
                product_category: nextProps.product.category
            });
        }
        if(nextProps.openAddForm == false) {
            this.setState({
                product_name: "", product_price: "", product_quantity: "",
                product_size: "", product_weight: "", product_color: "",
                product_sound: "", product_memory: "", product_camera: "",
                product_pin: "", product_gurantee: "", product_promotion: "",
                product_start_promo: "", product_end_promo: "", product_category: ""
                
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

    addProduct = (e) => {
        e.preventDefault();
        // let name = this.refs.product_name.value;
        // let price = this.refs.product_price.value;
        // let quantity = this.refs.product_quantity.value;
        // let size = this.refs.product_size.value;
        // let weight = this.refs.product_weight.value;
        // let color = this.refs.product_color.value;
        // let sound = this.refs.product_sound.value;
        // let memory = this.refs.product_memory.value;
        // let camera = this.refs.product_camera.value;
        // let pin = this.refs.product_pin.value;
        // let gurantee = this.refs.product_gurantee.value;
        // let promotion = this.refs.product_promotion.value;
        // let start_promo = this.refs.product_start_promo.value;
        // let end_promo = this.refs.product_end_promo.value;
        // let category = this.refs.product_category.value;
        let name = this.state.product_name;
        let price = this.state.product_price;
        let quantity = this.state.product_quantity;
        let size = this.state.product_size;
        let weight = this.state.product_weight;
        let color = this.state.product_color;
        let sound = this.state.product_sound;
        let memory = this.state.product_memory;
        let camera = this.state.product_camera;
        let pin = this.state.product_pin;
        let gurantee = this.state.product_gurantee;
        let promotion = this.state.product_promotion;
        let start_promo = this.state.product_start_promo;
        let end_promo = this.state.product_end_promo;
        let category = this.state.product_category;
        if(this.props.product.product_id == undefined) {
            this.props.addProduct(name, price, quantity, size, weight, color, sound, memory,
                camera, pin, gurantee, promotion, start_promo, end_promo, category);
        } else {
            let data = {
                product_id: this.props.product.product_id,
                name: name,
                price: price,
                quantity: quantity,
                size: size, weight: weight, color: color, sound: sound, memory: memory,
                camera: camera, pin: pin, gurantee: gurantee, promotion: promotion,
                start_promo: start_promo, end_promo: end_promo, category: category
            };
            this.props.editProduct(data);
        }
        
        this.setState({
            product_name: "", product_price: "", product_quantity: "",
            product_size: "", product_weight: "", product_color: "",
            product_sound: "", product_memory: "", product_camera: "",
            product_pin: "", product_gurantee: "", product_promotion: "",
            product_start_promo: "", product_end_promo: "", product_category: ""
            
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
                                
                                <form onSubmit={this.addProduct} method="POST" className="form-horizontal" role="form">
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
                                            <label>Số lượng: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="number" 
                                            className="form-control"
                                            ref="product_quantity"
                                            name="product_quantity"
                                            onChange={this.onChange}
                                            value={this.state.product_quantity}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Kích cỡ: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="number" 
                                            className="form-control" 
                                            ref="product_size"
                                            name="product_size"
                                            onChange={this.onChange}
                                            value={this.state.product_size}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Cân nặng: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            ref="product_weight"
                                            name="product_weight"
                                            onChange={this.onChange}
                                            value={this.state.product_weight}/>
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
                                            <label>Âm thanh: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            ref="product_sound"
                                            name="product_sound"
                                            onChange={this.onChange}
                                            value={this.state.product_sound}
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
                                            <input 
                                            type="datetime-local" 
                                            className="form-control" 
                                            ref="product_start_promo"
                                            name="product_start_promo"
                                            onChange={this.onChange}
                                            value={this.state.product_start_promo}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Ngày kết thúc: </label>
                                        </div>
                                        <div className="col-md-3">
                                            <input 
                                            type="datetime-local" 
                                            className="form-control" 
                                            ref="product_end_promo"
                                            name="product_end_promo"
                                            onChange={this.onChange}
                                            value={this.state.product_end_promo}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Loại sản phẩm: </label>
                                        </div>
                                        <div className="col-md-11">
                                            
                                            <select name="" id="input" className="form-control" ref="product_category"
                                            name="product_category" onChange={this.onChange} value={this.state.product_category}>
                                                <option value={1}>All</option>
                                                {
                                                    this.props.adcategories.map((category, idx) => 
                                                        <option key={idx} value={category.category_id}>{category.name}</option>
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
