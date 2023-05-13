import React from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import Alert from "react-bootstrap/Alert";

const Payments = ({ exhibitionId, userId, userType, price, stallId, tier }) => {
  const publishKey =
    "pk_test_51Mmz4YD6ZxcX2rToMJ2OGmR3HorqkdxlC7KfCFrdmmVRnaoQJHlmyhbff18ridO4IuUgdpErJ8lBjPxqQrIluwrk00volY2MsC";
  const stripePrice = price * 100;
  const [msg, setMsg] = React.useState("Please wait");
  const [show, setShow] = React.useState(false);

  const onToken = (token) => {
    axios
      .post(
        "http://localhost:8080/api/payment-gateway/charge",
        {
          amount: stripePrice,
          token,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      )
      .then((res) => {
        console.log("kk");
        const newPayment = {
          exhibitionId: exhibitionId,
          userId: userId,
          userType: userType,
          amount: price,
        };
        axios
          .post("http://localhost:8080/api/payments", newPayment, {
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
          })
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
              .post("http://localhost:8080/api/stalls", newStall, {
                headers: {
                  Authorization: localStorage.getItem("jwt"),
                },
              })
              .then((res) => {
                setMsg("Payment Successfull");
                setShow(true);
                const newLiveStreamChannel = {
                  exhibitionId: exhibitionId,
                  stallId: stallId,
                };
                if (tier == "Platinum" || tier == "Diamond") {
                  axios
                    .post(
                      "http://localhost:8080/api/agora/liveStreamChannel",
                      newLiveStreamChannel,
                      {
                        headers: {
                          Authorization: localStorage.getItem("jwt"),
                        },
                      }
                    )

                    .then((res) => {})
                    .catch((e) => {
                      console.log(e);
                      setMsg("Sorry! Live Stream Channel Creation Failed");

                      setShow(true);
                    });
                }
              })
              .catch((e) => {
                console.log(e);
                setMsg("Sorry! Please try again");

                setShow(true);
              });
          })
          .catch((e) => {
            console.log(e);
            setMsg("Sorry! Please try again");

            setShow(true);
          });
      })
      .catch((e) => {
        console.log(e);
        setMsg("Sorry! Please try again");

        setShow(true);
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
    <>
      <StripeCheckout
        amount={stripePrice}
        name="Nerambum - නැරඹුම්"
        label="Pay Now"
        description={`Your total is USD${price}`}
        token={onToken}
        stripeKey={publishKey}
        currency="USD"
      />
      <Modal
        style={{ marginTop: "10vh" }}
        className="modal modal-primary"
        show={show}
        onHide={() => setShow(false)}
      >
        <Modal.Body className="text-center">
          {msg == "Payment Successfull" ? (
            <div className="alert alert-success" role="alert">
              {msg}
            </div>
          ) : (
            <div className="alert alert-danger" role="alert">
              {msg}
            </div>
          )}
        </Modal.Body>
        <div className="modal-footer">
          <Button
            className="btn-simple"
            type="button"
            variant="link"
            onClick={() => setShow(false)}
          >
            Back
          </Button>
          <Button
            className="btn-simple"
            type="button"
            variant="link"
            onClick={() => setShow(false)}
          >
            Close
          </Button>
        </div>
      </Modal>
    </>
  );
};
export default Payments;
