import * as ActionTypes from '../actions/actionTypes';

const products = (state=[],action) => {
  switch(action.type){
    case ActionTypes.FETCH_DONE:
      return [ ...action.products];
    case ActionTypes.DELETE_PRODUCT:
      return state.filter(product=>product.productId!==action.productId)
    default:
      return state;
  }
}

export { products };