import { combineReducers } from "redux";
import {
  loginUserReducer,
  logoutUserReducer,
  signInUserReducer,
} from "../reducer/loginReducer/loginR";
import {
  getSurveyDataReducer,
  postSurveyDataReducer,
  fetchSurveyDataReducer,
} from "../reducer/surveyDataReducer/surveyDataR";
import { fetchWorkerDataReducer, getAverageWorkerData, getAverageWorkerDataMain } from "../reducer/workerDataReducer/workerDataR";
import { fetchUserReducer } from "../reducer/userDataReducer/fetchUserR";
import { putUserEditDataR } from "../reducer/userDataReducer/postEditDataR";
import { deleteUserData } from "../reducer/userDataReducer/deleteUserR";
import { editDataR } from "../reducer/userDataReducer/editDataR";
import LoadingDataReducer from "../reducer/LoadingDataReducer";
import { deleteData } from "../reducer/userDataReducer/deleteData";
import { forgetPasswordReducer } from "../reducer/userDataReducer/forgetPasswordReducer";
import { resetPasswordReducer } from "../reducer/userDataReducer/resetPasswordReducer";
import { expiredDataReducer } from "../reducer/userDataReducer/expiredDataReducer";

const RootReducers = combineReducers({
  //logIn and SignIn
  loginUserReducer: loginUserReducer,
  signInUserReducer: signInUserReducer,
  fetchUserReducer: fetchUserReducer,
logOutUserReducer:logoutUserReducer,
  //survey
  getSurveyDataReducer: getSurveyDataReducer,
  postSurveyDataReducer: postSurveyDataReducer,
  fetchSurveyDataReducer: fetchSurveyDataReducer,

  //worker
  fetchWorkerDataReducer: fetchWorkerDataReducer,
  getAverageWorkerData:getAverageWorkerData,
  getAverageWorkerDataMain:getAverageWorkerDataMain,

  // user
  putUserEditDataR: putUserEditDataR,
  deleteUserById: deleteUserData,
  editDataR: editDataR,
  loader:LoadingDataReducer,
  deleteData:deleteData,
  forgetpassword:forgetPasswordReducer,
  resetpassword:resetPasswordReducer,
  expiredLink:expiredDataReducer
});
export default RootReducers;
