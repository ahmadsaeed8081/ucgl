import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { setUserToken } from "../../store/reducers/globalReducer";
import Axios from "axios";

import Modal from "../../components/Modal";
import ConnectWallet from "../../components/ConnectWallet";
import LoginPackages from "../../components/LoginPackages";
import UserTypePopup from "../../components/UserTypePopup";
import { useLocation } from "react-router-dom";
import UserType from "../../components/UserTypePopup";
import Web3 from "web3";
import {
  cont_address,
  cont_abi,
  tokenABI,
  Token_address,
} from "../../../src/components/config";
import WalletConnectProvider from "@walletconnect/web3-provider";

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openLoginPackages, setOpenLoginPackages] = useState(false);
  const [choosed_package, setchoosed_package] = useState(null);
  const [is_Verified, set_is_Verified] = useState(false);

  const [openUserType, setOpenUserType] = useState(false);
  const [memberType, setMemeberType] = useState(null);
  const packages_price = [
    100, 500, 1000, 3000, 5000, 10000, 20000, 50000, 75000, 100000,
  ];
  const userLogin = () => {
    localStorage.setItem("userToken", true);
    dispatch(setUserToken(true));
    navigate("/dashboard/home");
  };

  useEffect(() => {
    // if (memberType !== null) {
    //   setOpenLoginPackages(true);
    //   setOpenUserType(false);
    // }
    console.log(memberType);
    console.log(choosed_package);
  }, [memberType]);

  const [isWalletConnected, set_isWalletConnected] = useState(false);

  const [address, set_address] = useState(null);
  const [viewAddress, set_viewAddress] = useState(null);

  const [option, set_choosed_option] = useState("");

  const [web3, set_web3] = useState(null);
  const [provider, set_provider] = useState(null);

  const [balance, set_balance] = useState(null);
  const [matic, set_matic] = useState(null);

  const [contract, set_contract] = useState(null);
  const [contract1, set_contract1] = useState(null);

  const [openWallet, setOpenWallet] = useState(false);

  const [ref, set_ref] = useState(null);
  const [refId, set_refId] = useState("");

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    set_refId(params.get("ref"));
  });

  async function Sign_out() {
    let provider;
    try{
       provider = new WalletConnectProvider({
        rpc: {
          137:"https://polygon-mainnet.g.alchemy.com/v2/bf3cnZO2AQyu_Kv4eBx6uI0Slhs5GhMv"
        },
        chainId: 137,
      });
    }
    catch{

    }
     try {
       await provider.disconnect();

       window.location.reload("/");
     } catch {
           window.location.reload("/");
 
     }
   }






  
  async function Connect_Wallet(id) {
    try {
      let provider;
      let web3;
      let accounts;

      const NETWORK_ID = "80001";
      const NETWORK_ID_hex = "0x13881";

      if (id == "1") {
        //metmask
        provider = window.ethereum;
        // alert(provider._metamask);
        console.log(provider.isMetaMask);
        web3 = new Web3(provider);
        const networkId = await web3.eth.net.getId();
        setOpenWallet(false);

        if (networkId == NETWORK_ID) {
          accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          set_address(accounts[0]);

          const contract = new web3.eth.Contract(cont_abi, cont_address);
          const contract1 = new web3.eth.Contract(tokenABI, Token_address);
          let balance = await contract1.methods.balanceOf(accounts[0]).call();

          let matic = await web3.eth.getBalance(accounts[0]);
          balance = Number(balance) / 10 ** 6;
          matic = web3.utils.fromWei(matic, "ether");

          console.log("meta and trust provider ");
          set_balance(balance);
          set_matic(matic);
          set_provider(provider);
          set_web3(web3);
          set_contract(contract);
          set_contract1(contract1);

          set_isWalletConnected(true);
          setOpen(false);

          // else if(option==2)
          // {
          //   let address=await contract.methods.idtoAddress(viewAddress.toString().toLowerCase()).call();
          //   console.log("hlo its view add "+address);
          //   // const fee_paid = await contract.methods.is_paid(viewAddress.toString()).call();
          //   if(address!="0x0000000000000000000000000000000000000000")
          //   {
          //     props.set_user(address, web3, provider, balance, matic,true);
          //     dispatch(setUserToken(true));

          //     navigate("/home");

          //   }
          //   else{

          //     alert("This user is not registered")
          //   }

          // }
        } else {
          try {
            await provider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: NETWORK_ID_hex }],
            });
            Connect_Wallet(id);
          } catch {}
        }
      } else if (id == "2" || id == "3") {
        //trust 1Wallet
        provider = new WalletConnectProvider({
          rpc: {
            137: "https://polygon-mainnet.g.alchemy.com/v2/bf3cnZO2AQyu_Kv4eBx6uI0Slhs5GhMv",
          },
          chainId: 137,
        });

        console.log("trust wallet");

        // console.log(provider);
        // console.log(provider.wc.peerMeta);
        await provider.enable();

        // console.log("this is provider");
        // console.log(provider.wc.peerMeta.name);

        web3 = new Web3(provider);
        setOpenWallet(false);

        const networkId = await web3.eth.net.getId();
        console.log("yguygy7 " + networkId);

        if (networkId == NETWORK_ID) {
          accounts = await web3.eth.getAccounts();
          set_address(accounts[0]);
          const contract = new web3.eth.Contract(cont_abi, cont_address);
          const contract1 = new web3.eth.Contract(tokenABI, Token_address);
          console.log("yguygy7 " +accounts[0] );

          let balance = await contract1.methods.balanceOf(accounts[0]).call();
          console.log("yguygy7 " + networkId);

          let matic = await web3.eth.getBalance(accounts[0]);
          balance = balance / 10 ** 6;
          matic = web3.utils.fromWei(matic, "ether");

          set_isWalletConnected(true);
          set_balance(balance);
          set_matic(matic);
          set_provider(provider);
          set_web3(web3);
          set_contract(contract);
          set_contract1(contract1);
          setOpen(false);
          setOpenWallet(false);

        } else {

          console.log("object net change");
          if (provider.wc.peerMeta.name == "MetaMask") {
            console.log("object net change 45");

            await provider.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: "0x89" }],
            });
            // Connect_Wallet(id);
          } else {
            setOpenWallet(false);

            await provider.disconnect();
            alert("Kindly change your network to Binance");
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  }

  //   try{
  //     window.ethereum.on('accountsChanged', async () => {
  //       window.location.reload("/");

  //   });
  //   }
  //   catch{
  // alert("acc change error")
  //   }

  async function check_Verified() {
    let res = {
      userAddress: {
        country: "",
        address: "",
      },
      _id: "",
      firstName: "",
      lastName: "",
      wAddress: "",
      email: "",
      age: 0,
      emailVerified: false,
      __v: 0,
    };
    try {
      await Axios.get(
        `https://ucanglobal-be.vercel.app/api/user/${address.toLowerCase()}`
      ).then((response) => {
        console.log(response);
        if(response.data!=null)
        {
          if (response.data.emailVerified == true) {
            alert("alert verify ")
            set_is_Verified(true);
            res = response.data;
          }
        }

      });
      console.log("res in ver "+res);
      return res;
    } catch (e) {
      // console.log(e.response);
    }
  }

  async function handleLogin() {
    const Is_register = await contract.methods.isRegister(address).call();

    if (Is_register) {
      const res = await check_Verified();

      console.log("res in logn "+res);
      props.set_user(
        address,
        web3,
        provider,
        balance,
        matic,
        false,
        contract,
        contract1,
        res
      );
      dispatch(setUserToken(true));

      navigate("/home");
    } else {
      // await provider.disconnect();

      alert("You are not a register member");
      return;
    }
  }

  async function send_mail(upliner) {
    try {
      await Axios.post("https://ucanglobal-be.vercel.app/api/register", {
        wAddress: upliner.toLowerCase(),
      }).then((response) => {
        console.log("mail sent to upliner");
        // set_mywinning(response.data)
      });
    } catch (e) {
      console.log(e.response.data);
    }
  }

  async function handleRegisteration(_package) {
    const Is_register = await contract.methods.isRegister(address).call();
    console.log("ref ... " + refId);
    //   const is_reg = await contract.methods.isRegister(address).call();
    // console.log(is_reg);
    if (!Is_register) {
      if (memberType != null && _package != null) {
        let _ref;

        if (params.get("ref") != null) {
          console.log("hello this it");
          let address = await contract.methods
            .idtoAddress(params.get("ref"))
            .call();
          set_ref(address);

          console.log("this is is given ref address: " + address);
          _ref = address.toString();
        }
        const total_inv = await contract.methods.total_member().call();

        let package_price = packages_price[_package];
        let val = Number(total_inv) + 1;
        const newId = "ucgl089" + val;

        console.log("this is newid " + newId);
        if (_ref == null) {
          _ref = "0x0000000000000000000000000000000000000000";
        }
        try {
          if (Number(package_price) > Number(balance)) {
            alert("You dont have enough USDT to buy");
            return;
          }

          package_price = package_price * 10 ** 6;
          console.log("this is ref1 " + _ref);

          await contract1.methods
            .approve(cont_address, package_price.toString())
            .send({ from: address });
          const result = await contract.methods
            .registration(
              _ref,
              memberType,
              newId.toString(),
              _package.toString()
            )
            .send({ from: address });
          if (result) {
            if (_ref != null) {
              // send_mail(_ref)
            }

            props.set_user(
              address,
              web3,
              provider,
              balance,
              matic,
              false,
              contract,
              contract1
            );
            dispatch(setUserToken(true));

            navigate("/home");
          }
        } catch (error) {
          // Catch any errors for any of the above operations.

          console.error(error);
        }
      }
    } else {
      // await provider.disconnect();

      alert("You are a register member");
      // props.set_user(address, web3, provider, balance, matic,false);
      // dispatch(setUserToken(true));

      // navigate("/home");
      return;
    }
  }
  // if(memberType!=0 && choosed_package!=0)
  // {
  //   console.log("hello reg call");
  //   handleRegisteration();
  // }

  return (
    <div className="login-page flex">
      <div className="_bg_vector w-full">
        <div className="top-vector"></div>
        <div className="wrap wrapWidth flex  flex-col">
          <div className="page-hdr flex items-center w-full justify-end">
            {address == null ? (
              <div
                className="btn-connect button"
                onClick={(e) => {
                  e.stopPropagation();
                  // setOpenWalletList(!openWalletList);
                  setOpen(true);
                }}
              >
                <p>Connect Wallet</p>
              </div>
            ) : (
              <>
                <div className="btn-connect button" onClick={Sign_out}>
                  <p>Sign out</p>
                </div>
              </>
            )}
            {/* <button
              className="btn-connect button"
              onClick={(e) => setOpen(true)}
            >
              Connect Wallet
            </button> */}
          </div>
          <div className="main-box flex items-center justify-center h-full w-full">
            <div className="left-side flex">
              <div className="logo flex items-center justify-center">
                <img src="/images/logo.png" className="img" />
              </div>
            </div>
            <div className="right-side flex">
              <div className="form-box flex flex-col">
                <div className="sec-tag">For Login</div>
                <div className="login-vector">
                  <img src="/images/loginVector.svg" className="vector-img" />
                </div>
                <div className="login-form flex flex-col items-center">
                  <button
                    className="button btn-login"
                    onClick={(e) =>
                      isWalletConnected
                        ? handleLogin()
                        : alert("Kindly connect your wallet first")
                    }
                  >
                    Login
                  </button>
                  <div
                    className="have-account"
                    onClick={(e) =>
                      isWalletConnected
                        ? setOpenUserType(true)
                        : alert("Kindly connect your wallet first")
                    }
                  >
                    Don’t have an Account?{" "}
                    <span className="text-themeColor">Register</span>
                  </div>
                </div>
                {/* <div className="i-field flex flex-col mb-14">
                <input
                  type="text"
                  placeholder="Enter Account ID"
                  className="txt cleanbtn"
                />
                <div className="action row2">
                  <button className="btn button">View</button>
                  <button className="btn button" onClick={userLogin}>
                    Login
                  </button>
                </div>
              </div>
              <div className="sec-tag">For Registration</div>
              <div className="i-field flex flex-col">
                <input
                  type="text"
                  placeholder="Register With Us"
                  className="txt cleanbtn"
                />
                <div className="action row2">
                  <button className="btn button" onClick={(e) => setOpen(true)}>
                    Register
                  </button>
                </div>
              </div> */}
              </div>
            </div>
          </div>
        </div>
        <div className="btm-vector"></div>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <ConnectWallet
          setOpenWallet={setOpenWallet}
          Connect_Wallet={Connect_Wallet}
        />
      </Modal>
      <Modal open={openUserType} onClose={() => setOpenUserType(false)}>
        <UserType
          setMemeberType={setMemeberType}
          setOpenUserType={setOpenUserType}
          setOpenLoginPackages={setOpenLoginPackages}
        />
      </Modal>
      <Modal
        open={openLoginPackages}
        onClose={() => setOpenLoginPackages(false)}
      >
        <LoginPackages
          setOpenLoginPackages={setOpenLoginPackages}
          // setMemeberType={memberType}
          setOpenUserType={setOpenUserType}
          setchoosed_package={setchoosed_package}
          handleRegisteration={handleRegisteration}
        />
      </Modal>
    </div>
  );
};

export default Login;
