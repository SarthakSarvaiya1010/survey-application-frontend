import { SET_LOADING_FALSE, SET_LOADING_TRUE, workerAndSurvey } from "../../actionType/actionType";
import axios from "axios";

export const fetchSurveyDataAction = () => async (dispatch) => {
  try {
    let UUID = localStorage.getItem("UUID");
    dispatch({
      type: SET_LOADING_TRUE
    })
    let token = localStorage.getItem("token")
    const res = await axios.get(`https://survey-api-m9x0.onrender.com/survey/data/${UUID}`,{headers: { Authorization: `Bearer ${token}` }});
    dispatch({
      type: workerAndSurvey.FETCH_SURVEY_DATA_SUCCESS,
      payload: { surveyData: res.data },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: workerAndSurvey.FETCH_SURVEY_DATA_ERROR,
      payload: { surveyData: error },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 500);
  }
};

export const getSurveyDataAction = () => async (dispatch) => {
  try {
    let UUID = localStorage.getItem("UUID");
    dispatch({
      type: SET_LOADING_TRUE
    })
    let token = localStorage.getItem("token")
    const res = await axios.get(`https://survey-api-m9x0.onrender.com/survey/data/${UUID}`,{headers: { Authorization: `Bearer ${token}` }});
    dispatch({
      type: workerAndSurvey.GET_SURVEY_DATA_SUCCESS,
      payload: { data: res.data },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: workerAndSurvey.GET_SURVEY_DATA_ERROR,
      payload: { data: error },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 500);
  }
};

export const postSurveyDataAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE
    })
    let token = localStorage.getItem("token")
    const res = await axios.post(
      `https://survey-api-m9x0.onrender.com/survey/submission/`,
      data,{headers: { Authorization: `Bearer ${token}` }}
    );
    dispatch({
      type: workerAndSurvey.POST_SURVEY_DATA_SUCCESS,
      payload: { data: res.data },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 500);
  } catch (error) {
    dispatch({
      type: workerAndSurvey.POST_SURVEY_DATA_ERROR,
      payload: { data: error },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 500);
  }
};
