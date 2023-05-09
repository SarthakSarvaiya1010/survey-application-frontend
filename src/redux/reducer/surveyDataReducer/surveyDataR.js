import { workerAndSurvey } from "../../actionType/actionType";

export const getSurveyDataReducer = (state = {}, action) => {
  switch (action.type) {
    case workerAndSurvey.GET_SURVEY_DATA_REQUEST:
      return { ...action.payload };
    case workerAndSurvey.GET_SURVEY_DATA_SUCCESS:
      return { ...action.payload };
    case workerAndSurvey.GET_SURVEY_DATA_ERROR:
      return { ...action.payload };
    default:
      return state;
  }
};

export const fetchSurveyDataReducer = (state = [], action) => {
  switch (action.type) {
    case workerAndSurvey.FETCH_SURVEY_DATA_REQUEST:
      return { ...action.payload };
    case workerAndSurvey.FETCH_SURVEY_DATA_SUCCESS:
      return { ...action.payload };
    case workerAndSurvey.FETCH_SURVEY_DATA_ERROR:
      return { ...action.payload };
    default:
      return state;
  }
};

export const postSurveyDataReducer = (state = {}, action) => {
  switch (action.type) {
    case workerAndSurvey.POST_SURVEY_DATA_REQUEST:
      return { ...action.payload };
    case workerAndSurvey.POST_SURVEY_DATA_SUCCESS:
      return { ...action.payload };
    case workerAndSurvey.POST_SURVEY_DATA_ERROR:
      return { ...action.payload };
    default:
      return state;
  }
};