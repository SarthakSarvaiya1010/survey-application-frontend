import {
  FECTH_AVERAGE_WORKER_DATA_ERROR,
  FECTH_AVERAGE_WORKER_DATA_SUCCESS,
  FECTH_AVERAGE_WORKER_FROM_MAIN_DATA_ERROR,
  FECTH_AVERAGE_WORKER_FROM_MAIN_DATA_SUCCESS,
  SET_LOADING_FALSE,
  SET_LOADING_TRUE,
  workerAndSurvey,
} from "../../actionType/actionType";
import axios from "axios";

export const fetchWorkerDataAction = (wuuid, UUID) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    let token = localStorage.getItem("token");
    const res = await axios.get(
      `https://survey-api-m9x0.onrender.com/survey/data/${UUID}?wuuid=${wuuid}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    // console.log("worker",res.data);
    dispatch({
      type: workerAndSurvey.FETCH_WORKER_DATA_SUCCESS,
      payload: { surveyData: res.data },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: workerAndSurvey.FETCH_WORKER_DATA_ERROR,
      payload: { surveyData: error },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  }
};

export const getWorkerDataAction = () => async (dispatch) => {
  try {
    let wuuid = localStorage.getItem("workerId");
    let UUID = localStorage.getItem("UUID");
    dispatch({
      type: SET_LOADING_TRUE,
    });
    let token = localStorage.getItem("token");
    const res = await axios.get(
      `https://survey-api-m9x0.onrender.com/survey/data/${UUID}?wuuid=${wuuid}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({
      type: workerAndSurvey.GET_WORKER_DATA_SUCCESS,
      payload: { data: res.data },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: workerAndSurvey.GET_WORKER_DATA_ERROR,
      payload: { data: error },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  }
};

export const postWorkerDataAction = (data) => async (dispatch) => {
  try {
    dispatch({
      type: SET_LOADING_TRUE,
    });
    let token = localStorage.getItem("token");
    const res = await axios.post(
      `https://survey-api-m9x0.onrender.com/survey/submission/`,
      data,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({
      type: workerAndSurvey.POST_WORKER_DATA_SUCCESS,
      payload: { data: res.data },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: workerAndSurvey.POST_WORKER_DATA_ERROR,
      payload: { data: error },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  }
};

export const fetchAverageWorkerData = () => async (dispatch) => {
  try {
    let reporting_person_id = localStorage.getItem("id");
    dispatch({
      type: SET_LOADING_TRUE,
    });
    let token = localStorage.getItem("token");
    const res = await axios.get(
      `https://survey-api-m9x0.onrender.com/survey/getworkerSurveyAverage?reporting_person_id=${reporting_person_id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({
      type: FECTH_AVERAGE_WORKER_DATA_SUCCESS,
      payload: { averageData: res.data.averageData },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: FECTH_AVERAGE_WORKER_DATA_ERROR,
      payload: { averageData: error },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  }
};

export const fetchAverageWorkerDataMain = () => async (dispatch) => {
  try {
    let reporting_person_id = localStorage.getItem("id");
    dispatch({
      type: SET_LOADING_TRUE,
    });
    let token = localStorage.getItem("token");
    const res = await axios.get(
      `https://survey-api-m9x0.onrender.com/survey/getworkerSurveyAverageFromMain?reporting_person_id=${reporting_person_id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    dispatch({
      type: FECTH_AVERAGE_WORKER_FROM_MAIN_DATA_SUCCESS,
      payload: { averageData: res.data.averageData },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: FECTH_AVERAGE_WORKER_FROM_MAIN_DATA_ERROR,
      payload: { averageData: error },
    });
    setTimeout(() => {
      dispatch({
        type: SET_LOADING_FALSE,
      });
    }, 1000);
  }
};
