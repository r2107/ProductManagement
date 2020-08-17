import * as ActionTypes from './actionTypes';

export function loginUser(json){
  return {
    type:ActionTypes.LOGIN_USER,
    payload: {
      token:json.token,
      user:json.user
    }
  }
}

export function fetchProducts(){
  return {
    type:ActionTypes.FETCH_PRODUCTS
  }
}

export function setProducts(products){
  return {
    type:ActionTypes.FETCH_DONE,
    products
  }
}

export function deleteProduct(productId){
  return {
    type:ActionTypes.DELETE_PRODUCT,
    productId,
  }
}
