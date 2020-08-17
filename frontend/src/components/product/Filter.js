import React, { useState } from 'react';
import './filter.css';

const state = {
  available:false,
  unavailable:false,
  Transport:false,
  Electronics:false,
  Furniture:false,
  Entertainment:false,
  Fitness:false,
  Sports:false,
}

class CheckBoxes extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      available:false,
      unavailable:false,
      Transport:false,
      Electronics:false,
      Furniture:false,
      Entertainment:false,
      Fitness:false,
      Sports:false,
    }
  }

  onCheckboxChange(e){
    const option = e.target.name;
    this.setState({
      [option]:!this.state[option]
    })
  }

  resetState(){
    this.setState({
      ...state
    });
    this.props.toggleShowing();
    this.props.applyFilters(state);
  }

  render(){ 
    return (
      <div className='checkboxes'>
        { Object.keys(this.state).map(option=>(
          <label key={option}><input type='checkbox' name={option} checked={this.state[option]} onChange={e=>this.onCheckboxChange(e)} />{option}</label> 
        ))}
        <button onClick={()=>this.resetState()} >Reset</button>
        <button onClick={()=>this.props.applyFilters(this.state)} >Apply Filters</button>
      </div>
    )
  }
}

const Filter = ({applyFilters}) => {
  const [isShowing,setShowing] = useState(false);
  return (
    <div className='filters'>
      <button className='filterButton' onClick={()=>{ setShowing(!isShowing); applyFilters(state)}}>Filters &nbsp;{isShowing?<span className="arrow up"></span>:<span className="arrow down"></span>}</button>
      {
        isShowing ? <CheckBoxes applyFilters={applyFilters} toggleShowing = {()=>setShowing(!isShowing)} /> : ""
      }
    </div>
  )
}

export default Filter;