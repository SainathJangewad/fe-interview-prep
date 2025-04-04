import { FETCH_USER_FAILURE, FETCH_USER_REQUEST, FETCH_USER_SUCCESS } from "../actions/userActions";
import { UserState } from "../types";

const initialState:UserState={data:null,loading:false,error:''};


export const userReducer = (state:UserState=initialState,action:any)=>{
    switch(action.type){
        case FETCH_USER_REQUEST:
            return {...state,loading:true};

        case  FETCH_USER_SUCCESS:
            return {...state,loading:false,data:action.payload};
       
        case FETCH_USER_FAILURE:
            return {...state,loading:false,error:action.payload};

        default:
            return state;
    }
}