import { userDataApi } from "../../actionType/actionType";

export const deleteUserData = (state = {}, action) => {
  switch (action.type) {
    case userDataApi.POST_DELETE_DATA_REQUEST:
      return { ...action.payload };
    case userDataApi.POST_DELETE_DATA_SUCCESS:
      return { ...action.payload };
    case userDataApi.POST_DELETE_DATA_ERROR:
      return { ...action.payload };
    default:
      return state;
  }
};
