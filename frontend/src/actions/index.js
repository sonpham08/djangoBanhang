import * as types from './../constants/ActionTypes';
import axios from 'axios';

export const listAll = () => {
    return {
        type : types.LIST_ALL
    }
};

export const saveTask = (task) => {
    return {
        type : types.SAVE_TASK,
        task // task : task
    }
};

export const toggleForm = () => {
    return {
        type : types.TOGGLE_FORM
    }
}

export const openForm = () => {
    return {
        type : types.OPEN_FORM
    }
}

export const closeForm = () => {
    return {
        type : types.CLOSE_FORM
    }
}

export const updateStatus = (id) => {
    return {
        type : types.UPDATE_STATUS_TASK,
        id // id : id
    }
}

export const deleteTask = (id) => {
    return {
        type : types.DELETE_TASK,
        id // id : id
    }
}

export const editTask = (task) => {
    return {
        type : types.EDIT_TASK,
        task // task : task
    }
}

export const filterTask = (filter) => {
    return {
        type : types.FILTER_TABLE,
        filter // filter : filter -> filterName, filterStatus
    }
}

export const searchTask = (keyword) => {
    return {
        type : types.SEARCH,
        keyword // keyword : keyword
    }
}

export const sortTask = (sort) => {
    return {
        type : types.SORT,
        sort // sort : sort -> sort.by sort.value
    }
}

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


var csrftoken = getCookie('csrftoken');

export const axiosUers =(username,password) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json", 'X-CSRFToken': csrftoken };
        let data = {
                    "username": username,
                    "password": password
                  };
        let url="/api/login";
        axios({
            url,
            headers,
            method:"post",
            data:data

        }).then(res=>{
            console.log(res.data.token);
            let headers = { "Content-Type": "application/json", 'Authorization': `Token ${res.data.token}` };
            let url="/api/users/me/";
            axios({
                url, method:"get",headers,
            }).then(function(users){
                dispatch({
                    type:types.FET_USERS,
                    users
                })
            })
        })
    }
}
