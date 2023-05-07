import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Col, Modal, Row, Card } from "react-bootstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";
import "./copy.css";

const Carousel = ({ data }) => {
  const [page, setPage] = useState(0);
  const [cards, setCards] = useState([]);
  const [cardsPerPage, setCardsPerPage] = useState(1);

  const history = useHistory();
  const inputRef = useRef(null);
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

  function handleCopyClick() {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand('copy');
    }
  }

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
                <Card.Text> Exhibition ID: <Form.Control
                    ref={inputRef}
                    readOnly
                    value={card.exhibitionId}
                /><span className="copy-btn"  onClick={handleCopyClick}></span>
                </Card.Text>
                <Card.Text>
                  {card.noOfUsers}&nbsp;<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAClklEQVR4nO2Vz2vTYBzGo4KC/8IQVExE/wG9m2DRvNZLKcm0Tc3bbYIb3dxpbVqHIF2yetGTeHFgO3YdpN5Fp6f5B+hVbxvSMUGhX3nfdpbN/HrTruTwfuCB0rTP+zzv+00iCBwOh8PhcDjJAdzUGWirc9BWP4GL9qh6n2fJNSHJwObtCXDRF2gj8NE2+Y2Q2J13A8MPSiTxJICOTWj4nt6hR0LSABd9jlygrW6NN1xLegYtaRdaElA1xV14e+np4QJqJ3IBV+2w+scGWuLWP+OjakofYhVoo5+s/rHo7wwEal1cjjtCwOAft8DgWH0l7vQLzLLexMDgH69AU+qGLtCUuoMXGNqO9BjdyJxm9Y9FpAVagwXoiyy4xKEXGTD6xyggMh8x2V0yImTO6Y1NhT7S7/o7P4w/E+RRFmGBJ0n1p5BHmb/55ffCkMAx+/cWWReXyVHSmaVzK+4MvTNj9Gcik9k4Vag5Vw3LThtVJ09l2en7lfqVWq12Ukgq+aXGdcNyXhoV54dhOeAt+3u+Yr8oWM61sQVTp6bO3tBxWp7EJVk3G1Tk82TxDrlmlFfPGRV7zT+0t/KWs1moPb8Y5h87uHIPX1A0vCZreE/RMXhJxXP7uXL9N2v4A+XKK39Qcf6Xn7+imx1FN9/czE6fZwov6w8WFQ0HGGO4O7NIRiJW8CNjBenpx77r9IvsKxpeCA1ObjJZM18Hm2FAuDSi8E5vnCoOoGIppAQGRTNfCYJwImDnzUaYSSr3EPLllZGFNw7GaakOqdxMaAlZN23vmddMFLoDOobsQnXk4Y2+svPV8FPQcVfWzFv/F9DxtygFRjk6hsf9ECWDoptfvQpE+vPxhXeooubgBYyknQCHw+FwOBxh/PwFIqf2OHYasqwAAAAASUVORK5CYII="/>
                  <span style={{float:"right"}}>
                    {card.ticketPrice == 0 ? (
                        <button
                            style={{ fontSize: "14px", borderRadius: "10px"}}
                            className="btn btn-success"
                            size="sm"
                            onClick={() =>
                                GetFreeTicket(
                                    card.exhibitionId,
                                    "abc@gmail.com",
                                    "ATTENDEE",
                                    0
                                )
                            }
                        >
                          Join Free
                        </button>
                    ) : (
                        <>
                          USD&nbsp;{card.ticketPrice}&nbsp;
                          <button
                              style={{
                                fontSize: "14px",
                                borderRadius: "10px",
                              }}
                              className="btn btn-info"
                              size="sm"
                              onClick={() => history.push("/login")}
                          >
                            Login
                          </button>
                        </>
                    )}</span>
                </Card.Text>
                <Card.Text></Card.Text>
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

      <Modal size="md" show={showDetails} onHide={() => handleClose()}>
        <Modal.Header className="bg-primary d-flex justify-content-center align-items-center" style={{color: "white" }} >
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
