import { combineReducers } from "redux";
import { counterReducer } from "./counterReducer";
import { userReducer } from "./userReducer";


 export const rootReducer = combineReducers({
    counter:counterReducer,
    user:userReducer
})