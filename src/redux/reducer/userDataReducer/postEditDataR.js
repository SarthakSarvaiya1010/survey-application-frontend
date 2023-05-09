import {userDataApi} from "../../actionType/actionType";

export const putUserEditDataR = (state = {}, action) => {
  switch (action.type) {
    case userDataApi.POST_USER_EDIT_DATA_REQUEST:
      return { ...action.payload };
    case userDataApi.POST_USER_EDIT_DATA_SUCCESS:
      return { ...action.payload };
    case userDataApi.POST_USER_EDIT_DATA_ERROR:
      return { ...action.payload };
    default:
      return state;
  }
};
