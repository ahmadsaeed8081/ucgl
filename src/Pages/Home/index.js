import React, { useState, useEffect } from "react";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import Wrapper from "../../routes/Wrapper";
import {
  Icon1,
  Icon2,
  Icon3,
  Icon4,
  Icon5,
  Icon6,
  Icon7,
  Icon8,
  CheckIcon,
  CopyIcon,
  CrownIcon,
} from "../../icons";
import SearchBox from "../../components/SearchBox";
import PaymentWithDraw from "../../components/PaymentWithDraw";
import VerificationPopup from "../../components/VerificationPopup";
import Packages from "../../components/Packages";

import Web3 from "web3";

import {
  cont_address,
  cont_abi,
  tokenABI,
  Token_address,
} from "../../../src/components/config";
const Main = (props) => {
  const [loader, setLoader] = useState(false);

  const [open, setOpen] = useState(false);
  const [openVerify, setOpenVerify] = useState(false);
  const [openPackages, setOpenPackages] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [verify, set_verify] = useState(false);
  const [time, set_time] = useState(false);
  const [curr_time, set_curr_time] = useState(false);

  const [response, set_response] = useState({
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
  });

  const packages_price = [
    100, 500, 1000, 3000, 5000, 10000, 20000, 50000, 75000, 100000,
  ];

  const [withdrawable_earning, set_withdrawable_earning] = useState("");

  const [lsb, set_lsb] = useState("0");
  const [rsb, set_rsb] = useState("0");

  const [curr_package, set_curr_package] = useState(null);

  const [direct_ref, set_direct_ref] = useState("");

  const [uplinerId, set_uplinerId] = useState("");
  const [userId, set_userId] = useState("");
  const [username, set_username] = useState("");

  const [is_Reg, set_Reg] = useState(false);
  // const [pgv, set_pgv] = useState(null);

  // const [pv, set_pv] = useState(null);

  // const [rsm, set_rsm] = useState(null);
  // const [lsm, set_lsm] = useState(null);
  // const [total_ref, set_totalRef] = useState(null);
  const [total_withdraw, set_total_withdraw] = useState(null);

  const [user, set_user] = useState({});

  const [sponsored, set_sponsored] = useState({});
  const [dualTeam, set_dualTeam] = useState({});

  const [matchingBonus, set_matchingBonus] = useState({});

  useEffect(() => {
    console.log(props.response.firstName);

    getData();
  }, [props.provider, props.address]);

  async function getData() {
    if (!props.isWalletConnected) {
      return;
    }
    try {
      // setLoader(true);
      setLoader(true);

      const web3 = new Web3(props.provider);
      console.log("object2" + props.address);
      let sponsored_earning;
      let dualTeam_balance;
      // const contract = new web3.eth.Contract(cont_abi, cont_address);
      let is_reg;
      is_reg = await props.contract.methods
        .isRegister(props.address.toString())
        .call();

      let user_id = await props.contract.methods
        .addresstoId(props.address)
        .call();
      console.log("object6");

      let upliner = await props.contract.methods
        .uplinerOf(props.address)
        .call();
      console.log("object7");

      let upliner_id = await props.contract.methods.addresstoId(upliner).call();
      let time = await props.contract.methods.time_manager().call();

      let curr_package = await props.contract.methods
        .curr_packageOf(props.address)
        .call();
      console.log("object8");
      let curr_time = await props.contract.methods.curr_time().call();

      let total_earning_withdrawabl;
      try {
        total_earning_withdrawabl = await props.contract.methods
          .total_earning_withdrawable()
          .call({ from: props.address.toString() });
        console.log("object32 " + is_reg);
      } catch {
        console.log("object ERROR WITHDRAWABLE");
      }

      try {
        sponsored_earning = await props.contract.methods
          .sponsored_earning(props.address)
          .call();
      } catch {}

      try {
        dualTeam_balance = await props.contract.methods
          .dualTeam_balance(props.address)
          .call();
        console.log("object1 " + is_reg);
      } catch {
        console.log("dual team error");
      }

      let matchingBonus = await props.contract.methods
        .find_matchingBonus(props.address)
        .call();

      let users = await props.contract.methods.user(props.address).call();
      set_user(users);
      set_curr_package(curr_package);
      set_time(time);
      set_withdrawable_earning(total_earning_withdrawabl);
      set_sponsored(sponsored_earning);
      set_matchingBonus(matchingBonus);
      set_dualTeam(dualTeam_balance);
      // set_totalRef(user.total_ref)
      console.log("curr time " + curr_time);
      set_curr_time(curr_time);
      set_lsb(dualTeam_balance[0]._currweek_Left_balance);
      set_rsb(dualTeam_balance[0]._currweek_right_balance);

      console.log(dualTeam_balance.income_history.length);

      // set_pgv(Number(user.personal_group_volume))
      // set_pv(user.personal_volume)
      // set_total_withdraw(user.total_withdraw)
      // set_rsm(user.total_right_members);
      // set_lsm(user.total_left_members);
      set_total_withdraw(users.total_withdraw);

      set_Reg(is_reg);

      set_userId(user_id);
      console.log("total_ref " + props.response.firstName);
      set_uplinerId(upliner_id);
      set_response(props.response);
      setLoader(false);
    } catch (error) {
      // Catch any errors for any of the above operations.
      setLoader(false);
      console.error(error);
    }
  }

  async function Upgrade_package(_package) {
    try {
      let IsPackageBought = await props.contract.methods
        .IsPackageBought(props.address, _package)
        .call();

      if (
        IsPackageBought ||
        curr_package > _package ||
        !props.isWalletConnected
      ) {
        return;
      }

      let package_price = packages_price[_package];

      if (Number(package_price) > Number(props.balance)) {
        alert("You dont have enough USDT to buy");
        return;
      }

      package_price = package_price * 10 ** 6;

      await props.contract1.methods
        .approve(cont_address, package_price.toString())
        .send({ from: props.address });
      const result = await props.contract.methods
        .buy_package(_package.toString())
        .send({ from: props.address });

      if (result) {
        setOpenPackages(false);
        getData();
      }
    } catch {}
  }

  async function handleWithdraw(amount) {
    console.log("object withdraw");

    try {
      if (!props.isWalletConnected) {
        return;
      }
      amount = Number(amount) * 10 ** 6;
      const time = await props.contract.methods.time_manager().call();
      if (time > 0) {
        alert("You can't withdraw now");
        return;
      }

      if (
        Number(withdrawable_earning) - Number(user.total_withdraw) <= 0 ||
        Number(withdrawable_earning) - Number(total_withdraw) < amount
      ) {
        alert("You don't have anough funds to Withdraw");
        return;
      }

      const result = await props.contract.methods
        .weekly_withdraw(amount)
        .send({ from: props.address });

      if (result) {
        getData();
      }
    } catch {}
  }

  const handleClick = () => {
    // console.log("what is e", e);
    navigator.clipboard.writeText(
      "https://ucgl.vercel.app/?ref=" + userId
    );

    setShowMessage(true);
    setIsButtonDisabled(true);

    // Enable the button after 3 seconds
    setTimeout(() => {
      setIsButtonDisabled(false);
      setShowMessage(false);
    }, 3000);
  };

  return (
    <>
      <Wrapper>
        <div className="lading-page flex flex-col">
          <div className="_bg_vector w-full">
            <div className="top-vector"></div>
            <div className="btm-vector"></div>
          </div>
          <div className="page-body">
            <div className="wrap wrapWidth flex flex-col">
              <div className="page-hdr flex items-center w-full justify-between">
                <div className="sec-tag">Dashboard</div>
                {curr_package > 9 ? (
                  <div className="action flex items-center justify-center">
                    <button
                      className="btn-plan button"
                      onClick={(e) => setOpenPackages(true)}
                    >
                      <div className="btn-icon">
                        <CrownIcon />
                      </div>
                      <div className="btn-lbl">Upgrade Your Plan</div>
                    </button>
                  </div>
                ) : null}

                {/* <SearchBox /> */}
              </div>
              <div className="reports-grid">
                <div className="grid-box flex flex-col">
                  <div className="box-top flex items-center">
                    <div className="icon">
                      <Icon1 />
                    </div>
                  </div>
                  <div className="box-btm flex flex-col">
                    <div className="box-lbl">Total Commision</div>
                    <div className="amount">
                      ${Number(withdrawable_earning) / 10 ** 6}
                    </div>
                  </div>
                </div>
                <div className="grid-box flex flex-col">
                  <div className="box-top flex items-center">
                    <div className="icon">
                      <Icon2 />
                    </div>
                  </div>
                  <div className="box-btm flex flex-col">
                    <div className="box-lbl">Total Referrals</div>
                    <div className="amount">{Number(user.total_ref)}</div>
                  </div>
                </div>
                <div className="grid-box flex flex-col">
                  <div className="box-top flex items-center">
                    <div className="icon">
                      <Icon3 />
                    </div>
                  </div>
                  <div className="box-btm flex flex-col">
                    <div className="box-lbl">Total Withdraw</div>
                    <div className="amount">${Number(user.total_withdraw)}</div>
                  </div>
                </div>
                <div className="grid-box flex flex-col">
                  <div className="box-top flex items-start justify-between">
                    <div className="icon">
                      <Icon4 />
                    </div>
                    <button
                      className="btn button"
                      onClick={(e) => setOpen(true)}
                    >
                      Withdraw
                    </button>
                  </div>
                  <div className="box-btm flex flex-col">
                    <div className="box-lbl">Pending Balance</div>
                    <div className="amount">
                      $
                      {Number(withdrawable_earning) -
                        Number(user.total_withdraw) / 10 ** 6}
                    </div>
                  </div>
                </div>
                <div className="grid-box flex flex-col">
                  <div className="box-top flex items-center">
                    <div className="icon">
                      <Icon5 />
                    </div>
                  </div>
                  <div className="box-btm flex flex-col">
                    <div className="box-lbl">Upliner ID: </div>
                    <div className="flex items-center">
                      <div className="amount">{uplinerId}</div>
                      {/* {
                      props.verified?                    
                      <div className="icon-check flex items-center justify-center">
                      <CheckIcon />
                    </div>:(null)
                    } */}
                    </div>
                  </div>
                </div>

                <div className="grid-box flex flex-col">
                  <div className="box-top flex items-center">
                    <div className="icon">
                      <Icon5 />
                    </div>
                  </div>
                  <div className="box-btm flex flex-col">
                    <div className="box-lbl">My ID: {userId}</div>

                    <div className="flex items-center">
                      <div className="amount">
                        {response.firstName != ""
                          ? response.firstName
                          : "unknown"}
                      </div>
                      {response.emailVerified ? (
                        <div className="icon-check flex items-center justify-center">
                          <CheckIcon />
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>

                <div className="grid-box flex flex-col">
                  <div className="box-top flex items-center">
                    <div className="icon">
                      <Icon6 />
                    </div>
                  </div>
                  <div className="box-btm flex flex-col">
                    <div className="box-lbl">Personal Group Volume</div>
                    <div className="amount">
                      ${Number(user.personal_group_volume) / 10 ** 6}
                    </div>
                  </div>
                </div>
                <div className="grid-box flex flex-col">
                  <div className="box-top flex items-center">
                    <div className="icon">
                      <Icon6 />
                    </div>
                  </div>
                  <div className="box-btm flex flex-col">
                    <div className="box-lbl">Total Deposit</div>
                    <div className="amount">
                      ${Number(user.personal_volume) / 10 ** 6}
                    </div>
                  </div>
                </div>
                <div className="grid-box flex flex-col">
                  <div className="box-top flex items-center">
                    <div className="icon">
                      <Icon7 />
                    </div>
                  </div>
                  <div className="box-btm flex flex-col">
                    <div className="box-lbl">Right Side Members</div>
                    <div className="amount">
                      {Number(user.total_right_members)}
                    </div>
                  </div>
                </div>
                <div className="grid-box flex flex-col">
                  <div className="box-top flex items-center">
                    <div className="icon">
                      <Icon8 />
                    </div>
                  </div>
                  <div className="box-btm flex flex-col">
                    <div className="box-lbl">Left Side Members</div>
                    <div className="amount">
                      {Number(user.total_left_members)}
                    </div>
                  </div>
                </div>
                <div className="grid-box flex flex-col">
                  <div className="box-top flex items-center">
                    <div className="icon">
                      <Icon7 />
                    </div>
                  </div>
                  <div className="box-btm flex flex-col">
                    <div className="box-lbl">Right Side Balance</div>
                    <div className="amount">${Number(rsb) / 10 ** 6}</div>
                  </div>
                </div>
                <div className="grid-box flex flex-col">
                  <div className="box-top flex items-center">
                    <div className="icon">
                      <Icon8 />
                    </div>
                  </div>
                  <div className="box-btm flex flex-col">
                    <div className="box-lbl">Left Side balance</div>
                    <div className="amount">${Number(lsb) / 10 ** 6}</div>
                  </div>
                </div>
              </div>

              <div className="copy-referral-link-sec">
                <div className="link-box flex items-center">
                  <div className="link-left flex items-center">
                    <div className="link-lbl">Referral Link:</div>
                    <div className="link-code">
                      https://ucgl.vercel.app/?ref={userId}
                    </div>
                  </div>
                  <div className="link-right items-center">
                    <button
                      className="copy-btn cleanbtn flex items-center justify-center"
                      onClick={(e) => handleClick()}
                      disabled={isButtonDisabled}
                    >
                      {showMessage ? <CheckIcon /> : <CopyIcon />}
                    </button>
                  </div>
                </div>
              </div>
              {/* <div className="package-sec flex flex-col ">
              <div className="page-hdr flex items-center w-full justify-between">
                <div className="sec-tag">Packages</div>
                <div className=""></div>
              </div>
              <div className="tabs flex items-center">
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
              </div>
              <div className="package_grid" id="packageslist">
                {activeTab === "Basic" ? (
                  <>
                    <div className="pack-box flex flex-col">
                      <div className="pack-name">Associate</div>
                      <div className="pack-center flex items-center justify-center">
                        <div className="amount">$49</div>
                      </div>
                      <button className="btn-buy button">Buy Now</button>
                    </div>
                    <div className="pack-box flex flex-col">
                      <div className="pack-name">Basic</div>
                      <div className="pack-center flex items-center justify-center">
                        <div className="amount">$29</div>
                      </div>
                      <button className="btn-buy button">Buy Now</button>
                    </div>
                    <div className="pack-box flex flex-col">
                      <div className="pack-name">Bronze</div>
                      <div className="pack-center flex items-center justify-center">
                        <div className="amount">$14</div>
                      </div>
                      <button className="btn-buy button">Buy Now</button>
                    </div>
                  </>
                ) : activeTab === "Premium" ? (
                  <>
                    <div className="pack-box flex flex-col">
                      <div className="pack-name">Silver</div>
                      <div className="pack-center flex items-center justify-center">
                        <div className="amount">$49</div>
                      </div>
                      <button className="btn-buy button">Buy Now</button>
                    </div>
                    <div className="pack-box flex flex-col">
                      <div className="pack-name">Gold</div>
                      <div className="pack-center flex items-center justify-center">
                        <div className="amount">$29</div>
                      </div>
                      <button className="btn-buy button">Buy Now</button>
                    </div>
                    <div className="pack-box flex flex-col">
                      <div className="pack-name">Platinum</div>
                      <div className="pack-center flex items-center justify-center">
                        <div className="amount">$14</div>
                      </div>
                      <button className="btn-buy button">Buy Now</button>
                    </div>
                  </>
                ) : activeTab === "Premium Plus" ? (
                  <>
                    <div className="pack-box flex flex-col">
                      <div className="pack-name">Platinum+</div>
                      <div className="pack-center flex items-center justify-center">
                        <div className="amount">$49</div>
                      </div>
                      <button className="btn-buy button">Buy Now</button>
                    </div>
                    <div className="pack-box flex flex-col">
                      <div className="pack-name">Business</div>
                      <div className="pack-center flex items-center justify-center">
                        <div className="amount">$29</div>
                      </div>
                      <button className="btn-buy button">Buy Now</button>
                    </div>
                    <div className="pack-box flex flex-col">
                      <div className="pack-name">Business+</div>
                      <div className="pack-center flex items-center justify-center">
                        <div className="amount">$14</div>
                      </div>
                      <button className="btn-buy button">Buy Now</button>
                    </div>
                    <div className="pack-box flex flex-col">
                      <div className="pack-name">Professional</div>
                      <div className="pack-center flex items-center justify-center">
                        <div className="amount">$14</div>
                      </div>
                      <button className="btn-buy button">Buy Now</button>
                    </div>
                  </>
                ) : null}
              </div>
            </div> */}
            </div>
          </div>
          <Modal open={open} onClose={() => setOpen(false)}>
            <PaymentWithDraw
              setOpen={setOpen}
              setOpenVerify={setOpenVerify}
              total_withdraw={total_withdraw}
              balance={withdrawable_earning}
              handleWithdraw={handleWithdraw}
              // verify={props.verified}
              time={time}
              curr_time={curr_time}
              verify={true}
            />
          </Modal>
          <Modal open={openVerify} onClose={() => setOpenVerify(false)}>
            <VerificationPopup
              setOpenVerify={setOpenVerify}
              address={props.address}
              set_verify={set_verify}
            />
          </Modal>
          <Modal open={openPackages} onClose={() => setOpenPackages(false)}>
            <Packages
              setOpenPackages={setOpenPackages}
              handleRegisteration={Upgrade_package}
              curr_package={curr_package}
            />
          </Modal>
        </div>
        {loader && <Loader />}
      </Wrapper>
    </>
  );
};

export default Main;
