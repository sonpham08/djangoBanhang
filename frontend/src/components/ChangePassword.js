import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as authActions from '../actions/authActions';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';

var $ = require("jquery");

class ChangePassword extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password1: "",
            password2: "",
            old_password: "",
            pwd1_wrong: false,
            pwd2_wrong: false,
            same: true
        }
    }

    onChangePass = (e) => {
        e.preventDefault();
        this.setState({
            flag_for_msg: true
        });       
        // this.props.authActions.authLogin(this.state.username, this.state.password);
        let data = {
            new_password1: this.state.password1,
            new_password2: this.state.password2,
            old_password: this.state.old_password
        };
        if(data.new_password1 != data.new_password2) {
            this.setState({same: false});
        } else {
            if(data.new_password1 != "" && data.new_password2 != "" && data.new_password1 === data.new_password2) {
                this.props.authActions.changePassword(JSON.stringify(data));
            }
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

    render() {
        var {old_password, password1, password2, same} = this.state;
        var {isAuthenticated} = this.props;
        return (
            <div>
                {/* <Header/> */}
            <div className="login-page">
            <div className="form">
              <form className="login-form">
                <input type="text" name="old_password" placeholder="old password" onChange={this.onChange} value={old_password}/>
              
                <input type="password1" name="password1" placeholder="password1" onChange={this.onChange} value={password1} style={{marginTop: '20px'}}/>
                
                <input type="password2" name="password2" placeholder="password2" onChange={this.onChange} value={password2} style={{marginTop: '20px'}}/>
                
                { same == false ? <span style={{color: 'red'}}>The both must same!</span> : ''}
                <button onClick={this.onChangePass} style={{marginTop: '20px'}}>Change</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
