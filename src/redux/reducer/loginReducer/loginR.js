import { loginApi, LOGOUT_ERROR, LOGOUT_SUCCESS, signInApi } from "../../actionType/actionType";

const statea = {
  data: {},
  
};

//login
export const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case loginApi.LOGIN_USER_REQUEST:
    return { ...action.payload };
    case loginApi.LOGIN_USER_SUCCESS:
      const newState = {
        ...state,
        ...action.payload
      };
      localStorage.setItem('loginDetails',JSON.stringify(action.payload))
      return newState;
    case loginApi.LOGIN_USER_ERROR:
      return { ...action.payload };
    default:
      return state;
  }
};

//SignIn
export const signInUserReducer = (state = statea, action) => {
  switch (action.type) {
    case signInApi.SIGNIN_USER_REQUEST:
      return { data: action.payload };
    case signInApi.SIGNIN_USER_SUCCESS:
      return { data: action.payload };
    case signInApi.SIGNIN_USER_ERROR:
      return { data: action.payload };
    default:
      return state;
  }
};


//logout

export const logoutUserReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      const newState = {
        ...state,
        ...action.payload
      };
      return newState;
    case LOGOUT_ERROR:
      return { ...action.payload };
    default:
      return state;
  }
};