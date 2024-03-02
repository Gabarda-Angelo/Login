import * as types from "./actionTypes";
const initialState = {
    loading: false,
    currentUser: null,
    error: null,
};

const userReducer = (state = initialState, action) => {
    switch(action.type){
       
        case types.LOGIN_START:
        case types.LOGOUT_START:
      
            return{
                ...state,
                loading: true,
            };
        case types.LOGOUT_SUCCESS:
        case types.ADMIN_LOGOUT_SUCCESS:
            return{
                ...state,
                currentUser: null,

            }; 
        case types.SET_USER:
            return{
                ...state,
                loading: false,
                currentUser: action.payload,
            };
      
        case types.LOGIN_SUCCESS:
            return{
                ...state,
                loading: false,
                currentUser: action.payload,
            };
    
        case types.LOGIN_FAIL:
        case types.LOGOUT_FAIL:
       
            return{
                ...state,
                loading: false,
                error: action.payload,
            };
        case types.ADMIN_LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                currentUser: action.payload,
                isAdmin: true,
            };
        default:
            return state;
    }
};

export default userReducer;