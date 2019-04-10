import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import * as authActions from '../actions/authActions';
import { browserHistory } from 'react-router';
import Header from './Header';
import { bindActionCreators } from 'redux';

var $ = require("jquery");

const usersInitial = {

}

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username:"",
            password: "",
            email: "",
            fullname: "",
            phone: "",
            address: "",
            cmnd: "",
            staff_or_user: ""
        }
    }

    onSignup = (e) => {
        e.preventDefault();
        let css_for_alert_register = "display: block; color: red";
        let is_staff = false;
        let is_user = false;
        var {username, password, email, fullname, phone, address, cmnd, staff_or_user} = this.state;
        console.log(staff_or_user);
        
        switch (true) {
            case username == '':
                this.refs.idAlertUsername.style = css_for_alert_register;
            case email == '':
                this.refs.idAlertEmail.style = css_for_alert_register;   
            case password == '':
                this.refs.idAlertPassword.style = css_for_alert_register;
            case phone == '':
                this.refs.idAlertPhone.style = css_for_alert_register;
            case fullname == '':
                this.refs.idAlertFullname.style = css_for_alert_register;
            case address == '':
                this.refs.idAlertAddress.style = css_for_alert_register;
            case cmnd == '':
                this.refs.idAlertCmnd.style = css_for_alert_register;
            default:
                break;
        }
        if(staff_or_user == 'is_staff') {
            is_staff = true;
            is_user = false;
        } else {
            if(staff_or_user == 'is_user') {
                is_staff = false;
                is_user = true;
            }
        }
        if(username != '' && password != '' && email != '' && fullname != '' && phone != ''
        && address != '' && cmnd != '') {
            this.props.authActions.authSignup(username, email, password, fullname, is_staff, is_user,phone, address, cmnd);
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;  
        var value = target.value;
        this.setState({
            [name]:value
        });
        switch (true) {
            case name == 'username' && value != '':
                this.refs.idAlertUsername.style = 'display: none';
                break;
            case name == 'email' && value != '':
                this.refs.idAlertEmail.style = 'display: none';
                break;
            case name == 'password' && value != '':
                this.refs.idAlertPassword.style = 'display: none';
                break;
            case name == 'fullname' && value != '':
                this.refs.idAlertFullname.style = 'display: none';
                break;
            case name == 'phone' && value != '':
                this.refs.idAlertPhone.style = 'display: none';
                break;
            case name == 'address' && value != '':
                this.refs.idAlertAddress.style = 'display: none';
                break;
            case name == 'cmnd' && value != '':
                this.refs.idAlertCmnd.style = 'display: none';
                break;
            default:
                break;
        }
    }

    render() {
        var {username, password, email, fullname,phone, address, cmnd} = this.state;
        return (
            <div>
                {/* <Header/> */}
            <div className="login-page">
            <div className="form">
              <form className="register-form">
                <input type="text" placeholder="name" name="username" onChange={this.onChange} value={username}/>
                <span style={{display: 'none'}} ref="idAlertUsername" className="">Please input username</span>
                
                <input type="text" placeholder="email" name="email" onChange={this.onChange} value={email} style={{marginTop: '20px'}}/>
                <span style={{display: 'none'}} ref="idAlertEmail">Please input email valid</span>

                <input type="password" placeholder="password" name="password" onChange={this.onChange} value={password} style={{marginTop: '20px'}}/>
                <span style={{display: 'none'}} ref="idAlertPassword">Please input password</span>

                <input type="text" placeholder="fullname" name="fullname" onChange={this.onChange} value={fullname} style={{marginTop: '20px'}}/>
                <span style={{display: 'none'}} ref="idAlertFullname">Please input fullname</span>
                <label>Is staff: </label>
                <input type="radio" name="staff_or_user" onChange={this.onChange} value={'is_staff'} />
                <label>Is user: </label>
                <input type="radio" name="staff_or_user" onChange={this.onChange} value={'is_user'} />

                <input type="text" placeholder="phone" name="phone" onChange={this.onChange} value={phone} style={{marginTop: '20px'}}/>
                <span style={{display: 'none'}} ref="idAlertPhone">Please input phone</span>

                <input type="text" placeholder="address" name="address" onChange={this.onChange} value={address} style={{marginTop: '20px'}}/>
                <span style={{display: 'none'}} ref="idAlertAddress">Please input address</span>

                <input type="text" placeholder="ID Card" name="cmnd" onChange={this.onChange} value={cmnd} style={{marginTop: '20px'}}/>
                <span style={{display: 'none'}} ref="idAlertCmnd">Please input ID Card</span>
                <button onClick={this.onSignup} style={{marginTop: '20px'}}>create</button>
                <p className="message">Already registered? <a href="/login">Sign In</a></p>
              </form>
            </div>
          </div>
          </div>
        )}
}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        // authSignup: (username, email, password, fullname, is_staff, is_user, phone, address, cmnd) => {
        //     dispatch(actions.authSignup(username, email, password,fullname, is_staff, is_user, phone, address, cmnd));
        // }
        authActions: bindActionCreators(authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
