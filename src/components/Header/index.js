import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MenuIcon, SearchIcon, LogoutIcon } from "../../icons";
import SearchModal from "../SearchModal";
import { logout } from "../../store/reducers/globalReducer";
import SearchBox from "../../components/SearchBox";
import MobileViewSearch from "../../components/SearchBox/MobileViewSearch";

const Header = ({ openSidebar, setOpenSidebar }) => {
  const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = useState(false);
  const [openSearchModel, setOpenSearchModel] = useState(false);
  const userLogout = () => {
    dispatch(logout("userToken"));
  };

  useEffect(() => {
    document.addEventListener("click", () => {
      setShowDropDown(false);
    });
  }, []);
  return (
    <div className="header-camp flex">
      <div className="wrapWidth wrap flex items-center">
        <div className="left flex items-center">
          <img src="/images/logo.png" className="logo-img" />
          <div className="menu-list flex items-center">
            <NavLink
              to="/dashboard/home"
              className="menu-item flex items-center justify-center"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/dashboard/products"
              className="menu-item flex items-center justify-center"
            >
              Products
            </NavLink>
          </div>
        </div>
        <div className="right flex items-center justify-end">
          <div className="desktop-search-box flex mx-3">
            <SearchBox />
          </div>
          <div className="user-info flex items-center">
            <div
              className="profile-image"
              style={{ backgroundImage: `url("/images/user.png")` }}
            />
            <div
              className="dropdown-block flex"
              onClick={(e) => {
                e.stopPropagation();
                setShowDropDown(!showDropDown);
              }}
            >
              <div className="user-name">Harry Jonson</div>
            </div>
            {/* Menue show when Click on user Profile */}
            <div
              className={`manueProfile flex col ${
                showDropDown ? "show" : "hide"
              }`}
            >
              <div className="p_menu_item flex items-center">
                <div
                  className="profile-image"
                  style={{ backgroundImage: `url("/images/user.png")` }}
                />
                <div className="m-lbl">Harry Jonson</div>
              </div>
              <NavLink
                to="/dashboard/profile"
                className="p_menu_item flex items-center"
              >
                <div className="m-lbl">Profile</div>
              </NavLink>
              <div
                className="p_menu_item flex items-center"
                onClick={userLogout}
              >
                <div className="p-icon flex items-center justify-center">
                  <LogoutIcon />
                </div>
                <div className="m-lbl">Logout</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mobile-view flex items-center justify-between">
          <div
            className="menu-icon flex items-center justify-center"
            onClick={(e) => {
              e.stopPropagation();
              setOpenSidebar(true);
            }}
          >
            <MenuIcon />
          </div>
          <div className="logo">
            <img src="/images/logo.png" className="logo-img" />
          </div>
          <div
            className="search-icon flex items-center justify-center"
            onClick={(e) => setOpenSearchModel(true)}
          >
            <SearchIcon />
          </div>
        </div>
      </div>
      <SearchModal
        open={openSearchModel}
        onClose={() => setOpenSearchModel(false)}
      >
        <MobileViewSearch setOpenSearchModel={setOpenSearchModel} />
      </SearchModal>
    </div>
  );
};

export default Header;
