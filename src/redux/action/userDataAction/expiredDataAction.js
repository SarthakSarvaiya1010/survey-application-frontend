import {SET_LOADING_FALSE, SET_LOADING_TRUE, EXPIRED_ERROR,EXPIRED_SUCCESS} from "../../actionType/actionType";
import axios from "axios";

export const expiredDataAction = () => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE
    })
    let resettoken = JSON.parse(localStorage.getItem("resettoken"))
    const res = await axios.get(`https://survey-api-m9x0.onrender.com/checklinkexpired/${resettoken}`);
    dispatch({
      type: EXPIRED_SUCCESS,
      payload: { data: res.data },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: EXPIRED_ERROR,
      payload: { data: error.response.data },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  }
};
