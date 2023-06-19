import React, { useState, useEffect } from "react";

const UserType = ({
  setOpenUserType,
  setMemeberType,
  setOpenLoginPackages,
}) => {
  const [selectedUserType, setSelectedUserType] = useState("");
  const typesList = [
    { lbl: "Left", value: "1" },
    { lbl: "Right", value: "2" },
  ];
  return (
    <div className="user-type-comp flex flex-col ">
      <div className="page-hdr flex items-center w-full justify-center">
        <div className="sec-tag">
          choose the member you{" "}
          <span className="text-themeColor">want to be</span>
        </div>
      </div>
      <div className="options-sec flex w-full">
        {typesList?.map((item, index) => (
          <button
            key={index}
            className="row flex items-center cleanbtn"
            onClick={(e) => {
              setSelectedUserType(item.value);
              setMemeberType(item.value);
              setOpenLoginPackages(true);
              setOpenUserType(false);
            }}
          >
            <div className="type flex items-center">
              <button
                className={`cleanbtn radio-btn relative ${
                  selectedUserType == item.value ? "on" : ""
                }`}
              />
              <div className="lbl">{item.lbl}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default UserType;
