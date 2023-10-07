import React from 'react'

const Search = () => {
  return (
    <div className="search-container">
      <input 
        type="text"
        className="form-control"
        placeholder="Search..."
        style={{ width: '100%', height: '40px', borderRadius: '0px', borderTop: 'black 1px solid'}}
        // Add an event handler here for search functionality
      />
      <div className="friend-container" >
        <div className="friend">
            <img
                src="src/images/avatar.png"
                alt="Avatar"
                style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }}
            />
            <span className="mr-2">Friend Name</span>
        </div>
      </div>
    </div>
  )
}

export default Search