import * as ActionTypes from '../actions/actionTypes';
import fetch from 'cross-fetch';
import { loginUser } from '../actions/actionCreators';

export function loginUserAsync(userDetails){
  return function(dispatch){
    return fetch('/login',{
      method:'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({email:userDetails.email,password:userDetails.password})
    })
    .then(response => response.json())
    .then(json => dispatch(loginUser(json)))
  }
}

export function user(state={},action){
  switch(action.type){
    case ActionTypes.LOGIN_USER:
      return { ...state, token:action.payload.token, user:action.payload.user }
    default:
      return state;
  }
}