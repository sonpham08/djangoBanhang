import * as types from '../constants/ActionTypes';
import axios from 'axios';
import { browserHistory } from 'react-router';

export const authStart = () => {
    return {
        type: types.AUTH_START
    }
}

export const authSuccess = (token) => {
    return {
        type: types.AUTH_SUCCESS,
        token
    }
}

export const authFail = (error) => {
    return {
        type: types.AUTH_FAIL,
        error
    }
}

export const registerFail = (error) => {
    return {
        type: types.REGISTER_FAIL,
        error
    }
}

var csrftoken = getCookie('csrftoken');
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('tab');
    localStorage.removeItem("tabAd");
    return {
        type: types.AUTH_LOGOUT
    }
}

export const authLogin = (username, password) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let data = JSON.stringify({
            "username": username,
            "password": password
        });
        let url = '/rest-auth/login/'; 
        axios({
            url, headers,method:'post',data:data
        }).then(res=>{
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600*1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            dispatch(authSuccess(token));
            dispatch(checkTimeOut(3600));
            browserHistory.push('/');
            window.location.reload(true);
            
        }).catch(error => {
            dispatch(authFail(error));
        })
    }
}

export const authSignup = (username,email, password,fullname, is_staff, is_user, phone, address, cmnd) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let data = JSON.stringify({
            "username": username,
            "email": email,
            "password": password,
            "fullname": fullname,
            "is_staff": is_staff,
            "is_user": is_user,
            "phone": phone,
            "address": address,
            "cmnd": cmnd
        });
        let url = '/api/auth/register/'; 
        axios({
            url, headers,method:'post',data:data
        }).then(res=>{
            console.log('res', res);
            
            const token = res.data.key;
            const expirationDate = new Date(new Date().getTime() + 3600*1000);
            localStorage.setItem('token', token);
            localStorage.setItem('expirationDate', expirationDate);
            window.location.href="/login";
            dispatch(authSuccess(token));
            dispatch(checkTimeOut(3600));
        }).catch(error => {
            dispatch(registerFail(error));
        })
    }
} 

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(token == undefined) {
            dispatch(logout());
        }else {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()) {
                dispatch(logout());
            }else {
                dispatch(authSuccess(token));
                dispatch(checkTimeOut((expirationDate.getTime() - new Date().getTime()) /1000));
            }
        }
    }
}

export const getUserInfo = () => {
    let token = localStorage.getItem('token');
    return dispatch => {
        let headers = { "Content-Type": "application/json", 'Authorization': `Token ${token}` };
        let url = '/api/users/me/';
        axios({
                url, headers, method: "get"
        }).then(function(user) {
            dispatch({
                type: types.USER_INFO,
                user
            })
        })
    }
}

export const checkTimeOut = expirationDate => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationDate*1000);       
    }
}