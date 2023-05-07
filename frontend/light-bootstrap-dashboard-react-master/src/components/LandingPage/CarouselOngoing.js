import React, { useState, useEffect } from "react";
import { Button, Form, Col, Modal, Row, Card } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Carousel = ({ data }) => {
  const [page, setPage] = useState(0);
  const [cards, setCards] = useState([]);
  const [cardsPerPage, setCardsPerPage] = useState(1);

  const history = useHistory();
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [exhibition, setExhibition] = useState({});

  const handleClose = () => {
    setShow(false);
    setShowDetails(false);
  };

  useEffect(() => {
    // Divide the data into pages of cardsPerPage cards each
    const pages = [];
    let i = 0;
    while (i < data.length) {
      pages.push(data.slice(i, i + cardsPerPage));
      i += cardsPerPage;
    }
    setCards(pages);
  }, [data, cardsPerPage]);

  const handlePrev = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handleShowExhibition = (id) =>
    axios.get(`http://localhost:8080/api/exhibitions/${id}`).then((resOne) => {
      setShowDetails(true);
      setExhibition(resOne.data);
    });

  const GetFreeTicket = (exhibitionId, userId, userType, price) => {
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
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const cardStyle = {
    width: "300px",
    marginRight: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
    overflow: "hidden",
  };

  const titleStyle = {
    fontWeight: "bold",
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setCardsPerPage(1);
    } else {
      setCardsPerPage(3);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "nowrap",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {cards[page] &&
          cards[page].map((card, index) => (
            <Card key={index} style={cardStyle}>
              <Card.Body>
                <Card.Title style={titleStyle}>
                  <div className="row">
                    <div className="col-3">
                      <img src="https://img.icons8.com/external-smashingstocks-isometric-smashing-stocks/55/null/external-Exhibition-art-and-culture-smashingstocks-isometric-smashing-stocks.png" />
                    </div>
                    <div className="col-9">{card.exhibitionName} </div>
                  </div>
                </Card.Title>
                <br></br>
                <Card.Text> {card.datetime}</Card.Text>
                <Card.Text>
                  <button
                    style={{ fontSize: "14px", padding: "5px 30px" }}
                    className="secondary-button"
                    variant="sm"
                    onClick={() => handleShowExhibition(card.id)}
                  >
                    View
                  </button>
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
      </div>
      <div className="mx-4">
        <button onClick={handlePrev} disabled={page === 0}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button onClick={handleNext} disabled={page === cards.length - 1}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <br />
      <br />

      <Modal size="lg" show={showDetails} onHide={() => handleClose()}>
        <Modal.Header
          style={{ backgroundColor: "#002D62", color: "white" }}
        >
                  <Modal.Title>Exhibition Details</Modal.Title>
                  <br></br><br></br>
        </Modal.Header>
        <Modal.Body>
          <div className="card" style={{ margin: "20px", border: "none" }}>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <h5
                    className="card-title"
                    style={{
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    {exhibition.exhibitionName}
                  </h5>
                  <br></br>
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://img.icons8.com/external-smashingstocks-isometric-smashing-stocks/55/null/external-Exhibition-art-and-culture-smashingstocks-isometric-smashing-stocks.png" />
                  </div>
                  <hr></hr>
                  <dl className="d-flex align-items-center">
                    <dl className="row">
                      <dt className="col-lg-5">Date</dt>
                      <dd className="col-lg-7">{exhibition.datetime}</dd>
                      <hr></hr>
                      <dt className="col-lg-5">Exhibition ID</dt>
                      <dd className="col-lg-7">{exhibition.exhibitionId}</dd>
                      <hr></hr>
                      <dt className="col-lg-5">Active Users</dt>
                      <dd className="col-lg-7">{exhibition.noOfUsers}</dd>
                      <hr></hr>
                      <dt className="col-lg-5">Join</dt>
                      <dd className="col-lg-7">
                        {exhibition.ticketPrice == 0 ? (
                          <button
                            style={{ fontSize: "14px", borderRadius: "10px" }}
                            className="secondary-button"
                            size="sm"
                            onClick={() =>
                              GetFreeTicket(
                                exhibition.exhibitionId,
                                "abc@gmail.com",
                                "ATTENDEE",
                                0
                              )
                            }
                          >
                            Free
                          </button>
                        ) : (
                          <>
                            USD&nbsp;{exhibition.ticketPrice}&nbsp;
                            <button
                              style={{
                                fontSize: "14px",
                                borderRadius: "10px",
                              }}
                              className="secondary-button"
                              size="sm"
                              onClick={() => history.push("/login")}
                            >
                              Login
                            </button>
                          </>
                        )}
                        <br></br>
                      </dd>
                    </dl>
                  </dl>
                  <h5
                    className="card-title"
                    style={{
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                  >
                    Exhibition Owner Details
                  </h5>
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://img.icons8.com/fluency/48/null/microsoft-admin.png" />
                  </div>
                  <hr></hr>
                  <dl className="d-flex align-items-center">
                    <dl className="row">
                      <hr></hr>
                      <dt className="col-lg-5">Name</dt>
                      <dd className="col-lg-7">
                        {!showDetails ? null : exhibition.exhibitionOwner.name}
                      </dd>
                      <hr></hr>
                      <dt className="col-lg-5">Email</dt>
                      <dd className="col-lg-7">
                        {!showDetails
                          ? null
                          : exhibition.exhibitionOwner.emailAddress}
                      </dd>
                      <hr></hr>
                      <dt className="col-lg-5">Contact Number</dt>
                      <dd className="col-lg-7">
                        {!showDetails
                          ? null
                          : exhibition.exhibitionOwner.contactNo}
                      </dd>
                      <hr></hr>
                      <dt className="col-lg-5">NIC</dt>
                      <dd className="col-lg-7">
                        {!showDetails ? null : exhibition.exhibitionOwner.nic}
                      </dd>
                      <hr></hr>
                      <dt className="col-lg-5">Company</dt>
                      <dd className="col-lg-7">
                        {!showDetails
                          ? null
                          : exhibition.exhibitionOwner.company}
                      </dd>
                    </dl>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Carousel;
