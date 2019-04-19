import * as types from '../constants/UserConstants';
import axios from 'axios';
import { browserHistory } from 'react-router';

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

export const getListProductUser = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = "/api/v1/product/";
        axios({
            url, headers, method: 'get'
        }).then(function(res){
            dispatch({
                type: types.USER_GET_LIST_PRODUCT,
                usproduct: res.data
            })
        })
    }
}