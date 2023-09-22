import React from 'react'
import "./searchBar.css"

const SearchBar = ({handleChange,handleSubmit}) => {
  return (
    <div className='search_box'>
        <form onChange={handleChange}>
            <input placeholder='Search' type="search"/>
            <button type="submit" onClick={handleSubmit}>
                Let's search
            </button>
        </form>
    </div>
  )
}

export default SearchBar