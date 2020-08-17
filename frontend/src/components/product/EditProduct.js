import React from 'react';
import { connect } from 'react-redux';

class EditProduct extends React.Component{
  constructor(props){
    super(props);
    console.log(props);
    this.state= {
      product:props.products.length===0?undefined:props.products.find(product => product.productId === props.match.params.id),
      editing:false
    }
  }

  componentDidUpdate(prevState){
    if(prevState.products.length === 0 && this.props.products !== {}){
      this.setState({
        product : this.props.products.find(product => product.productId === this.props.match.params.id)
      })
    }
  }

  categories = [
    'Transport',
    'Electronics',
    'Furniture',
    'Entertainment',
    'Fitness',
    'Sports'
  ];

  handleChange(e){
    const name = e.target.name;
    let value = e.target.value;
    if(e.target.type === 'number'){
      value = parseInt(value);
    }
    const product = this.state.product;
    product[name]=value;
    this.setState({
      product:product
    });
  }

  async handleSubmit(e){
    e.preventDefault();
    this.setState({
      editing:true
    })
    const form = document.forms['editProduct'];
    const product = this.state.product;
    const categories = [];
    this.categories.forEach(category=>{
      if(form[category].checked){
        categories.push(category);
      }
    });
    product.category = categories;
    product.availability = form.availability.value==='available'?true:false;
    this.setState({
      editing:false
    })
    await fetch('/users/productList/updateProduct',{
      method:'put',
      headers:{
        'Content-Type':'application/json',
        'Authorization':localStorage.getItem('auth-token')
      },
      body:JSON.stringify(product)
    })
    this.props.history.push('/products');
  }

  render(){
    return (
      <form className='productForm' name='editProduct' onSubmit={e=>this.handleSubmit(e)}>
        <h2>Edit Product</h2>
        <label htmlFor='name'>Name</label><br/>
        <input required onChange={e=>this.handleChange(e)} type='text' value={this.state.product?this.state.product.name:''} name='name' id='name'/>
        <br />

        <label>Categories</label>
        <br />
        { this.categories.map(category => (
          <label style={{fontWeight:'normal'}} key={category}>
            {
              this.state.product?
              this.state.product.category.includes(category)?
              <input type='checkbox' name={category} defaultChecked id={category} value={category}/>:
              <input type='checkbox' name={category} id={category} value={category}/>:
              <input type='checkbox' name={category} id={category} value={category} />
            }
            {category}
          </label>
        ))}

        <br/><br/>

        <label htmlFor='availability'>Availability</label> <br/>
        {
          this.state.product?
          this.state.product.availability?
          <><label style={{fontWeight:'normal'}} ><input type='radio' name='availability' value='available' defaultChecked /> Available</label> <br/>
          <label style={{fontWeight:'normal'}} ><input type='radio' name='availability' value='unavailable' /> Unavailable</label> <br/></>:
          <><label style={{fontWeight:'normal'}} ><input type='radio' name='availability' value='available' /> Available</label> <br/>
          <label style={{fontWeight:'normal'}} ><input type='radio' name='availability' value='unavailable' defaultChecked /> Unavailable</label> <br/></>:
          <><label style={{fontWeight:'normal'}} ><input type='radio' name='availability' value='available' /> Available</label> <br/>
          <label style={{fontWeight:'normal'}} ><input type='radio' name='availability' value='unavailable' defaultChecked /> Unavailable </label><br/></>
        }
        <br/>
        <label>Price</label><br/>
        <input required type='number' onChange={e=>this.handleChange(e)} value={this.state.product?this.state.product.price:0} step='any' min={0} name='price'/> <br/>

        <label>Quantity</label><br/>
        <input required type='number' onChange={e=>this.handleChange(e)} value={this.state.product?this.state.product.quantity:0} min={0} name='quantity'/> <br/>
        {
          this.state.editing?
          <button type='submit' disabled>Save Product</button>:
          <button type='submit'>Save Product</button>
        }
      </form>
    )
  }
}

const mapStateToProps = state => ({
  products: state.products
})

export default connect(mapStateToProps,null)(EditProduct);