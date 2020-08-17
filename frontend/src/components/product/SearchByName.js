import React from 'react';

class SearchByName extends React.Component{
  constructor(props){
    super(props);
    this.state={
      name:''
    }
  }

  handleNameChange(e){
    const name = e.target.value;
    this.setState({
      name
    });
    this.props.filterByName(name);
  }

  render(){
    return (
      <input value={this.state.name} onChange={(e) => this.handleNameChange(e)} placeholder='Name of Product' id='searchByName' name='searchByName' />
    )
  }
}

export default SearchByName;