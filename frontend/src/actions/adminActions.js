import * as types from '../constants/AdminConstants';
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

function getBase64 (file, cb) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

export const addProduct = (name, price, quantity, size, weight, color, sound, 
    memory, camera, pin, gurantee, promotion, start_promo, end_promo, category, image_name) => {
    return dispatch => {
        // const formData = new FormData();
        // formData.append('image', image_name);
        // console.log(formData);
        var formData = "";
        let reader = new FileReader();
        reader.readAsDataURL(image_name[0]);
        reader.onload = e => {
            formData = e.target.result;
            console.log(formData);
            let url = '/api/v1/product/';
            let headers = { 'X-CSRFToken': csrftoken };
            let data = {
                "name": name,
                "price": price,
                "quantity": quantity,
                "size": size,
                "weight": weight,
                "color": color,
                "sound": sound,
                "memory": memory,
                "camera": camera,
                "pin": pin,
                "gurantee": gurantee,
                "promotion": promotion,
                "start_promo": start_promo,
                "end_promo": end_promo,
                "category": category,
                "image": formData
            };
            console.log(data);

            axios({
                url, headers,method:'post',data:data
            }).then(function(res){
                console.log(res);
            }).catch(error => {

            })
        }
        
    }
}

export const editProduct = (product) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/product/${product.product_id}/`;
        let data = JSON.stringify({
            name: product.name,
            price: product.price,
            quantity: product.quantity,
            size: product.size,
            weight: product.weight,
            color: product.color,
            sound: product.sound,
            memory: product.memory,
            camera: product.camera,
            pin: product.pin,
            gurantee: product.gurantee,
            promotion: product.promotion,
            start_promo: product.start_promo,
            end_promo: product.end_promo,
            category: product.category
        });
        axios({
            url, headers, method: 'put', data
        }).then(function(res) {
            dispatch({
                type: types.EDIT_PRODUCT,
                adproduct: res.data
            })
        })
    }
}

export const deleteProduct = (product_id) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/product/${product_id}/`;
        axios({
            url, headers, method: 'delete'
        }).then(function(res) {
            let result = {
                product_id: product_id,
                status: 'success'
            };
            dispatch({
                type: types.DELETE_PRODUCT,
                adproduct: result
            })
        })
    }
}

export const getListProduct = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = "/api/v1/product/get_product/";
        axios({
            url, headers, method: 'get'
        }).then(function(res){
            dispatch({
                type: types.GET_LIST_PRODUCT,
                adproduct: res.data
            })
        })
    }
}

// export const getListProduct = () => {
//     return dispatch => {
//         let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
//         let url = "/api/v1/product/";
//         axios({
//             url, headers, method: 'get'
//         }).then(async function(res){
//             dispatch({
//                 type: types.GET_LIST_PRODUCT,
//                 adproduct: res.data
//             })
//             var result = [];
//             let newRes = Object.assign([], res.data);
//             for(var i=0; i< newRes.length; i++) {
//                 await new Promise(resolve => {
                    
//                     let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
                    
//                         let url = `/api/v1/category/${newRes[i].category}/`;
//                         console.log(url);
//                         axios({
//                             url, headers, method: 'get'
//                         }).then(function(res){
//                             resolve(res);
//                         })
                    
//                 }).then(res => {
                    
//                     result.push(res.data);
//                     console.log(res.data);
//                 })
//             }
//             console.log(result);
            
//         })
//     }
// }

export const addCategory = (name) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let data = JSON.stringify({
            "name": name,
        });
        let url = '/api/v1/category/'; 
        axios({
            url, headers,method:'post',data:data
        }).then(function(res){
            dispatch({
                type: types.ADD_CATEGORY,
                adcategories: res.data
            })
        }).catch(error => {

        })
    }
}

export const getCategoryById = (category_id) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/category/${category_id}/`;
        axios({
            url, headers, method: 'get'
        }).then(function(res){
            dispatch({
                type: types.GET_CATEGORY_BY_ID,
                adcategories: res.data
            })
        })
    }
}

export const getListCategory = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = "/api/v1/category/";
        axios({
            url, headers, method: 'get'
        }).then(function(res){
            dispatch({
                type: types.GET_LIST_CATEGORY,
                adcategories: res.data
            })
        })
    }
}

export const getListStaff = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = '/api/users/get_staff/';
        axios({
            url, headers, method: 'get'
        }).then(function(res) {
            dispatch({
                type: types.GET_LIST_STAFF,
                adstaff: res.data
            })
        })
    }
}

export const editStaffInfo = (staff) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/users/${staff.id}/`;
        let data = JSON.stringify({
            fullname: staff.fullname,
            email: staff.email,
            phone: staff.phone,
            address: staff.address,
            cmnd: staff.cmnd,
            is_staff_gun: staff.is_staff_gun,
            is_user: staff.is_user
        });
        console.log(data);
        
        axios({
            url, headers, method: "put", data
        }).then(function(res) {
            dispatch({
                type: types.EDIT_STAFF_INFO,
                adstaff: res.data
            })
        })
    }
}

export const deleteStaff = (id) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/users/${id}/`;
        axios({
            url, headers, method: 'delete'
        }).then(function(res) {
            let result = {
                id: id,
                status: 'success'
            };
            dispatch({
                type: types.DELETE_STAFF,
                adstaff: result
            })
        })
    }
}

export const getListCustomer = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = '/api/users/get_customer/';
        axios({
            url, headers, method: 'get'
        }).then(function(res) {
            dispatch({
                type: types.GET_LIST_CUSTOMER,
                adcustomer: res.data
            })
        })
    }
}

export const editCategory = (category) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/category/${category.category_id}/`;
        let data = JSON.stringify({
            name: category.name
        });
        axios({
            url, headers, method: 'put', data
        }).then(function(res) {
            dispatch({
                type: types.EDIT_CATEGORY,
                adcategories: res.data
            })
        })
    }
}

export const deleteCategory = (category_id) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/category/${category_id}/`;
        axios({
            url, headers, method: 'delete'
        }).then(function(res) {
            let result = {
                category_id: category_id,
                status: 'success'
            };
            dispatch({
                type: types.DELETE_CATEGORY,
                adcategories: result
            })
        })
    }
}