import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import * as actions from '../actions/index';
import { browserHistory } from 'react-router';

var $ = require("jquery");

const usersInitial = {

}

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            s_username:"",
            s_password: "",
            s_email: "",
        }
    }

    onLogin = (e) => {
        e.preventDefault();        
        this.props.authLogin(this.state.username, this.state.password); 
    }

    onSignup = (e) => {
        e.preventDefault();
        this.props.authSignup(this.state.s_username, this.state.s_email, this.state.s_password1, this.state.s_password2);
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]:value
        });
    }

    render() {
        var {username, password, s_email, s_password,s_username} = this.state;
        var {isAuthenticated} = this.props;
        console.log(this.props.isAuthenticated);
        return (
            <div className="login-page">
            <div className="form">
              <form className="register-form">
                <input type="text" placeholder="name" name="s_username"onChange={this.onChange} value={s_username}/>
                <span style={{color: 'red'}}>Please input username</span>
                
                <input type="text" placeholder="email address" name="s_email" onChange={this.onChange} value={s_email} style={{marginTop: '20px'}}/>
                <span style={{color: 'red'}}>Please input email</span>
                <input type="password" placeholder="password" name="s_password" onChange={this.onChange} value={s_password} style={{marginTop: '20px'}}/>
                <span style={{color: 'red'}}>Please input password</span>
                <button onClick={this.onSignup} style={{marginTop: '20px'}}>create</button>
                <p className="message">Already registered? <a href="#">Sign In</a></p>
              </form>
              <form className="login-form">
                <input type="text" name="username" placeholder="username" onChange={this.onChange} value={username}/>
                {isAuthenticated.error != null && username == "" ? <span style={{color: 'red'}}>Please input username</span> : ''}
                <input type="password" name="password" placeholder="password" onChange={this.onChange} value={password} style={{marginTop: '20px'}}/>
                {isAuthenticated.error != null && password == "" ? <span style={{color: 'red'}}>Please input password</span> : ''}
                <button onClick={this.onLogin} style={{marginTop: '20px'}}>login</button>
                <p className="message">Not registered? <a href="#">Create an account</a></p>
              </form>
            </div>
          </div>
        )}
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        authLogin: (username, password) => {
            dispatch(actions.authLogin(username,password));
        },
        authSignup: (username, email, password) => {
            dispatch(actions.authSignup(username, email, password));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
