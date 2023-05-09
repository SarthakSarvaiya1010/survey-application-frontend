import { RESET_PASSWORD_ERROR,RESET_PASSWORD_REQUEST,RESET_PASSWORD_SUCCESS } from "../../actionType/actionType";

const initialstate = {
  toggle: false,
  resetdata: [],
  error: false,
};
export const resetPasswordReducer = (state = initialstate, action) => {
  switch (action.type) {
    case RESET_PASSWORD_REQUEST:
      return {
        ...action.payload
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetdata: action.payload.data,
      };
    case RESET_PASSWORD_ERROR:
      const newState = {
        ...state,
        ...action.payload.data
      };
      localStorage.setItem('isExpired',true)
      return newState;
    default:
      return state;
  }
};