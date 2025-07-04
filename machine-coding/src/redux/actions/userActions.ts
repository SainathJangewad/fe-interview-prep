import { Dispatch } from "react";
import { UserState } from "../types";

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const fetchUserRequest = () => ({ type: FETCH_USER_REQUEST });
export const fetchUserSuccess = (user:UserState ) => ({ type: FETCH_USER_SUCCESS, payload: user });
export const fetchUserFailure = (error:any) => ({ type: FETCH_USER_FAILURE, payload: error });

export const fetchUser = () => {
  return async (dispatch:Dispatch) => {
    dispatch(fetchUserRequest());
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      const data = await response.json();
      dispatch(fetchUserSuccess(data));
    } catch (error:any) {
      dispatch(fetchUserFailure(error.message));
    }
  };
};
