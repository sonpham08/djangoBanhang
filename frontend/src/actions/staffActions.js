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
        }).catch(function(err) {
            console.log(err);
            
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
        }).catch(function(err) {
            console.log(err);
            
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
        }).catch(function(err) {
            console.log(err);
            
        })
    }
}

// export const deleteBill = (bill_id) => {
//     return dispatch => {
//         var headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
//         let url = `/api/v1/bill/${bill_id}/`;
//         axios({
//             url, headers, method: 'delete'
//         }).then(function(res) {
//             let response = {
//                 status: "success",
//                 bill_id: bill_id
//             };
//             dispatch({
//                 type: typesStaff.DELETE_BILL,
//                 detail: response
//             });
//         })
//     }
// }

export const deleteBill = (product, bill_id) => {
    return dispatch => {
        var headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let axBill = axios({
            url: `/api/v1/bill/${bill_id}/`, headers, method: 'delete'
        });
        let data = JSON.stringify({
            quantity: parseInt(product.quantity) + parseInt(product.number_product_order)
        });
        let axProduct = axios({
            url: `/api/v1/product/${product.product_id}/`, headers, method: 'patch', data
        });
        Promise.all([axBill,axProduct]).then(function(values) {
            let response = {
                status: "success",
                bill_id: bill_id
            };
            dispatch({
                type: typesStaff.DELETE_BILL,
                detail: response
            });
        }).catch(function(err) {
            console.log(err);
            
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
        }).catch(function(err) {
            console.log(err);
            
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
        }).catch(function(err) {
            console.log(err);
            
        })
    }
}

export const addDealedProduct = (quantity, product_id) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let d = new Date();
        let month = d.getMonth();
        let day = d.getDate();
        let url = '/api/v1/dealedproduct/';
        let data = JSON.stringify({
            number_product_dealed: quantity,
            product: product_id,
            year: 2019,
            month: month,
            day: day
        });
        axios({
            url, headers, method: 'post', data
        }).then(function(res){
            dispatch({
                type: typesStaff.ADD_DEALED_PRODUCT,
                dealed: res.data
            })
        }).catch(function(err) {
            console.log(err);
            
        })
    }
}


export const openFlashSale = (start, end, product) => {
    return dispatch => {
        var headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = '/api/v1/flashsale/';
        let data = JSON.stringify({
            start_flash: start,
            end_flash: end
        });
        axios({
            url, headers, method: 'post', data
        }).then(function(res){
            let arrayAxios = [];
            console.log(res);
            for(var i=0; i < product.length; i++) {
                let ax = axios({
                    url: '/api/v1/flashproduct/',
                    headers, method: 'post',
                    data: JSON.stringify({
                        flashsale: res.data.flash_id,
                        product: product[i].id
                    })
                });
                arrayAxios.push(ax);
            }
            Promise.all(arrayAxios).then(function(results) {
                console.log(results);
                
                dispatch({
                    type: typesStaff.ADD_FLASH_PRODUCT,
                    flashproduct: results.data
                })
            })
            dispatch({
                type: typesStaff.OPEN_FLASH_SALE,
                flashsale: res.data
            })
        }).catch(function(err) {
            console.log(err);
            
        })
    }
}

export const getFlashSale = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = '/api/v1/flashsale/';
        axios({
            url, headers, method: 'get'
        }).then(function(res){   
            console.log(res);
              
            dispatch({
                type: typesStaff.GET_LIST_FLASH_SALE,
                flashsale: res.data
            })
        }).catch(function(err) {
            console.log(err);
            
        })
    }
}