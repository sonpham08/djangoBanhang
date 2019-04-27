import React, { Component } from 'react';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
// import { Button, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import SubHeader from '../SubHeader';
var $ = require("jquery");


class InfoBox extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            tab: 0,
            fullname: "",
            phone: "",
            email: "",
            address: ""
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({fullname: nextProps.user.fullname, phone: nextProps.user.phone,
            email: nextProps.user.email,
            address: nextProps.user.address});
    }

    componentDidMount() {
        let tab = localStorage.getItem('tab');
        this.setState({ tab: tab });
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;  
        var value = target.value;
        this.setState({
            [name]:value
        });
    }

    submitForm(e) {
        var user_info = {
            id: this.props.user.id,
            fullname: this.state.fullname,
            phone: this.state.phone,
            email: this.state.email,
            address: this.state.address
        };
        e.preventDefault();
        this.props.changeInfo(user_info);
    }

    render() {
        const {user}=this.props;
        var {fullname,email,phone,address}=this.state;
        return (
            <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10" style={{ marginTop: '63px' }}>
                <div className="pn-right">

                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            <h3 className="panel-title">Thông tin cá nhân</h3>
                        </div>
                        <div className="panel-body">
                            <Form onSubmit={e => this.submitForm(e)}>
                                <FormGroup>
                                    <Label for="fullname">Họ và tên:</Label>
                                    <Input name="fullname" id="fullname" placeholder="Nhập họ và tên" 
                                    value={fullname} onChange={this.onChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="phone">Số điện thoại:</Label>
                                    <Input name="phone" id="phone" placeholder="Nhập số điện thoại" 
                                    value={phone} onChange={this.onChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="email">Email:</Label>
                                    <Input  name="email" id="email" placeholder="Nhập email" 
                                    value={email} onChange={this.onChange}/>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="address">Địa chỉ:</Label>
                                    <Input name="address" id="address" placeholder="Nhập địa chỉ" 
                                    value={address} onChange={this.onChange}/>
                                </FormGroup>
                                <Button className="btn btn-danger">Hoàn tất</Button>
                            </Form>
                        </div>
                    </div>

                </div>

                <div className="pn-right">

                    <div className="panel panel-danger">
                        <div className="panel-heading">
                            <h3 className="panel-title">Đổi mật khẩu</h3>
                        </div>
                        <div className="panel-body">
                            <Form>
                                <FormGroup>
                                    <Label for="password">Mật khẩu cũ:</Label>
                                    <Input type="password" name="password" id="password" placeholder="Nhập mật khẩu cũ" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="newPassword">Mật khẩu mới:</Label>
                                    <Input type="newPassword" name="newPassword" id="newPassword" placeholder="Nhập mật khẩu mới" />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="performPassword">Nhập lại mật khẩu:</Label>
                                    <Input type="performPassword" name="performPassword" id="performPassword" placeholder="Nhập lại mật khẩu" />
                                </FormGroup>
                                <Button className="btn btn-danger">Hoàn tất</Button>
                            </Form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default InfoBox;
