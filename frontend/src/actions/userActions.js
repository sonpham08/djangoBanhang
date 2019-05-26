import * as types from '../constants/UserConstants';
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

export const getListProductUser = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken};
        let url = "/api/v1/product/get_product_hightlight/";
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

export const getListProductPromotion = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = "/api/v1/product/get_product_promotion/";
        axios({
            url, headers, method: 'get'
        }).then(function(res){
            dispatch({
                type: types.USER_GET_LIST_PRODUCT_PROMOTION,
                promotion: res.data
            })
        })
    }
}

export const getListProductNew = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = "/api/v1/product/get_product_new/";
        axios({
            url, headers, method: 'get'
        }).then(function(res){
            console.log(res);
            
            dispatch({
                type: types.USER_GET_LIST_PRODUCT_NEW,
                news: res.data
            })
        })
    }
}

export const userRatingProduct = (product_id, rating) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/product/${product_id}/`;
        let data = JSON.stringify({
            rating: rating
        });
        axios({
            url, headers, method: 'patch', data
        }).then(function(res){
            console.log(res);
            
            dispatch({
                type: types.USER_RATING_PRODUCT,
                products: res.data
            })
        })
    }
}

// export const getProductById = (product_id) => {
//     return dispatch => {
//         let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
//         let url = `/api/v1/product/${product_id}/`;
//         axios({
//             url, headers, method: 'get'
//         }).then(function(res){
//             console.log(res);
//         })
//     }
// }

export const getCategoryById = (category_id) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/category/${category_id}/`;
        axios({
            url, headers, method: 'get'
        }).then(function(res){
            dispatch({
                type: types.USER_GET_CATEGORY_BY_ID,
                uscategories: res.data
            })
        })
    }
}

export const getListCart = () => {
    let token = localStorage.getItem('token');
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken,
        'Authorization': `Token ${token}` };
        let url = '/api/v1/cart/get_my_cart/';
        axios({
            url, headers, method: 'get',
        }).then(function(res){
            console.log(res);
            
            dispatch({
                type: types.GET_LIST_CART,
                cart: res.data
            })
        })
    }
}

export const getCartByProductId = (product_id) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = '/api/v1/cart/';
        axios({
            url, headers, method: 'get',
        }).then(function(res){     
            dispatch({
                type: types.GET_LIST_STAFFSHIP,
                staff: res.data
            })
        })
    }
}

export const addToCart = (product_id, user_id) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = '/api/v1/cart/';
        let data = JSON.stringify({
            user: user_id,
            product: product_id
        });
        axios({
            url, headers, method: 'post',data
        }).then(function(response){
            // console.log(resonse);
            let token = localStorage.getItem('token');
            let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken,
            'Authorization': `Token ${token}` };
            let url = '/api/v1/cart/get_my_cart/';
            axios({
                url, headers, method: 'get',
            }).then(function(res){
                console.log(res);
                dispatch({
                    type: types.ADD_CART,
                    cart: res.data
                })
            })
            
        })
    }
}

export const deleteFromCart = (cart_id) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/cart/${cart_id}/`;
        axios({
            url, headers, method: 'delete'
        }).then(function(res){
            dispatch({
                type: types.DELETE_CART,
                cart_id: cart_id
            })
        })
    }
}

export const buyProduct = (product_id) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = '/api/v1/dealedproduct/';
        let data = JSON.stringify({
            // dealed: product.how_many_buy,
            product: product_id
        });
        axios({
            url, headers, method: 'post',data
        }).then(function(res){
            console.log(res);
            
            dispatch({
                type: types.BUY_PRODUCT,
                product: res.data
            })
        })
    }
}

export const changeInfo = (user) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/users/${user.id}/`;
        let data = JSON.stringify({
            fullname: user.fullname,
            email: user.email,
            phone: user.phone,
            address: user.address,
        });
        axios({
            url, headers, method: 'patch',data
        }).then(function(res){
            console.log(res);
            toastr.success('Thay đổi thông tin thành công');
            dispatch({
                type: types.CHANGE_INFO,
                user: res.data
            })
        })
    }
}

export const getListStaffship = () => {
    let token = localStorage.getItem('token');
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = '/api/v1/staff/get_staff/';
        axios({
            url, headers, method: 'get',
        }).then(function(res){     
            dispatch({
                type: types.GET_LIST_STAFFSHIP,
                staff: res.data
            })
        })
    }
}

export const createBill = (bill) => {
    return dispatch => {
        var headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = '/api/v1/bill/';
        let data = JSON.stringify({
            total_price: bill.total_price,
            address: bill.address,
            status: bill.status,
            user: bill.user,
            status_product: 1,
            staff: bill.staff
        });
        
        axios({
            url, headers, method: 'post',data
        }).then(function(res){
            toastr.success('Đặt hàng thành công. Bạn sẽ nhận được email từ cửa hàng để xác nhận');
            dispatch({
                type: types.CREATE_BILL,
                bill: res.data
            })
            let url = '/api/v1/detail/';
            let data = JSON.stringify({
                number_product_order: bill.number_product_order,
                product: bill.product_id,
                bill: res.data.bill_id
            });
            axios({
                url, headers, method: 'post', data
            }).then(function(response) {
                console.log(response);
                
            })
        })
    }
}

export const userAddComment = (content, product_id, user_id) => {
    let token = localStorage.getItem('token');
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = '/api/v1/comment/';
        let data = JSON.stringify({
            content: content,
            product: product_id,
            user: user_id
        });
        axios({
            url, headers, method: 'post', data
        }).then(function(res){   
            dispatch({
                type: types.USER_COMMENT,
                comment: res.data
            })
        })
    }
}

export const getComment = () => {
    let token = localStorage.getItem('token');
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = '/api/v1/comment/get_comment/';
        axios({
            url, headers, method: 'get',
        }).then(function(res){   
            console.log(res);
              
            dispatch({
                type: types.GET_COMMENT,
                comment: res.data
            })
        })
    }
}

export const getCoinByUser = () => {
    let token = localStorage.getItem('token');
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken,
        'Authorization': `Token ${token}` };
        let url = '/api/v1/coin/get_coin_by_user/';
        axios({
            url, headers, method: 'get'
        }).then(function(res){   
            console.log(res);
              
            dispatch({
                type: types.GET_COIN_BY_USER,
                coin: res.data
            })
        })
    }
}

export const addCoin = (coin_id, user_id, count) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/coin/${coin_id}/`;
        let data = JSON.stringify({
            user: user_id,
            count: count + 1
        });
        axios({
            url, headers, method: 'patch', data
        }).then(function(res){   
            console.log(res);
              
            dispatch({
                type: types.ADD_COIN,
                coin: res.data
            })
        })
    }
}

export const updateCoin = (coin) => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = `/api/v1/coin/${coin.coin_id}/`;
        let data = JSON.stringify({
            count: coin.count - coin.num_coin_use
        });
        axios({
            url, headers, method: 'patch', data
        }).then(function(res){   
            console.log(res);
              
            dispatch({
                type: types.UPDATE_COIN,
                coin: res.data
            })
        })
    }
}

export const getFlashSale = () => {
    return dispatch => {
        let headers = { "Content-Type": "application/json",'X-CSRFToken': csrftoken };
        let url = '/api/v1/flashsale/get_flash_product/';
        axios({
            url, headers, method: 'get'
        }).then(function(res){   
            console.log(res);
              
            dispatch({
                type: types.GET_FLASH_SALE_USER,
                flashsale: res.data
            })
        })
    }
}