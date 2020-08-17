import { ActionTypes } from './action';
import { combineReducers } from 'redux';

function selectedSubreddit(state= 'reactjs',action){
  switch(action.type){
    case ActionTypes.SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}

function posts(state={
  isFetching: false,
  didInvalidate: false,
  items: []
},action){
  switch(action.type){
    case ActionTypes.INVALIDATE_SUBREDDIT:
      return {
        ...state,
        didInvalidate:true
      };
    case ActionTypes.REQUEST_POSTS:
      return {
        ...state,
        isFetching:true,
        didInvalidate: false
      };
    case ActionTypes.RECIEVE_POSTS:
      return {
        ...state,
        isFetching:false,
        didInvalidate:false,
        items:action.posts,
        lastUpdated:action.recievedAt
      }
  }
}

function postsBySubreddit(state={}, action){
  switch(action.type){
    case ActionTypes.INVALIDATE_SUBREDDIT:
    case ActionTypes.RECIEVE_POSTS:
    case ActionTypes.REQUEST_POSTS:
      return {
        ...state,
        [action.subreddit]:posts(state[action.subreddit],action)
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  selectedSubreddit,
  postsBySubreddit
  });

export default rootReducer;