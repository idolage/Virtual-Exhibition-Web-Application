import React from "react";
import Stripe from "react-stripe-checkout";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
const Payments = ({ price }) => {
  const publishKey =
    "pk_test_51Mmz4YD6ZxcX2rToMJ2OGmR3HorqkdxlC7KfCFrdmmVRnaoQJHlmyhbff18ridO4IuUgdpErJ8lBjPxqQrIluwrk00volY2MsC";
  const stripePrice = 200;

  const onToken = (token) => {
    axios
      .post("http://localhost:8080/api/payment-gateway/charge", {
        amount: stripePrice,
        token,
      })
      .then((res) => {
        alert("payment success");
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <StripeCheckout
      amount={stripePrice}
      label="Pay now"
      token={onToken}
      stripeKey={publishKey}
      currency="USD"
    />
  );
  // function handleToken(token) {
  //   console.log(token);
  //   axios
  //     .post("http://localhost:8080/api/payment-gateway/charge", "", {
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Content-Type": "application/json",
  //         token: token.id,
  //         amount: 500,
  //       },
  //     })
  //     .then(() => {
  //       alert("Payment Success");
  //     })
  //     .catch((error) => {
  //       alert(error);
  //     });
  // }
  // return (
  //   <div className="Payments">
  //     <Stripe
  //       stripeKey="pk_test_51Mmz4YD6ZxcX2rToMJ2OGmR3HorqkdxlC7KfCFrdmmVRnaoQJHlmyhbff18ridO4IuUgdpErJ8lBjPxqQrIluwrk00volY2MsC"
  //       token={handleToken}
  //     />
  //   </div>
  // );
};
export default Payments;
