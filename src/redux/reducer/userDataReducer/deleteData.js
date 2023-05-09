import {userDataApi} from "../../actionType/actionType";

export const deleteData = (state = {}, action) => {
  switch (action.type) {
    case userDataApi.DELETE_USER_DATA:
      return { ...action.payload };
    default:
      return state;
  }
};
