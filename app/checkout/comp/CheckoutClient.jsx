"use client";
import { useState } from "react";

import Info from "./Info";
import Payment from "./Payment";
import Finish from "./Finish";
import YourOrders from "./YourOrders";
import dynamic from "next/dynamic";

const StepperComponent = dynamic(() => import("./StepperComp"), {
  ssr: false,
});

const CheckoutClient = (props) => {
  const { user } = props;
  const [steps, setSteps] = useState(0);
  const [userInfo, setUserInfo] = useState({});
  const [shipping, setShipping] = useState({});
  const [finishBasket, setfinishBasket] = useState({});
  const renderStep = () => {
    switch (steps) {
      case 0:
        return (
          <Info
            setSteps={setSteps}
            setUserInfo={setUserInfo}
            shipping={shipping}
            setShipping={setShipping}
            user={user}
          />
        );
      case 1:
        return (
          <Payment
            setSteps={setSteps}
            userInfo={userInfo}
            shipping={shipping}
            setfinishBasket={setfinishBasket}
            user={user}
          />
        );
      case 2:
        return <Finish finishBasket={finishBasket} user={user} />;

      default:
        return null;
    }
  };
  return (
    <>
      <div className="col-lg-7 col-md-12 col-sm-12 col-12">
        <div className="checkout-area-bg bg-white">
          <StepperComponent steps={steps} />
          {renderStep()}
        </div>
      </div>
      <div className="col-lg-5 col-md-12 col-sm-12 col-12">
        <YourOrders shipping={shipping} />
      </div>
    </>
  );
};

export default CheckoutClient;
