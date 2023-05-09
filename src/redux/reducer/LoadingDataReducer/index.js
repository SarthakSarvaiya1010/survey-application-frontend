import {
  SET_LOADING_TRUE,
  SET_LOADING_FALSE,
} from "../../actionType/actionType";

export const initialState = {
  isLoading: false,
};

function LoadingDataReducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_TRUE: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case SET_LOADING_FALSE: {
      return {
        ...state,
        isLoading: false,
      };
    }
    default:
      return state;
  }
}

export default LoadingDataReducer;
