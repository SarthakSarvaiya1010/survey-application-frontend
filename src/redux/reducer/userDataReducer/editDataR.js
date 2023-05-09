import {userDataApi} from "../../actionType/actionType";

export const editDataR = (state = {}, action) => {
  switch (action.type) {
    case userDataApi.Edit_USER_DATA:
      return { ...action.payload };
    default:
      return state;
  }
};
