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

export const addProduct = (name, price, size,quantity, weight, color, sound, 
    memory, camera, pin, gurantee, promotion, start_promo, end_promo, category, image_name) => {
    return dispatch => {
        const formData = new FormData();
        formData.append('image', image_name);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('size', size);
        formData.append('weight', weight);
        formData.append('color', color);
        formData.append('sound', sound);
        formData.append('memory', memory);
        formData.append('camera', camera);
        formData.append('pin', pin);
        formData.append('gurantee', gurantee);
        formData.append('promotion', promotion);
        formData.append('start_promo', start_promo);
        formData.append('end_promo', end_promo);
        formData.append('category', category);
        
        let url = '/api/v1/product/';
        let headers = { 'X-CSRFToken': csrftoken, "Content-Type": "multipart/form-data; boundary=something" };
        // axios({
        //     url, headers,method:'post',data: formData
        // }).then(function(res){
        //     dispatch({
        //         type: types.ADD_PRODUCT,
        //         adproduct: res.data
        //     })
        // }).catch(error => {

        // })
        const add_product = axios({
            url, headers,method:'post',data: formData
        });
        const get_list = axios({
            url: `/api/v1/category/${category}/`, headers, method: 'get',
        });
        Promise.all([add_product, get_list]).then(function(res) {
            res[0].data.category = res[1].data;
            dispatch({
                type: types.ADD_PRODUCT,
                adproduct: res[0].data
            })
        });
    }
}

export const editProduct = (product) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/product/${product.product_id}/`;
        console.log(product);
        
        let data = JSON.stringify({
            name: product.name,
            price: product.price,
            size: product.size,
            quantity: product.quantity,
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
            category: parseInt(product.category.category_id)
        });
        const edit_product = axios({
            url, headers, method: 'patch', data
        });
        const get_list = axios({
            url: `/api/v1/category/${product.category.category_id}/`, headers, method: 'get',
        });
        // axios({
        //     url, headers, method: 'patch', data
        // }).then(function(res) {
        //     dispatch({
        //         type: types.EDIT_PRODUCT,
        //         adproduct: res.data
        //     })
        // })
        Promise.all([edit_product, get_list]).then(function(res) {
            res[0].data.category = res[1].data;
            dispatch({
                type: types.EDIT_PRODUCT,
                adproduct: res[0].data
            })
        });
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

export const getListStaffShip = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/staff/`;
        axios({
            url, headers, method: 'get'
        }).then(function(res){
            console.log(res);
            dispatch({
                type: types.GET_LIST_STAFF_SHIP,
                adstaffship: res.data
            })
        })
    }
}

export const addStaffship = (name,phone) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let data = JSON.stringify({
            "name": name,
            "phone": phone
        });
        let url = '/api/v1/staff/'; 
        axios({
            url, headers,method:'post',data:data
        }).then(function(res){
            dispatch({
                type: types.ADD_STAFFSHIP,
                adstaffship: res.data
            })
        }).catch(error => {

        })
    }
}

export const editStaffship = (staffship) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/staff/${staffship.id}/`;
        let data = JSON.stringify({
            name: staffship.name,
            phone: staffship.phone
        });
        axios({
            url, headers, method: 'put', data
        }).then(function(res) {
            dispatch({
                type: types.EDIT_STAFFSHIP,
                adstaffship: res.data
            })
        })
    }
}

export const deleteStaffship = (staff_id) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/staff/${staff_id}/`;
        axios({
            url, headers, method: 'delete'
        }).then(function(res) {
            let result = {
                staff_id: staff_id,
                status: 'success'
            };
            dispatch({
                type: types.DELETE_STAFFSHIP,
                adstaffship: result
            })
        })
    }
}