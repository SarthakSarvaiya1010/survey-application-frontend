import {userDataApi} from "../../actionType/actionType";

export const deleteDataAction = (data)=>{
return {
        type : userDataApi.DELETE_USER_DATA,
        payload : data
}
}