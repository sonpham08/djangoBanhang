import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Link, Route, Router, NavLink } from 'react-router-dom';
import * as authActions from '../../actions/authActions';
// import { Button, Modal, ModalBody, ModalFooter, ModalTitle } from 'react-bootstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import SubHeader from '../SubHeader';
var $ = require("jquery");


class CheckTransfer extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            tab: 0
        }
    }

    componentDidMount() {
        let tab = localStorage.getItem('tab');
        this.setState({tab: tab});
    }

    open (e,tab) {
        e.preventDefault();
        if(tab == 'personal' && $("#personal").hasClass('active') == false) {
            localStorage.setItem('tab', 1);
            this.setState({tab: 1});
            // $(".side nav li").removeClass("active");
            // $("#personal").addClass("active");
        }
           
        if(tab == 'transfer' && $("#transfer").hasClass('active') == false) {
            localStorage.setItem('tab', 2);
            this.setState({tab: 2});
        }
            
    }

    render() {
        return (
            <div style={{ background: 'gainsboro' }}>
                <SubHeader/>
                
                <div className="col-xs-2 col-sm-2 col-md-2 col-lg-2">
                    <div className="collapse navbar-collapse navbar-ex1-collapse">
                        <ul className="nav navbar-nav side-nav">
                            <li>
                                <Link to="/">GUN</Link>
                            </li>
                            <li id="personal">
                                <Link to="#" 
                                className={this.state.tab == 1 ? "active":""}
                                onClick={(e) => this.open(e,'personal')}><i className="fa fa-fw fa-user-plus"></i>Thông tin cá nhân</Link>
                            </li>
                            <li id="transfer">
                                <Link to="#"
                                className={this.state.tab == 2 ? "active":""}
                                 onClick={(e) => this.open(e,'transfer')}><i className="fa fa-fw fas fa-file"></i> Kiểm tra đơn hàng</Link>
                            </li>
                        </ul>
                    </div>
                </div>
                
                {/* Personal */}
                {this.state.tab == 1 ?
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10" style={{marginTop: '63px'}}>
                    <div className="pn-right">
                        
                        <div className="panel panel-danger">
                            <div className="panel-heading">
                                    <h3 className="panel-title">Thông tin cá nhân</h3>
                            </div>
                            <div className="panel-body">
                            <Form>
                                    <FormGroup>
                                        <Label for="fullname">Họ và tên:</Label>
                                        <Input type="fullname" name="fullname" id="fullname" placeholder="Nhập họ và tên" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="phone">Số điện thoại:</Label>
                                        <Input readOnly type="phone" name="phone" id="phone" placeholder="Nhập số điện thoại" />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="email">Email:</Label>
                                        <Input type="email" name="email" id="email" placeholder="Nhập email" />
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
                :
                
                <div className="col-xs-10 col-sm-10 col-md-10 col-lg-10" style={{marginTop: '63px'}}>
                    <div className="pn-right">
                        
                        <div className="table-responsive">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>Mã đơn</th>
                                        <th>Ngày đặt</th>
                                        <th>Tình trạng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>son</td>
                                        <td>son</td>
                                        <td>son</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        
                    </div>
                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckTransfer);
