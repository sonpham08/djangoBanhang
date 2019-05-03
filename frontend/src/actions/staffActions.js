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
        var headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = "/api/v1/bill/get_bill_with_product/";
        var arrayAxios = [];
        axios({
            url, headers, method: 'get'
        }).then(function(res) {
            console.log(res);
            // dispatch({
            //     type: types.GET_PRODUCT_BY_ID,
            //     product: res.data
            // })
            res.data.bill.forEach(element => {
                let axProduct = axios({
                    url:`/api/v1/product/${element.product_id}/`, headers, method: 'get'
                });
                let axBill = axios({
                    url: `/api/v1/bill/${element.bill_id}/`, headers, method: 'get'
                });
                Promise.all([axProduct, axBill]).then(values => {
                    console.log(values);
                    dispatch({
                        type: typesStaff.DETAIL_BILL,
                        detail: {
                            bill: values[1].data,
                            product: values[0].data
                        }
                    });
                });
            }); 
            
            
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
