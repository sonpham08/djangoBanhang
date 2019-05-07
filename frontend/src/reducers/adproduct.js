import * as types from '../constants/AdminConstants';

// var initialState = {
//     name: "",
// 	price: 0,
// 	quantity: 0,
// 	size: 0,
// 	hdh: "",
// 	color: "",
// 	CPU: "",
// 	memory: "",
// 	camera: "",
// 	pin: "",
// 	gurantee: "",
// 	promotion: 0,
// 	start_promo: "",
// 	end_promo: "",
// 	category: 0
// }
var initialState = [];

var myReducer = (state=initialState, action) => {
	var newState = Object.assign([], state);
	var index = "";
    switch(action.type){
		case types.GET_LIST_PRODUCT:
			newState = action.adproduct;
			return [...newState];
		case types.ADD_PRODUCT:
			console.log(action.adproduct);
			
			return [...newState, action.adproduct];
		case types.EDIT_PRODUCT:
			index = newState.findIndex((obj => obj.product_id == action.adproduct.product_id));
			console.log(action);
			
			newState[index].name = action.adproduct.name;
			newState[index].price = action.adproduct.price;
			newState[index].quantity = action.adproduct.quantity;
			newState[index].size = action.adproduct.size;
			newState[index].hdh = action.adproduct.hdh;
			newState[index].color = action.adproduct.color;
			newState[index].CPU = action.adproduct.CPU;
			newState[index].memory = action.adproduct.memory;
			newState[index].camera = action.adproduct.camera;
			newState[index].pin = action.adproduct.pin;
			newState[index].gurantee = action.adproduct.gurantee;
			newState[index].promotion = action.adproduct.promotion;
			newState[index].start_promo = action.adproduct.start_promo;
			newState[index].end_promo = action.adproduct.end_promo;
			newState[index].category = action.adproduct.category;
			return [...newState];
		case types.DELETE_PRODUCT:
			let status = action.adproduct.status;
			if(status == 'success') {
				index = newState.findIndex((obj => obj.product_id == action.adproduct.product_id));
				newState.splice(index, 1);
			}
			return [...newState];
        default:
            return state;
    }
} 

export default myReducer;