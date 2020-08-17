import React from 'react';
import { connect } from 'react-redux';
import { fetchProducts, deleteProduct } from '../../store/actions/actionCreators'
import ProductList from './ProductList';
import SortByPrice from './SortByPrice';
import SearchByName from './SearchByName';
import Filter from './Filter';
import { Link } from 'react-router-dom';
import './product.css';

class Products extends React.Component{

  constructor(props){
    super(props);
    this.state={
      products:props.products,
    }
    this.filterByName = this.filterByName.bind(this);
    this.applyFilters = this.applyFilters.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  onSortChange(e){
    const sortOrder = e.target.value;
    let sortedProducts = this.state.products.sort((a,b)=>a.price-b.price);
    if(sortOrder === 'highToLow')
      sortedProducts = sortedProducts.reverse();
    if(sortOrder === 'default')
    return;
    this.setState({
      products:sortedProducts
    });
  }

  applyFilters(options){
    const keys = Object.keys(options).filter(option=>options[option]);
    let filteredProducts = this.props.products;
    if(keys.includes('available')){
      filteredProducts = filteredProducts.filter(product=>product.availability)
    }
    if(keys.includes('unavailable')){
      filteredProducts = filteredProducts.filter(product=>!product.availability)
    }
    keys.forEach(key=>{
      switch(key){
        case 'available':
          break;
        case 'unavailable':
          break;
        default:
          filteredProducts = filteredProducts.filter(product=>product.category.includes(key))
      }
    })
    this.setState({
      products:filteredProducts
    })
  }

  componentDidMount(){
    this.props.fetchProducts();
  }

  componentDidUpdate(prevProps){
    if(this.props.products.length !== prevProps.products.length){
      this.setState({
        products: this.props.products
      })
    }
  }

  filterByName(name){
    let products = this.props.products.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
    this.setState({
      products
    })
  }

  deleteProduct(productId){
    const del = window.confirm(`Are you sure you want to delete the product with id ${productId}`);
    if(!del){
      return;
    }
    this.props.deleteProduct(productId);
  }

  render(){
    const { products } = this.state;
    return (
      <>
        <div className='firstLine'>
          <SortByPrice onSortChange={(e)=>this.onSortChange(e)} />
          <SearchByName filterByName = {this.filterByName} />
          <Link to='/addproduct' >Add Product</Link>
        </div>
        <Filter applyFilters={this.applyFilters} />
        <ProductList deleteProduct = {this.deleteProduct} products = {products} />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    deleteProduct: productId => dispatch(deleteProduct(productId))
  } 
}

export default connect(mapStateToProps,mapDispatchToProps)(Products);