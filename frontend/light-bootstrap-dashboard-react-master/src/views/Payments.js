import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";

const Payments = ({ exhibitionId, userId, userType, price, stallId, tier }) => {
  const publishKey =
    "pk_test_51Mmz4YD6ZxcX2rToMJ2OGmR3HorqkdxlC7KfCFrdmmVRnaoQJHlmyhbff18ridO4IuUgdpErJ8lBjPxqQrIluwrk00volY2MsC";
  const stripePrice = price * 100;
  const [msg, setMsg] = React.useState("Please wait");

  const onToken = (token) => {
    axios
      .post("http://localhost:8080/api/payment-gateway/charge", {
        amount: stripePrice,
        token,
      })
      .then((res) => {
        console.log("kk");
        const newPayment = {
          exhibitionId: exhibitionId,
          userId: userId,
          userType: userType,
          amount: price,
        };
        axios
          .post("http://localhost:8080/api/payments", newPayment)
          .then((res) => {
            console.log("done");
            const newStall = {
              exhibitionId: exhibitionId,
              stallId: stallId,
              stallOwnerId: userId,
              userType: userType,
              tier: tier,
            };
            axios
              .post("http://localhost:8080/api/stalls", newStall)
              .then((res) => {
                setMsg("Payment Successfull");

                const newLiveStreamChannel = {
                  exhibitionId: exhibitionId,
                  stallId: stallId,
                };
                axios
                  .post(
                    "http://localhost:8080/api/agora/liveStreamChannel",
                    newLiveStreamChannel
                  )
                  .then((res) => {})
                  .catch((e) => {
                    console.log(e);
                    setMsg("Sorry! Please try again");
                  });
              })
              .catch((e) => {
                console.log(e);
                setMsg("Sorry! Please try again");
              });
          })
          .catch((e) => {
            console.log(e);
            setMsg("Sorry! Please try again");
          });
      })
      .catch((e) => {
        console.log(e);
        setMsg("Sorry! Please try again");
      });
  };

  const displayModal = () => {
    return (
      <div
        className="modal show"
        style={{ display: "block", position: "initial" }}
      >
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Payment Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div class="text-center">
              <div class="spinner-border" role="status">
                <span class="sr-only">Please wait</span>
              </div>
              <br></br>
              <span>
                {msg == "Payment Successfull" ? (
                  <div className="alert alert-success" role="alert">
                    {msg}
                  </div>
                ) : (
                  <div className="alert alert-danger" role="alert">
                    {msg}
                  </div>
                )}
              </span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary">Done</Button>
            <Button variant="secondary">Close</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </div>
    );
  };

  return (
    <StripeCheckout
      amount={stripePrice}
      name="Nerambum - නැරඹුම්"
      label="Pay Now"
      description={`Your total is USD${price}`}
      token={onToken}
      stripeKey={publishKey}
      currency="USD"
    />
  );
};
export default Payments;
