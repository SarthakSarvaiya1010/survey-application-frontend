import { FORGET_PASSWORD_ERROR,FORGET_PASSWORD_REQUEST,FORGET_PASSWORD_SUCCESS } from "../../actionType/actionType";

const initialstate = {
  toggle: false,
  forgetdata: [],
  error: false,
};
export const forgetPasswordReducer = (state = initialstate, action) => {
  switch (action.type) {
    case FORGET_PASSWORD_REQUEST:
      return {
        ...action.payload
      };
    case FORGET_PASSWORD_SUCCESS:
      return {
        ...state,
        forgetdata: action.payload.data,
      };
    case FORGET_PASSWORD_ERROR:
      return { ...action.payload };
    default:
      return state;
  }
};