import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CrossIcon, LogoutIcon } from "../../icons";
import { logout } from "../../store/reducers/globalReducer";

const Sidebar = ({ openSidebar, setOpenSidebar }) => {
  const dispatch = useDispatch();
  const userLogout = () => {
    dispatch(logout("userToken"));
  };
  useEffect(() => {
    document.addEventListener("click", () => {
      setOpenSidebar(false);
    });
  }, []);

  return (
    <div
      className={`sidebar-s fixed rel anim ${openSidebar ? "show" : "hide"}`}
    >
      <div
        className={`side-block flex col anim ${openSidebar ? "show" : "hide"}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="hdr flex items-center">
          <div
            className="icon-close flex aic jc"
            onClick={(e) => {
              setOpenSidebar(false);
            }}
          >
            <CrossIcon />
          </div>
        </div>
        <div>
          <div className="items flex aic flex-col">
            <div
              className={`item flex items-center`}
              onClick={(e) => {
                setOpenSidebar(false);
              }}
            >
              <div
                className="profile-image"
                style={{ backgroundImage: `url("/images/user.png")` }}
              />
              <div className="m-lbl">Harry Jonson</div>
            </div>
            <Link
              to="/dashboard/home"
              className={`item flex items-center`}
              onClick={(e) => {
                setOpenSidebar(false);
              }}
            >
              <div className="m-lbl">Dashboard</div>
            </Link>
            <Link
              to="/dashboard/profile"
              className={`item flex items-center`}
              onClick={(e) => {
                setOpenSidebar(false);
              }}
            >
              <div className="m-lbl">Profile</div>
            </Link>
            <Link
              to="/dashboard/products"
              className={`item flex items-center`}
              onClick={(e) => {
                setOpenSidebar(false);
              }}
            >
              <div className="m-lbl">Products</div>
            </Link>
            <div
              className={`item flex items-center`}
              onClick={(e) => {
                setOpenSidebar(false);
                userLogout();
              }}
            >
              <div className="p-icon flex items-center justify-center">
                <LogoutIcon />
              </div>
              <div className="m-lbl">Logout</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
