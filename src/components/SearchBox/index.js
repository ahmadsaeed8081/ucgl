import React from "react";
import { SearchIcon } from "../../icons";
const SearchBox = () => {
  return (
    <div className="search-box flex items-center">
      <input type="text" placeholder="Search" className="txt cleanbtn w-full" />
      <div className="icon flex items-center justify-center">
        <SearchIcon />
      </div>
    </div>
  );
};

export default SearchBox;
