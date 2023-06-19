import React, { useState,useEffect }  from "react";
import Countdown, { zeroPad } from "react-countdown";

const PaymentWithDraw = (props) => {
  const ENDTIME = (Number(props.curr_time)+ Number(props.time ))*1000; 
  const [withdrawAmount, set_withdrawAmount] = useState(false);

  const countdownrender = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <>00 Days 00 Hours 00 Min 00 Sec</>;
    } else {
      // Render a countdown
      return (
        <>
          {zeroPad(days, 2)} Days {zeroPad(hours, 2)} Hours{" "}
          {zeroPad(minutes, 2)} Min {zeroPad(seconds, 2)} Sec
        </>
      );
    }
  };

  function Pre_withdraw_Handle()
  {
    if(!props.verify)
    {
      props.setOpen(false);
      props.setOpenVerify(true);

    }
    else{
      props.handleWithdraw(withdrawAmount);
    }


  }



  return (
    <div className="payment-withdraw-popup flex">
      <div className="withdraw-popup-wrapper flex flex-col">
        <div className="popup-hdr flex items-center">Payment Withdraw</div>
        <div className="form-block flex flex-col">
          <div className="input-field flex flex-col">
            <div className="lbl">My Balance</div>
            <input type="text" readOnly placeholder="$000.00" value={"$"+props.balance}className="txt cleanbtn" />
          </div>
          <div className="input-field flex flex-col">
            <div className="lbl">Amount (min $10 - Max $50)</div>
            <input
              type="number"
              placeholder="Enter Amount"
              className="txt cleanbtn"
              value={withdrawAmount}
              onChange={(e) => {
              set_withdrawAmount(e.target.value);
            }} 

            />
          </div>
          <div className="input-field flex flex-col">
            <div className="lbl"> You can Withdraw after:</div>
            <Countdown
              key={Math.floor(Math.random() * 10 + 1)}
              date={ENDTIME}
              renderer={countdownrender}
            />
          </div>
          <div className="action flex flex-col items-start">
            <button
              className="btn button"
              onClick={(e) => {
                Pre_withdraw_Handle();
   
              }}
            >
              Withdraw Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentWithDraw;
