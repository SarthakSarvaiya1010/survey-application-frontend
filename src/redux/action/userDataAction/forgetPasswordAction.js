import {
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
  FORGET_PASSWORD_ERROR,
  FORGET_PASSWORD_SUCCESS,
} from "../../actionType/actionType";
import axios from "axios";

export const forgetPasswordAction = (details) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    const res = await axios.post(
      `https://survey-api-m9x0.onrender.com/forgetpassword`,
      details
    );
    dispatch({
      type: FORGET_PASSWORD_SUCCESS,
      payload: { data: res.data },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 500);
  } catch (error) {
    console.log(error);
    dispatch({
      type: FORGET_PASSWORD_ERROR,
      payload: { data: error.response.data },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 500);
  }
};
