import React, { Component } from 'react';

var $ = require("jquery");

class EditStaff extends Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
        this.state = {
            fullname: "",
            email: "",
            phone: "",
            address: "",
            cmnd: "",
            username: "",
            password: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.staff.id != undefined) {
            this.setState({
                fullname: nextProps.staff.fullname,
                email: nextProps.staff.email,
                phone: nextProps.staff.phone,
                address: nextProps.staff.address,
                cmnd: nextProps.staff.cmnd
            });
        } else{
            this.setState({fullname: "", email: "", phone: "", address: "", cmnd: ""});
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

    onSaveChangeStaff = (e) => {
        e.preventDefault();
        if(this.props.staff.id != undefined) {
            // newStaff
            let newStaff = {
                id: this.props.staff.id,
                fullname: this.state.fullname,
                email: this.state.email,
                phone: this.state.phone,
                address: this.state.address,
                cmnd: this.state.cmnd
            };
            this.props.onSaveChangeStaff(newStaff);
            this.props.closeEditForm();
        } else {
            // this.props.onSaveChangeStaff();
            let newStaff = {
                username: this.state.username,
                password: this.state.password,
                fullname: this.state.fullname,
                email: this.state.email,
                phone: this.state.phone,
                address: this.state.address,
                cmnd: this.state.cmnd
            }; 
            this.props.addStaff(newStaff);
            this.props.closeEditForm();
        }
    }

    render() {
        if(this.props.openAddForm == false) return null;
            return (
                <div>            
                    <div className="panel panel-danger">
                        <div className="panel-heading">
                        <h3 className="panel-title">{this.props.staff.id == undefined ? "Thêm nhân viên":"Chỉnh sửa thông tin nhân viên"}</h3>
                        </div>
                        <div className="panel-body">
                                
                                <form onSubmit={this.onSaveChangeStaff} method="POST" className="form-horizontal" role="form">
                                    <div className="form-group" hidden={this.props.staff.id != undefined}>
                                        <div className="col-md-1">
                                            <label>Username: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            ref="username"
                                            name="username"
                                            onChange={this.onChange}
                                            value={this.state.username}/>
                                        </div>
                                    </div>
                                    <div className="form-group" hidden={this.props.staff.id != undefined}>
                                        <div className="col-md-1">
                                            <label>Mật khẩu: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="password" 
                                            className="form-control" 
                                            ref="password"
                                            name="password"
                                            onChange={this.onChange}
                                            value={this.state.password}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Họ và tên: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            ref="fullname"
                                            name="fullname"
                                            onChange={this.onChange}
                                            value={this.state.fullname}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Email: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            ref="email"
                                            name="email"
                                            onChange={this.onChange}
                                            value={this.state.email}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Số điện thoại: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="text" 
                                            className="form-control"
                                            ref="phone"
                                            name="phone"
                                            onChange={this.onChange}
                                            value={this.state.phone}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>Địa chỉ: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            ref="address"
                                            name="address"
                                            onChange={this.onChange}
                                            value={this.state.address}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-md-1">
                                            <label>CMND: </label>
                                        </div>
                                        <div className="col-md-11">
                                            <input 
                                            type="text" 
                                            className="form-control" 
                                            ref="cmnd"
                                            name="cmnd"
                                            onChange={this.onChange}
                                            value={this.state.cmnd}/>
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
                                            onClick={this.props.closeEditForm}>Hủy bỏ</button>
                                        </div>
                                    </div>
                                </form>   
                        </div>
                    </div>               
                </div>
        );
    }
}

export default EditStaff;
