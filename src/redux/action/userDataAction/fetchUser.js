import {SET_LOADING_FALSE, SET_LOADING_TRUE, userDataApi} from "../../actionType/actionType";
import axios from "axios";

export const fetchUserAction = () => async (dispatch) => {
  try {
    dispatch({
      type: userDataApi.FETCH_USER_DATA_REQUEST,
    });
    dispatch({
      type: SET_LOADING_TRUE
    })
    let token = localStorage.getItem("token")
    const res = await axios.get(`https://survey-api-m9x0.onrender.com/users`,{headers: { Authorization: `Bearer ${token}` }});
    dispatch({
      type: userDataApi.FETCH_USER_DATA_SUCCESS,
      payload: { data: res.data },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: userDataApi.FETCH_USER_DATA_ERROR,
      payload: { data: error },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  }
};
