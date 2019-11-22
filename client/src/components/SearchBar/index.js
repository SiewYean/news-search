import React from "react";

function SearchBar(props){
        return (
          <div className="form-group">
            <input className="form-control" {...props} />
          </div>
    );
}

export default SearchBar;