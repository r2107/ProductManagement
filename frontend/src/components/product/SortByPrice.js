import React from 'react';

const SortByPrice = ({ onSortChange }) => {
  return (
    <div>
      <span style={{fontSize:"1.3em"}}>Sort by Price: &nbsp;</span>
      <select onChange={onSortChange}>
        <option value='default'>Sort by Price</option>
        <option value='lowToHigh'>Low to High</option>
        <option value='highToLow'>High to Low</option>
      </select>
    </div>
  )
}

export default SortByPrice;