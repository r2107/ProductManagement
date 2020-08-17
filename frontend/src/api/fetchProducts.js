const fetchProducts = async () => {
  const token = localStorage.getItem('auth-token');
  const data = await fetch('/users/productList/fetch',{
    headers:{
      'Authorization':token
    }
  });
  const json = await data.json();
  if(json.error)
  return [];
  return json;
}

export default fetchProducts;