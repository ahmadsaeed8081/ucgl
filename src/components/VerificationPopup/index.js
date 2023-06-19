import React, { useState,useEffect }  from "react";
import Axios  from "axios";

const VerificationPopup = (props) => {
  const [fname, set_fname] = useState("");
  const [lname, set_lname] = useState("");
  const [email, set_email] = useState("");
  const [phone, set_phone] = useState("");
  const [country, set_country] = useState("");
  const [age, set_age] = useState("");

  async function handleVerify() {
    try{
      await Axios.post("https://ucanglobal-be.vercel.app/api/register",{ wAddress: props.address.toLowerCase(),
        firstName:fname,lastName:lname,email:email,age:age,userAddress:{country:country,address:"extra"}}
      ).then((response)=>{
        console.log("user is reg");
        // set_mywinning(response.data)
        
      })
      await Axios.get("https://ucanglobal-be.vercel.app/api/user/"+ new URLSearchParams({
        wAddress: props.address.toLowerCase(),})
      ).then((response)=>{
        console.log(response.emailVerified);
        props.set_response(response);

      })
      props.setOpenVerify(false);
    }catch(e){
      console.log(e.response.data);
    }

  }



  return (
    <div className="verification-popup flex">
      <div className="verification-wrapper flex flex-col">
        <div className="popup-hdr flex items-center">Please Verify</div>
        <div className="form-block flex flex-col">
          <div className="grid_box">
            <div className="input-field flex flex-col">
              <input
                type="text"
                placeholder="First Name"
                className="txt cleanbtn"
                value={fname}
                required
                onChange={(e) => {
                  set_fname(e.target.value);
              }}
              />
            </div>
            <div className="input-field flex flex-col">
              <input
                type="text"
                placeholder="Last Name"
                className="txt cleanbtn"
                value={lname}
                required
                onChange={(e) => {
                  set_lname(e.target.value);
              }}
              />
            </div>
          </div>
          <div className="input-field flex flex-col">
            <input type="email"
             placeholder="Email" 
             className="txt cleanbtn" 
             value={email}
             required
             onChange={(e) => {
               set_email(e.target.value);
           }}
             />
          </div>
          <div className="input-field flex flex-col">
            <input
              type="text"
              placeholder="Phone No"
              className="txt cleanbtn"
              value={phone}
              required
              onChange={(e) => {
                set_phone(e.target.value);
            }}
            />
          </div>
          <div className="input-field flex flex-col">
            <input type="text" placeholder="Address" className="txt cleanbtn" />
          </div>
          <div className="grid_box">
            <div className="input-field flex flex-col">
              <input
                type="text"
                placeholder="Country"
                className="txt cleanbtn"
                value={country}
                required
                onChange={(e) => {
                  set_country(e.target.value);
              }}
              />
            </div>
            <div className="input-field flex flex-col">
              <input type="text" 
              placeholder="Age" 
              className="txt cleanbtn" 
              value={age}
              required
              onChange={(e) => {
                set_age(e.target.value);
            }}/>
            </div>
          </div>
          <div className="action flex items-center">
            <button className="btn button"  onClick={()=>handleVerify()}>Submit to Verify</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationPopup;
