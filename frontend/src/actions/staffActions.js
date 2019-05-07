import * as typesUser from '../constants/UserConstants';
import * as typesStaff from '../constants/StaffContants';
import axios from 'axios';
import { browserHistory } from 'react-router';
import toastr from 'toastr';

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

export const getBill = () => {
    return dispatch => {
        let token = localStorage.getItem('token');
        var headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken ,
        'Authorization': `Token ${token}`};
        let url = "/api/v1/bill/get_bill_with_product/";
        axios({
            url, headers, method: 'get'
        }).then(function(res) {
            dispatch({
                type: typesStaff.DETAIL_BILL,
                detail: res.data
            });
        })
    }
}

export const getBillUser = () => {
    return dispatch => {
        let token = localStorage.getItem('token');
        var headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken,
        'Authorization': `Token ${token}` };
        let url = "/api/v1/bill/get_bill_user/";
        axios({
            url, headers, method: 'get'
        }).then(function(res) {
            dispatch({
                type: typesStaff.DETAIL_BILL,
                detail: res.data
            });
        })
    }
}

export const editBillWithStaffAndQuantity = (bill_id, staff_id,status_product) => {
    return dispatch => {
        var headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/bill/${bill_id}/`;
        let data = JSON.stringify({
            staff: staff_id,
            status_product: status_product
        });
        axios({
            url, headers, method: 'patch', data
        }).then(function(res) {
            dispatch({
                type: typesStaff.EDIT_BILL_IN_DETAIL,
                detail: res.data
            });
        })
    }
}

export const deleteBill = (bill_id) => {
    return dispatch => {
        var headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/bill/${bill_id}/`;
        axios({
            url, headers, method: 'delete'
        }).then(function(res) {
            let response = {
                status: "success",
                bill_id: bill_id
            };
            dispatch({
                type: typesStaff.DELETE_BILL,
                detail: response
            });
        })
    }
}

export const editQuanityProductAfterBuy = (product_id, res) => {
    return dispatch => {
        var headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/product/${product_id}/`;
        let data = JSON.stringify({
            quantity: res
        });
        axios({
            url, headers, method: 'patch', data
        }).then(function(res) {
            console.log(res);
            
            // dispatch({
            //     type: typesStaff.UPDATE_QUANTITY_PRODUCT,
            //     detail: res.data
            // });
        })
    }
}

export const getListStaffShip = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = '/api/v1/staff/';
        axios({
            url, headers, method: 'get',
        }).then(function(res){     
            dispatch({
                type: typesUser.GET_LIST_STAFFSHIP,
                staff: res.data
            })
        })
    }
}

export const addDealedProduct = (quantity, product_id) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = '/api/v1/dealedproduct/';
        let data = JSON.stringify({
            number_product_dealed: quantity,
            product: product_id
        });
        axios({
            url, headers, method: 'post', data
        }).then(function(res){
            dispatch({
                type: typesStaff.ADD_DEALED_PRODUCT,
                dealed: res.data
            })
        })
    }
}