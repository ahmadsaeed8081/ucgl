import React, { useState } from "react";

import { ArrowBackIcon } from "../../icons";

const LoginPackages = ({
  setOpenLoginPackages,
  memeberType,
  setOpenUserType,
  setchoosed_package,
  handleRegisteration
}) => {
  const [activeTab, setActiveTab] = useState("Basic");
  const TabsList = [
    { lbl: "Basic" },
    { lbl: "Premium" },
    { lbl: "Premium Plus" }                                     ,
  ];




  
  return (
    <div className="login-package-sec flex flex-col ">
      <div className="page-hdr flex items-center w-full justify-center">
        <div className="back-icon flex items-start justify-center">
          <div
            className="icon flex items-center justify-center cursor-pointer"
            onClick={(e) => {
              setOpenLoginPackages(false);
              setOpenUserType(true);
            }}
          >
            <ArrowBackIcon />
          </div>
        </div>
        <div className="sec-tag flex-1 items-center justify-center text-center">
          CHOOSE YOUR <span className="text-themeColor">PLAN </span> TO{" "}
          <span className="text-themeColor">REGISTER</span>
        </div>
      </div>
      {/* <div className="tabs flex items-center">
        {TabsList.map((item, index) => (
          <div
            key={index}
            className={`tab-item flex items-center justify-center ${
              activeTab === item.lbl ? "active" : ""
            }`}
            onClick={(e) => setActiveTab(item.lbl)}
          >
            <div className="lbl">{item.lbl}</div>
          </div>
        ))}
      </div> */}
      <div className="package_grid" id="packageslist">
        {/* {activeTab === "Basic" ? ( */}
          <>
            <div className="pack-box flex flex-col">
              <div className="pack-name">Associate</div>
              <div className="pack-center flex items-center justify-center">
                <div className="amount">$100</div>
              </div>
              <button className="btn-buy button" 
              
              onClick={(e) => {

                          handleRegisteration(0);
                          setOpenLoginPackages(false);

                         }}>Buy Now</button>
            </div>
            <div className="pack-box flex flex-col">
              <div className="pack-name">Basic</div>
              <div className="pack-center flex items-center justify-center">
                <div className="amount">$500</div>
              </div>
              <button className="btn-buy button" 
              
              onClick={(e) => {
                
                          handleRegisteration(1);
                          setOpenLoginPackages(false);

                         }}>Buy Now</button>
            </div>
            <div className="pack-box flex flex-col">
              <div className="pack-name">Bronze</div>
              <div className="pack-center flex items-center justify-center">
                <div className="amount">$1000</div>
              </div>
              <button className="btn-buy button" 
              
              onClick={(e) => {
                
                          handleRegisteration(2);
                          setOpenLoginPackages(false);

                         }}>Buy Now</button>
            </div>
          </>
        {/* // ) : activeTab === "Premium" ? ( */}
          <>
            <div className="pack-box flex flex-col">
              <div className="pack-name">Silver</div>
              <div className="pack-center flex items-center justify-center">
                <div className="amount">$3000</div>
              </div>
              <button className="btn-buy button" 
              
              onClick={(e) => {
                
                          handleRegisteration(3);
                          setOpenLoginPackages(false);

                         }}>Buy Now</button>
            </div>

            <div className="pack-box flex flex-col">
              <div className="pack-name">Gold</div>
              <div className="pack-center flex items-center justify-center">
                <div className="amount">$5000</div>
              </div>
              <button className="btn-buy button" 
              
              onClick={(e) => {
                
                          handleRegisteration(4);
                          setOpenLoginPackages(false);

                         }}>Buy Now</button>
            </div>

            <div className="pack-box flex flex-col">
              <div className="pack-name">Platinum</div>
              <div className="pack-center flex items-center justify-center">
                <div className="amount">$10000</div>
              </div>
              <button className="btn-buy button" 
              
              onClick={(e) => {
                
                          handleRegisteration(5);
                          setOpenLoginPackages(false);

                         }}>Buy Now</button>
            </div>
          </>
        {/* // ) : activeTab === "Premium Plus" ? ( */}
          <>
            <div className="pack-box flex flex-col">
              <div className="pack-name">Platinum+</div>
              <div className="pack-center flex items-center justify-center">
                <div className="amount">$20000</div>
              </div>
              <button className="btn-buy button" 
              
              onClick={(e) => {
                
                          handleRegisteration(6);
                          setOpenLoginPackages(false);

                         }}>Buy Now</button>
            </div>

            <div className="pack-box flex flex-col">
              <div className="pack-name">Business</div>
              <div className="pack-center flex items-center justify-center">
                <div className="amount">$50000</div>
              </div>
              <button className="btn-buy button" 
              
              onClick={(e) => {
                
                          handleRegisteration(7);
                          setOpenLoginPackages(false);

                         }}>Buy Now</button>
            </div>

            <div className="pack-box flex flex-col">
              <div className="pack-name">Business+</div>
              <div className="pack-center flex items-center justify-center">
                <div className="amount">$75000</div>
              </div>
              <button className="btn-buy button" 
              
              onClick={(e) => {
                
                          handleRegisteration(8);
                          setOpenLoginPackages(false);

                         }}>Buy Now</button>
            </div>

            <div className="pack-box flex flex-col">
              <div className="pack-name">Professional</div>
              <div className="pack-center flex items-center justify-center">
                <div className="amount">$100000</div>
              </div>
              <button className="btn-buy button" 
              
              onClick={(e) => {
                
                          handleRegisteration(9);
                          setOpenLoginPackages(false);

                         }}>Buy Now</button>
            </div>
          </>
        {/* // ) : null} */}
      </div>
    </div>
  );
};

export default LoginPackages;
