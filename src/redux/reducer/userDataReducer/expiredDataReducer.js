import { EXPIRED_SUCCESS,EXPIRED_ERROR } from "../../actionType/actionType";

const initialstate = {
  toggle: false,
  expired: [],
  error: false,
};
export const expiredDataReducer = (state = initialstate, action) => {
  switch (action.type) {
    case EXPIRED_SUCCESS:
      return {
        ...state,
        expired: action.payload.data,
      };
    case EXPIRED_ERROR:
        const newState = {
            ...state,
            expired:action.payload.data
          };
          localStorage.setItem('isExpired',true)
          return newState;
    
    default:
      return state;
  }
};