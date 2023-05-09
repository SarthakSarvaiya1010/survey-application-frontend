import { loginApi, LOGOUT_ERROR, LOGOUT_SUCCESS, SET_LOADING_FALSE, SET_LOADING_TRUE, signInApi } from "../../actionType/actionType";
import axios from "axios";

//login
export const loginUserAction = (details) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    const res = await axios.post("https://survey-api-m9x0.onrender.com/login", details);
    dispatch({
      type: loginApi.LOGIN_USER_SUCCESS,
      payload: { data: res.data },
    });
  
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: loginApi.LOGIN_USER_ERROR,
      payload: { data: error },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  }
};

//SignIn
export const signInUserAction = (details) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    let token = localStorage.getItem("token")
    const res = await axios.post("https://survey-api-m9x0.onrender.com/register", details,{headers: { Authorization: `Bearer ${token}` }});
    console.log("res",res);
    dispatch({
      type: signInApi.SIGNIN_USER_SUCCESS,
      payload: { data: res.data },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: signInApi.SIGNIN_USER_ERROR,
      payload: { data: error.response.data },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 500);
  }
};


export const logOUTUserAction = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    let token = localStorage.getItem("token")
    const res = await axios.get("https://survey-api-m9x0.onrender.com/logout",{headers: { Authorization: `Bearer ${token}` }});
    dispatch({
      type: LOGOUT_SUCCESS,
      payload: { data: res.data },
    });
  
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: LOGOUT_ERROR,
      payload: { data: error },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  }
};