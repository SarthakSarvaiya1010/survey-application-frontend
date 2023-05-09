import {SET_LOADING_FALSE, SET_LOADING_TRUE, userDataApi} from "../../actionType/actionType";
import axios from "axios";

export const putUserEditData = (id, data) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    let token = localStorage.getItem("token")
    const res = await axios.put(`https://survey-api-m9x0.onrender.com/edit/${id}`, data,{headers: { Authorization: `Bearer ${token}` }});
    console.log("res",res);
    dispatch({
      type: userDataApi.POST_USER_EDIT_DATA_SUCCESS,
      payload: { data: res.data },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: userDataApi.POST_USER_EDIT_DATA_ERROR,
      payload: { data: error.response.data },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  }
};
