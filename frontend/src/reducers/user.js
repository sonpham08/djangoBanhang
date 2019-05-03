import * as types from './../constants/ActionTypes';
import * as typesUser from './../constants/UserConstants';

var initialState = {
    id: "",
    username: "",
    fullname: "",
    is_superuser: false,
    email: "",
    is_staff_gun: false,
    is_user: false,
    phone: "",
    address: "",
    cmnd: ""
}

var myReducer = (state=initialState, action) => {
    var newState = Object.assign({}, state);
    switch(action.type){
        case types.USER_INFO:
            newState.id = action.user.data.id;
            newState.username = action.user.data.username;
            newState.is_staff_gun = action.user.data.is_staff_gun;
            newState.is_superuser = action.user.data.is_superuser;
            newState.is_user = action.user.data.is_user;
            newState.fullname = action.user.data.fullname;
            newState.email = action.user.data.email;
            newState.phone = action.user.data.phone;
            newState.address = action.user.data.address;
            newState.cmnd = action.user.data.cmnd;
            state = newState;
            return state;

        case typesUser.CHANGE_INFO:
            console.log(action.user);
            
            return state;
        default:
            return state;
    }
} 

export default myReducer;