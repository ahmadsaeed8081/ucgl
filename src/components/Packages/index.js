import React, { useState } from "react";

const Packages = ({
  handleRegisteration,
  curr_package
}) => {
  const [activeTab, setActiveTab] = useState("Basic");
  const TabsList = [
    { lbl: "Basic" },
    { lbl: "Premium" },
    { lbl: "Premium Plus" },
  ];
  return (
    <div className="package-sec flex flex-col ">
      <div className="page-hdr flex items-center w-full justify-between">
        <div className="sec-tag">Packages</div>
        <div className=""></div>
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

        {/* {activeTab === "Basic" ? (
          <>

          {curr_package<=0?(        

          <div className="pack-box flex flex-col">
              <div className="pack-name">Associate</div>
              <div className="pack-center flex items-center justify-center">
                <div className="amount">$100</div>
              </div>
              <button className="btn-buy button" 
              
              onClick={(e) => {

                          handleRegisteration(0);

                         }}>Buy Now</button>
            </div>):(null)}

            {curr_package<=1?(
              <div className="pack-box flex flex-col">
                <div className="pack-name">Basic</div>
                <div className="pack-center flex items-center justify-center">
                  <div className="amount">$500</div>
                </div>
                <button className="btn-buy button" 
                
                onClick={(e) => {
                  
                            handleRegisteration(1);
  
                           }}>Buy Now</button>
              </div>):(null)}

            
            {curr_package<=2?(
              <div className="pack-box flex flex-col">
                <div className="pack-name">Bronze</div>
                <div className="pack-center flex items-center justify-center">
                  <div className="amount">$1000</div>
                </div>
                <button className="btn-buy button" 
                
                onClick={(e) => {
                  
                            handleRegisteration(2);
  
                           }}>Buy Now</button>
              </div>):(null)}

          </>
        ) : activeTab === "Premium" ? (
          <>
            
            {curr_package<=3?(
            <div className="pack-box flex flex-col">
              <div className="pack-name">Silver</div>
              <div className="pack-center flex items-center justify-center">
                <div className="amount">$3000</div>
              </div>
              <button className="btn-buy button" 
              
              onClick={(e) => {
                
                          handleRegisteration(3);

                         }}>Buy Now</button>
            </div>):(null)}

            {curr_package<=4?(          
                <div className="pack-box flex flex-col">
            <div className="pack-name">Gold</div>
            <div className="pack-center flex items-center justify-center">
              <div className="amount">$5000</div>
            </div>
            <button className="btn-buy button" 
            
            onClick={(e) => {
              
                        handleRegisteration(4);

                       }}>Buy Now</button>
          </div>):(null)}


            {curr_package<=5?(            <div className="pack-box flex flex-col">
            <div className="pack-name">Platinum</div>
            <div className="pack-center flex items-center justify-center">
              <div className="amount">$10000</div>
            </div>
            <button className="btn-buy button" 
            
            onClick={(e) => {
              
                        handleRegisteration(5);

                       }}>Buy Now</button>
          </div>):(null)}


          </>
        ) : activeTab === "Premium Plus" ? ( */}
          <>

          {curr_package<0?(        

<div className="pack-box flex flex-col">
    <div className="pack-name">Associate</div>
    <div className="pack-center flex items-center justify-center">
      <div className="amount">$100</div>
    </div>
    <button className="btn-buy button" 
    
    onClick={(e) => {

                handleRegisteration(0);

               }}>Buy Now</button>
  </div>):(null)}

  {curr_package<1?(
    <div className="pack-box flex flex-col">
      <div className="pack-name">Basic</div>
      <div className="pack-center flex items-center justify-center">
        <div className="amount">$500</div>
      </div>
      <button className="btn-buy button" 
      
      onClick={(e) => {
        
                  handleRegisteration(1);

                 }}>Buy Now</button>
    </div>):(null)}

  
  {curr_package<2?(
    <div className="pack-box flex flex-col">
      <div className="pack-name">Bronze</div>
      <div className="pack-center flex items-center justify-center">
        <div className="amount">$1000</div>
      </div>
      <button className="btn-buy button" 
      
      onClick={(e) => {
        
                  handleRegisteration(2);

                 }}>Buy Now</button>
    </div>):(null)}
    {curr_package<3?(
            <div className="pack-box flex flex-col">
              <div className="pack-name">Silver</div>
              <div className="pack-center flex items-center justify-center">
                <div className="amount">$3000</div>
              </div>
              <button className="btn-buy button" 
              
              onClick={(e) => {
                
                          handleRegisteration(3);

                         }}>Buy Now</button>
            </div>):(null)}

            {curr_package<4?(          
                <div className="pack-box flex flex-col">
            <div className="pack-name">Gold</div>
            <div className="pack-center flex items-center justify-center">
              <div className="amount">$5000</div>
            </div>
            <button className="btn-buy button" 
            
            onClick={(e) => {
              
                        handleRegisteration(4);

                       }}>Buy Now</button>
          </div>):(null)}


            {curr_package<5?(            <div className="pack-box flex flex-col">
            <div className="pack-name">Platinum</div>
            <div className="pack-center flex items-center justify-center">
              <div className="amount">$10000</div>
            </div>
            <button className="btn-buy button" 
            
            onClick={(e) => {
              
                        handleRegisteration(5);

                       }}>Buy Now</button>
          </div>):(null)}

            {curr_package<6?(            <div className="pack-box flex flex-col">
              <div className="pack-name">Platinum+</div>
              <div className="pack-center flex items-center justify-center">
                <div className="amount">$20000</div>
              </div>
              <button className="btn-buy button" 
              
              onClick={(e) => {
                
                          handleRegisteration(6);

                         }}>Buy Now</button>
            </div>):(null)}


            {curr_package<7?(            <div className="pack-box flex flex-col">
            <div className="pack-name">Business</div>
            <div className="pack-center flex items-center justify-center">
              <div className="amount">$50000</div>
            </div>
            <button className="btn-buy button" 
            
            onClick={(e) => {
              
                        handleRegisteration(7);

                       }}>Buy Now</button>
          </div>):(null)}


            {curr_package<8?(            
              <div className="pack-box flex flex-col">
            <div className="pack-name">Business+</div>
            <div className="pack-center flex items-center justify-center">
              <div className="amount">$75000</div>
            </div>
            <button className="btn-buy button" 
            
            onClick={(e) => {
              
                        handleRegisteration(8);

                       }}>Buy Now</button>
          </div>):(null)}


            {curr_package<9?(            
              
            <div className="pack-box flex flex-col">
            <div className="pack-name">Professional</div>
            <div className="pack-center flex items-center justify-center">
              <div className="amount">$100000</div>
            </div>
            <button className="btn-buy button" 
            
            onClick={(e) => {
              
                        handleRegisteration(9);

                       }}>Buy Now</button>
          </div>):(null)}


          </>
        {/* ) : null} */}
      </div>
    </div>
  );
};

export default Packages;
