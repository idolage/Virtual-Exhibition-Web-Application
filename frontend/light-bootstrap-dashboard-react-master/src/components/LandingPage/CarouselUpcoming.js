import React, { useState, useEffect } from "react";
import { Button, Form, Col, Modal, Row, Card } from "react-bootstrap";
import axios from "axios";

const Carousel = ({ data }) => {
  const [page, setPage] = useState(0);
  const [cards, setCards] = useState([]);
  const [cardsPerPage, setCardsPerPage] = useState(1);

  const RegisterURL = "http://localhost:8080/api/auth/exhibitorRegistration";
  const [notification, setNotification] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [exhibition, setExhibition] = useState({});
  const [inquire, setInquire] = useState(false);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = React.useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNIC] = useState("");
  const [tel, setTel] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [exId, setExId] = useState("");

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

  const handleClose = () => {
    setShow(false);
    setShowDetails(false);
  };

  const handleInquiry = (id) => {
    setExId(id);
    setShowDetails(false);
    setInquire(true);
  };

  function register(e) {
    e.preventDefault();
    if (password === rePassword) {
      axios
        .post(RegisterURL, {
          emailAddress: email,
          name: name,
          contactNo: tel,
          nic: nic,
          password: password,
          company: company,
          exhibitionId: exId,
        })
        .then((res) => {
          console.log(res.data);
          setShowModal(true);
          setNotification(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setShowModal(true);
      setNotification("Passwords do not match!");
    }
  }

  const handleShowExhibition = (id) =>
    axios.get(`http://localhost:8080/api/exhibitions/${id}`).then((resOne) => {
      setShowDetails(true);
      setExhibition(resOne.data);
    });

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
        <Modal.Header style={{ backgroundColor: "#002D62", color: "white" }}>
          <Modal.Title>Exhibition Owner Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card" style={{ margin: "20px", border: "none" }}>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
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
                      <hr></hr>
                      <dt className="col-lg-5">Inquire</dt>
                      <dd className="col-lg-7">
                        <button
                          style={{ fontSize: "14px", borderRadius: "10px" }}
                          className="secondary-button"
                          size="sm"
                          onClick={() => handleInquiry(exhibition.exhibitionId)}
                        >
                          Inquire
                        </button>
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

      <Modal size="lg" show={inquire} onHide={() => handleClose()}>
        <Modal.Header style={{ backgroundColor: "#002D62", color: "white" }}>
          <Modal.Title>
            Fill your details to register as an exhibitor
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card" style={{ margin: "20px", border: "none" }}>
            <div className="card-body">
              <ul>
                <li>
                  Once the exhibition owner approves yourinquiry you'll get
                  notified via an email
                </li>
                <li>
                  Log into your account and make the payment when selecting the
                  stall
                </li>
                <li>Upload your marketing materials and exhibits</li>
              </ul>
              <Form>
                <Row>
                  <Col className="mb-3" md="6">
                    <Form.Group>
                      <Form.Label>Full Name</Form.Label>
                      <Form.Control
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Enter full name"
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3" md="6">
                    <Form.Group>
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        placeholder="Enter email"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="mb-3" md="6">
                    <Form.Group>
                      <Form.Label>NIC No</Form.Label>
                      <Form.Control
                        value={nic}
                        onChange={(e) => setNIC(e.target.value)}
                        placeholder="Enter NIC"
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="mb-3" md="6">
                    <Form.Group>
                      <Form.Label>Contact No</Form.Label>
                      <Form.Control
                        value={tel}
                        onChange={(e) => setTel(e.target.value)}
                        placeholder="Enter Contact No"
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group>
                      <Form.Label>Company name</Form.Label>
                      <Form.Control
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Enter company name"
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col className="mb-3" md="6">
                    <Form.Group>
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Group>
                  </Col>
                  <Col className="mb-3" md="6">
                    <Form.Group>
                      <Form.Label>Re-Enter Password</Form.Label>
                      <Form.Control
                        value={rePassword}
                        onChange={(e) => setRePassword(e.target.value)}
                        type="password"
                        placeholder="Password"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <button
                    onClick={(e) => register(e)}
                    className="secondary-button"
                    type="submit"
                    style={{
                      marginTop: "2vh",
                      width: "20vw",
                      minWidth: "200px",
                    }}
                  >
                    Register
                  </button>
                </Form.Group>
              </Form>
              <Modal
                style={{ marginTop: "10vh" }}
                className="modal-mini modal-primary"
                show={showModal}
                onHide={() => setShowModal(false)}
              >
                <Modal.Header className="justify-content-center">
                  <div className="modal-profile">
                    <i className="nc-icon nc-lock-circle-open"></i>
                  </div>
                </Modal.Header>
                <Modal.Body className="text-center">
                  <p>{notification}</p>
                </Modal.Body>
                <div className="modal-footer">
                  <Button
                    className="btn-simple"
                    type="button"
                    variant="link"
                    onClick={() => setShowModal(false)}
                  >
                    Back
                  </Button>
                  <Button
                    className="btn-simple"
                    type="button"
                    variant="link"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </Button>
                </div>
              </Modal>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setInquire(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Carousel;
