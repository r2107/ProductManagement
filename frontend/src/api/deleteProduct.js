const deleteProductAsync = async (productId) => {
  const token = localStorage.getItem('auth-token');
  await fetch(`/users/productList/deleteProduct/${productId}`,{
    method:'DELETE',
    headers:{
      'Authorization':token
    }
  })
}

export default deleteProductAsync;