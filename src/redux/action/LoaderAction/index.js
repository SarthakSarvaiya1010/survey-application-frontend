import { SET_LOADING_TRUE,SET_LOADING_FALSE } from "../../actionType/actionType";


export const setLoader = (payload) => async (dispatch) => {
    if(payload){
        dispatch({
            type:SET_LOADING_TRUE,
        });
    }
    else{
        dispatch({
            type:SET_LOADING_FALSE,
        });
    }
}