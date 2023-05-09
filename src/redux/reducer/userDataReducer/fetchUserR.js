import { userDataApi } from "../../actionType/actionType";

const instate = {
  toggle: false,
  data: [],
  error: false,
};
export const fetchUserReducer = (state = instate, action) => {
  switch (action.type) {
    case userDataApi.FETCH_USER_DATA_REQUEST:
      return {
        toggle: true,
      };
    case userDataApi.FETCH_USER_DATA_SUCCESS:
      return {
        ...state,
        data: action.payload.data,
      };
    case userDataApi.FETCH_USER_DATA_ERROR:
      return {
        ...state,
        error: true,
      };
    default:
      return state;
  }
};