import fetch from 'cross-fetch'

export const ActionTypes= {
  SELECT_SUBREDDIT: 'SELECT_SUBREDDIT',
  INVALIDATE_SUBREDDIT: 'INVALIDATE_SUBREDDIT',
  REQUEST_POSTS: 'REQUEST_POSTS',
  RECIEVE_POSTS: 'RECIEVE_POSTS'
}


export function selectSubreddit(subreddit){
  return {
    type:ActionTypes.SELECT_SUBREDDIT,
    subreddit
  }
}

export function invalidateSubreddit(subreddit){
  return {
    type: ActionTypes.INVALIDATE_SUBREDDIT,
    subreddit
  }
}


export function requestPosts(subreddit){
  return {
    type: ActionTypes.REQUEST_POSTS,
    subreddit
  }
}

export function recievePosts(subreddit, json){
  return {
    type:ActionTypes.RECIEVE_POSTS,
    subreddit,
    posts:json.data.children.map(child => child.data),
    recievedAt:Date.now()
  }
}

function fetchPosts(subreddit){
  return dispatch => {
    dispatch(requestPosts(subreddit));
    return fetch(`https://www.reddit.com/r/${subreddit}.json`)
      .then(response => response.json())
      .then(json => dispatch(recievePosts(subreddit,json)))
  }
}

function shouldFetchPosts(state,subreddit){
  const posts = state.postsBySubreddit[subreddit];
  if(!posts){
    return true;
  } else if( posts.isFetching) {
    return false;
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded(subreddit){
  return (dispatch, getState) => {
    if(shouldFetchPosts(getState(),subreddit)){
      return dispatch(fetchPosts(subreddit));
    }
    else{
      return Promise.resolve();
    }
  }
}