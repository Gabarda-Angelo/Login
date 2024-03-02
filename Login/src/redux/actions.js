import * as types from "./actionTypes";
import {auth} from "../firebase";

const loginStart = () => ({
    type: types.LOGIN_START,

});

const loginSuccess = (user) => ({
    type: types.LOGIN_SUCCESS,
    payload: user,
});

export const adminLoginSuccess = (user) => ({
    type: types.ADMIN_LOGIN_SUCCESS,
    payload: user,
  }); 

  

const loginFail = (error) => ({
    type: types.LOGIN_FAIL,
    payload: error,
});


const logoutStart = () => ({
    type: types.LOGOUT_START,

});

const logoutSuccess = () => ({
    type: types.LOGOUT_SUCCESS,
   
});

const logoutFail = (error) => ({
    type: types.LOGOUT_FAIL,
    payload: error,
});

export const setUser = (user) => ({
    type: types.SET_USER,
    payload: user,
});








export const loginInitiate = (email, password) => {
    return function (dispatch) {
      dispatch(loginStart());
      auth
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => {
          // Check if the user is an admin
          if (user && user.email === 'admin.cemetery@gmail.com') {
            // Admin login successful
            dispatch(adminLoginSuccess(user));
          } else {
            // Regular user login successful
            dispatch(loginSuccess(user));
          }
        })
        .catch((error) => {
          console.error('Login failed:', error);
          dispatch(loginFail(error.message));
        });
    };
  };



export const logoutInitiate = () => { 
    
    return function (dispatch) {
      dispatch(logoutStart());
      auth
        .signOut()
        .then(() => {
          // Set isAdmin to false after logout
          dispatch({ type: types.SET_USER, payload: { currentUser: null, isAdmin: false } });
          dispatch(logoutSuccess());

          
        })
        .catch((error) => {
          console.error('Logout failed:', error);
          dispatch(logoutFail(error.message));
        });
    };
  };



  



