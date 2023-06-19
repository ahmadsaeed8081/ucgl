// import React from "react";
import React, { useEffect, useState } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Private from "./Private";
import Public from "./Public";

import Login from "../Pages/Login";
import Home from "../Pages/Home";
import Products from "../Pages/Products";
import Profile from "../Pages/Profile";

const Routing = () => {



  const [address, set_address] = useState(null);
  const [web3, set_web3] = useState(null);
  const [provider, set_provider] = useState(null);
  const [contract, set_contract] = useState(null);
  const [contract1, set_contract1] = useState(null);

  const [openWallet, setOpenWallet] = useState(false);
  const [itsview, set_itsview] = useState(false);
  const [res, set_res] = useState(
    {
      "userAddress": {
          "country": "",
          "address": ""
      },
      "_id": "",
      "firstName": "",
      "lastName": "",
      "wAddress": "",
      "email": "",
      "age": 0,
      "emailVerified": false,
      "__v": 0
  }
  );

  const [isWalletConnected, set_isWalletConnected] = useState(false);
  const [balance, setBalance] = useState(0);
  const [matic, set_matic] = useState(0);

  function set_user(_add, _provider, _web3, balance, matic,itsview,_contract,_contract1,res) {
    console.log("ihjono " + _add);
    set_address(_add);
    set_itsview(itsview)

    set_isWalletConnected(true);
    set_provider(_provider);
    set_web3(_web3);
    set_matic(matic);
    setBalance(balance);
    set_contract(_contract)
    set_contract1(_contract1)
    set_res(res);
    console.log("ihjono " + address);
  }
  function search_Data(_add,itsview) {
    console.log("ihjono " + _add);
    set_address(_add);
    set_itsview(itsview)

    set_isWalletConnected(true);
    // // set_provider(_provider);
    // // set_web3(_web3);
    // set_matic(matic);
    // setBalance(balance);
    // console.log("ihjono " + address);
  }
  try{
    window.ethereum.on('accountsChanged', async () => {
      window.location.reload("/");

  });
  // window.location.reload("/");

  }
  catch{
    // window.location.reload("/");

  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Public>
                <Login
                  web3={web3}
                  isWalletConnected={isWalletConnected}
                  matic={matic}
                  balance={balance}
                  address={address}
                  set_user={set_user}

                />            
                </Public>
          }
        />
        <Route path="dashboard">
          <Route
            path="home"
            element={
              <Private>
                <Home 
                web3={web3}
                provider={provider}
                isWalletConnected={isWalletConnected}
                matic={matic}
                balance={balance}
                address={address}
                search_Data={search_Data}
                set_user={set_user}
                itsview={itsview}
                contract={contract}
                contract1={contract1}
                response={res}
                />
              </Private>
            }
          />
          <Route
            path="products"
            element={
              <Private>
                <Products />
              </Private>
            }
          />
          <Route
            path="profile"
            element={
              <Private>
                <Profile 
                response={res}
                />
              </Private>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Routing;
