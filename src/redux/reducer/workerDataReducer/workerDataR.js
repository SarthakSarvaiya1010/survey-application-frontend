import { FECTH_AVERAGE_WORKER_DATA_ERROR, FECTH_AVERAGE_WORKER_DATA_REQUEST, FECTH_AVERAGE_WORKER_DATA_SUCCESS, FECTH_AVERAGE_WORKER_FROM_MAIN_DATA_ERROR, FECTH_AVERAGE_WORKER_FROM_MAIN_DATA_REQUEST, FECTH_AVERAGE_WORKER_FROM_MAIN_DATA_SUCCESS, workerAndSurvey } from "../../actionType/actionType";

export const getWorkerDataReducer = (state = {}, action) => {
  switch (action.type) {
    case workerAndSurvey.GET_WORKER_DATA_REQUEST:
      return { ...action.payload };
    case workerAndSurvey.GET_WORKER_DATA_SUCCESS:
      return { ...action.payload };
    case workerAndSurvey.GET_WORKER_DATA_ERROR:
      return { ...action.payload };
    default:
      return state;
  }
};

export const fetchWorkerDataReducer = (state = [], action) => {
  switch (action.type) {
    case workerAndSurvey.FETCH_WORKER_DATA_REQUEST:
      return { ...action.payload };
    case workerAndSurvey.FETCH_WORKER_DATA_SUCCESS:
      return { ...action.payload };
    case workerAndSurvey.FETCH_WORKER_DATA_ERROR:
      return { ...action.payload };
    default:
      return state;
  }
};

export const postWorkerDataReducer = (state = {}, action) => {
  switch (action.type) {
    case workerAndSurvey.POST_WORKER_DATA_REQUEST:
      return { ...action.payload };
    case workerAndSurvey.POST_WORKER_DATA_SUCCESS:
      return { ...action.payload };
    case workerAndSurvey.POST_WORKER_DATA_ERROR:
      return { ...action.payload };
    default:
      return state;
  }
};

export const getAverageWorkerData = (state = {}, action) => {
  switch (action.type) {
    case FECTH_AVERAGE_WORKER_DATA_REQUEST:
      return { ...action.payload };
    case FECTH_AVERAGE_WORKER_DATA_SUCCESS:
      return { ...action.payload };
    case FECTH_AVERAGE_WORKER_DATA_ERROR:
      return { ...action.payload };
    default:
      return state;
  }
};

export const getAverageWorkerDataMain = (state = {}, action) => {
  switch (action.type) {
    case FECTH_AVERAGE_WORKER_FROM_MAIN_DATA_REQUEST:
      return { ...action.payload };
    case FECTH_AVERAGE_WORKER_FROM_MAIN_DATA_SUCCESS:
      return { ...action.payload };
    case FECTH_AVERAGE_WORKER_FROM_MAIN_DATA_ERROR:
      return { ...action.payload };
    default:
      return state;
  }
};