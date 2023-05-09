import {userDataApi} from "../../actionType/actionType";

export const editData = (data)=>{
return {
        type : userDataApi.Edit_USER_DATA,
        payload : data
}
}