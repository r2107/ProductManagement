import React from 'react';
import './productForm.css';

class AddProduct extends React.Component{

  constructor(props){
    super(props);
    this.state={
      adding:false
    }
  }

  async handleSubmit(e){
    e.preventDefault();
    this.setState({adding:true});
    const product = {};
    const form = document.forms['newProduct'];
    product.name = form.name.value;
    const categories = [];
    this.categories.forEach(category=>{
      if(form[category].checked){
        categories.push(category);
      }
    });
    product.category = categories;
    product.availability = form.availability.value==='available'?true:false;
    product.price = parseFloat(form.price.value);
    product.quantity = parseInt(form.quantity.value);
    await fetch('/users/productList/createProduct',{
      method:'post',
      headers:{
        'Content-Type':'application/json',
        'Authorization':localStorage.getItem('auth-token')
      },
      body:JSON.stringify(product)
    });
    this.setState({
      adding:false,
    });
    this.props.history.push('/products');
  }

  categories = [
    'Transport',
    'Electronics',
    'Furniture',
    'Entertainment',
    'Fitness',
    'Sports'
  ];

  render(){
    return (
      <form className='productForm' name='newProduct' onSubmit={e=>this.handleSubmit(e)}>
        <h2>Add Product</h2>
        <label htmlFor='name'>Name</label><br/>
        <input required type='text' name='name' id='name'/>
        <br />

        <label>Categories</label>
        <br />
        { this.categories.map(category => (
          <label style={{fontWeight:'normal'}} key={category}><input type='checkbox' name={category} id={category} value={category}/>{category}</label>
        ))}

        <br/>
        <br/>

        <label htmlFor='availability'>Availability</label> <br/>
        <label style={{fontWeight:'normal'}}><input type='radio' name='availability' value='available' defaultChecked /> Available</label> <br/>
        <label style={{fontWeight:'normal'}}><input type='radio' name='availability' value='unavailable' /> Unavailable</label> <br/> <br/>

        <label>Price</label><br/>
        <input required type='number' step='any' min={0} name='price'/> <br/>

        <label>Quantity</label><br/>
        <input required type='number' min={0} name='quantity'/> <br/>
        {
          this.state.adding?
          <button type='submit' disabled>Add Product</button>:
          <button type='submit'>Add Product</button>
        }
      </form>
    )
  }
}

export default AddProduct;