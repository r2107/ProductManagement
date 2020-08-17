import React from 'react';
import { Link } from 'react-router-dom';
import './productList.css';

const ProductList = ({ products,deleteProduct }) => {
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Available</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Categories</th>
          <th>Update</th>
        </tr>
      </thead>
      <tbody>
        {
          products.map(product=>(
            <tr key={product.productId}>
              <td className='id'>{ product.productId }</td>
              <td>{ product.name }</td>
              <td className='center'>{ product.availability?"YES":"NO" }</td>
              <td>{ product.quantity }</td>
              <td>{ product.price }</td>
              <td>{ product.category.reduce((acc,catg)=>acc+catg+' ',"") }</td>
              <td> 
                <Link style={{color:'#44a',fontWeight:550}} to={`/${product.productId}`} >Edit</Link>
                {' | '}
                <span style={{color:'red',fontWeight:550,cursor:"pointer"}} onClick={()=>deleteProduct(product.productId)}>Delete</span>
              </td>
            </tr>
          ))
        }
      </tbody>
    </table>
  )
}

export default ProductList;