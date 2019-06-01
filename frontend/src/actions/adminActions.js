import * as types from '../constants/AdminConstants';
import * as typeUser from '../constants/UserConstants';
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

export const addProduct = (name, price, size,quantity, hdh, color, CPU, 
    memory, camera, pin, gurantee, promotion, start_promo, end_promo, category, image_name) => {
    return dispatch => {
        const formData = new FormData();
        formData.append('image', image_name);
        formData.append('name', name);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('size', size);
        formData.append('hdh', hdh);
        formData.append('color', color);
        formData.append('CPU', CPU);
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
            hdh: product.hdh,
            color: product.color,
            CPU: product.CPU,
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
        // let url = "/api/v1/category/";
        let url = "/api/v1/category/statistic_category_in_product/";
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
        let token = localStorage.getItem('token');
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken,
        'Authorization': `Token ${token}` };
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

export const getListTransporter = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = '/api/v1/transporter/';
        axios({
            url, headers, method: 'get'
        }).then(function(res){
            dispatch({
                type: types.GET_TRANSPORTER,
                transporter: res.data
            })
        })
    }
}

export const getListStaffShip = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/staff/get_staff/`;
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

export const addStaffship = (name,phone, transporter) => {
    return dispatch => {
        var headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let data = JSON.stringify({
            "name": name,
            "phone": phone,
            "transporter": transporter
        });
        let url = '/api/v1/staff/'; 
        axios({
            url, headers,method:'post',data:data
        }).then(function(res){
            axios({
                url: `/api/v1/transporter/${res.data.transporter}/`, headers, method: 'get'
            }).then(function(response) {
                let result = {
                    staff_id: res.data.staff_id,
                    name: res.data.name,
                    phone: res.data.phone,
                    transporter: [
                        {
                            transporter_id: response.data.transporter_id,
                            name: response.data.name
                        }
                    ]
                }
                dispatch({
                    type: types.ADD_STAFFSHIP,
                    adstaffship: result
                })
            }).catch(error => {
                console.log(error);
                
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
            url, headers, method: 'patch', data
        }).then(function(res) {
            axios({
                url: `/api/v1/transporter/${res.data.transporter}/`, headers, method: 'get'
            }).then(function(response) {
                let result = {
                    staff_id: res.data.staff_id,
                    name: res.data.name,
                    phone: res.data.phone,
                    transporter: [
                        {
                            transporter_id: response.data.transporter_id,
                            name: response.data.name
                        }
                    ]
                }
                dispatch({
                    type: types.EDIT_STAFFSHIP,
                    adstaffship: result
                })
            }).catch(error => {
                console.log(error);
                
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

export const getCoin = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = "/api/v1/coin/get_coin/";
        axios({
            url, headers, method: 'get'
        }).then(function(res) {
            dispatch({
                type: typeUser.GET_COIN,
                coin: res.data
            })
        })
    }
}

export const initialCoinForCustomer = (user_id) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = "/api/v1/coin/";
        let data = JSON.stringify({
            user: user_id
        });
        axios({
            url, headers, method: 'post', data
        }).then(function(res) {
            dispatch({
                type: typeUser.INITIAL_COIN,
                coin: res.data
            })
        })
    }
}

export const statictic_basic_year = (year, month) => {
    return dispatch => {
        dispatch({
            type: types.STATISTIC_BASIC_YEAR,
            status: "loading"
        })
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/dealedproduct/statistic_basic_year/?year=${parseInt(year)}&month=${parseInt(month)}`;
        console.log(url);
        
        axios({
            url, headers, method: 'get'
        }).then(function(res) {
            dispatch({
                type: types.RESPONSE_STATISTIC_BASIC_YEAR,
                statistic: res.data
            })
        }).catch(function(err) {
            dispatch({
                type: types.STATISTIC_BASIC_YEAR,
                status: "failed"
            })
        })
    }
}