import {SET_LOADING_FALSE, SET_LOADING_TRUE, RESET_PASSWORD_ERROR,RESET_PASSWORD_SUCCESS} from '../../actionType/actionType'
import axios from "axios";

export const resetPasswordAction = (details) => async (dispatch) => {
    try {
      dispatch({
        type: SET_LOADING_TRUE,
      });
      let resettoken = JSON.parse(localStorage.getItem("resettoken"))
      const res = await axios.post(`https://survey-api-m9x0.onrender.com/resetpassword/${resettoken}`, details);
      console.log("res",res);
      dispatch({
        type: RESET_PASSWORD_SUCCESS,
        payload: { data: res.data },
      });
      setTimeout(() => {
        dispatch({
          type: SET_LOADING_FALSE,
        });
      }, 500);
    } catch (error) {
      dispatch({
        type: RESET_PASSWORD_ERROR,
        payload: { data: error.response },
      });
      setTimeout(() => {
        dispatch({
          type: SET_LOADING_FALSE,
        });
      }, 500);
    }
  };
