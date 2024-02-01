import React from 'react'

const SearchBar = ({setSearch,handleSearch}) => {
  return (
        <div className="input-group mb-1 w-95 mx-auto">
            <input type="search" className="form-control" placeholder="Type location" aria-label="Type location"
            aria-describedby="basic-addon2" onChange={(e)=>setSearch(e.target.value)}/>
            <button type="submit" className="input-group-text" id="basic-addon2" onClick={handleSearch}>
            <i className='fas fa-search'></i>
            </button>
        </div>
  )
}

export default SearchBar