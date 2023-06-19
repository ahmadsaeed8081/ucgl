import React from "react";
import { CrossIcon } from "../../icons";
import SearchBox from "./index";
const MobileViewSearch = ({ setOpenSearchModel }) => {
  return (
    <div className="mobile-viewSearch flex items-center">
      <div
        className="cross-icon flex items-center justify-center cursor-pointer"
        onClick={(e) => setOpenSearchModel(false)}
      >
        <CrossIcon />
      </div>
      <SearchBox />
      <div></div>
    </div>
  );
};

export default MobileViewSearch;
