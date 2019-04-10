import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from './Home';
import * as authActions from '../actions/authActions';
import { browserHistory } from 'react-router';
import Header from './Header';
import Register from './Register';
import { bindActionCreators } from 'redux';

var $ = require("jquery");

const usersInitial = {

}

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            flag_for_msg: false,
        }
    }

    onLogin = (e) => {
        e.preventDefault();
        this.setState({
            flag_for_msg: true
        });       
        this.props.authActions.authLogin(this.state.username, this.state.password); 
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

    render() {
        var {username, password, flag_for_msg} = this.state;
        var {isAuthenticated} = this.props;
        return (
            <div>
                {/* <Header/> */}
            <div className="login-page">
            <div className="form">
              <form className="login-form">
                <input type="text" name="username" placeholder="username" onChange={this.onChange} value={username}/>
                {username == '' && isAuthenticated.error != null ? <span style={{color: 'red'}}>Please input username</span> : ''}
                <input type="password" name="password" placeholder="password" onChange={this.onChange} value={password} style={{marginTop: '20px'}}/>
                {password == '' && isAuthenticated.error != null ? <span style={{color: 'red'}}>Please input password</span> : ''}
                {username != '' && password !='' && flag_for_msg == true && isAuthenticated.error != null ? <span style={{color: 'red'}}>Username or password wrong!</span> : ''}
                <button onClick={this.onLogin} style={{marginTop: '20px'}}>login</button>
                <p className="message">Not registered? <a href="/register">Create an account</a></p>
              </form>
            </div>
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
        // authLogin: (username, password) => {
        //     dispatch(actions.authLogin(username,password));
        // },
        authActions: bindActionCreators(authActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
