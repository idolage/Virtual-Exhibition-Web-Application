import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import "./copy.css";
// react-bootstrap components
import {
  Badge,
  Modal,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
  Table,
} from "react-bootstrap";
import { AvatarCustomizationProvider } from "contexts/AvatarCustomizationContext";
import { Canvas } from "@react-three/fiber";
import Experience from "components/AvatarCustomization/Experience";
import Interface from "components/AvatarCustomization/Interface";
import ExhibitorMale from "../assets/img/exhibitorImages/maleExhibitor.png";
import ExhibitorFemale from "../assets/img/exhibitorImages/femaleExhibitor.png";
import Carousel from "./StartExhibitions";

const PurchasedTickets = () => {
  const [tickets, setTickets] = useState([]);

  const storedEmail = localStorage.getItem("email");

  useEffect(() => {
    Axios.get(
      `http://localhost:8080/api/tickets/getTicketInfo/${storedEmail}`,
      {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      }
    ).then((response) => {
      console.log(response);
      if (response.data != "") {
        setTickets(response.data);
      }
    });
  }, []);

  return (
    <>
      <Table className="table-hover">
        <thead>
          <tr>
            <th className="border-0">Ticket ID</th>

            <th className="border-0">Exhibition Name</th>

            <th className="border-0">Ticket Price</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket, i) => (
            <tr key={i}>
              <td>{ticket.ticketId}</td>
              <td>{ticket.exhibitionName}</td>
              <td>{ticket.ticketPrice}.00</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

const Admin = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nic, setNIC] = useState("");
  const [tel, setTel] = useState("");
  const [pwd, setPwd] = useState("");
  const [rePwd, setRePwd] = useState("");
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = React.useState(false);

  function updateAdmin(e) {
    e.preventDefault();
    if (pwd == rePwd) {
      const storedEmail = localStorage.getItem("email");
      Axios.put(
        `http://localhost:8080/api/auth/updateAdmin/${storedEmail}`,
        {
          emailAddress: email,
          name: name,
          contactNo: tel,
          nic: nic,
          password: pwd,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      )
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

  useEffect(() => {
    const fetchAdminDetails = async () => {
      try {
        const storedEmail = localStorage.getItem("email");
        const response = await Axios.get(
          `http://localhost:8080/api/auth/getAdmin/${storedEmail}`,
          {
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
          }
        );
        setEmail(response.data.emailAddress);
        setName(response.data.name);
        setNIC(response.data.nic);
        setTel(response.data.contactNo);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAdminDetails();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card style={{ border: "none" }}>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          defaultValue={email}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          defaultValue={name}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Contact No</label>
                        <Form.Control
                          defaultValue={tel}
                          value={tel}
                          onChange={(e) => setTel(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>NIC</label>
                        <Form.Control
                          defaultValue={nic}
                          value={nic}
                          onChange={(e) => setNIC(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          value={pwd}
                          onChange={(e) => setPwd(e.target.value)}
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Re-enter password</label>
                        <Form.Control
                          value={rePwd}
                          onChange={(e) => setRePwd(e.target.value)}
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br></br>

                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={(e) => updateAdmin(e)}
                  >
                    Update
                  </Button>
                  <div className="clearfix"></div>
                </Form>
                <Modal
                  style={{ marginTop: "10vh" }}
                  className="modal-mini modal-primary"
                  show={showModal}
                  onHide={() => setShowModal(false)}
                >
                  <Modal.Header className="justify-content-center">
                    <div className="modal-profile">
                      <i className="nc-icon nc-notification-70"></i>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const Attendee = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nic, setNIC] = useState("");
  const [pwd, setPwd] = useState("");
  const [rePwd, setRePwd] = useState("");
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = React.useState(false);

  const [exId, setExId] = useState("No records to show");
  const [ticketId, setTicketId] = useState("No records to show");

  const [avatarIdVal, setAvatarIdVal] = useState("");

  function updateAttendee(e) {
    e.preventDefault();
    if (pwd == rePwd) {
      const storedEmail = localStorage.getItem("email");
      Axios.put(
        `http://localhost:8080/api/auth/updateAttendee/${storedEmail}`,
        {
          emailAddress: email,
          name: name,
          nic: nic,
          password: pwd,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      )
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

  useEffect(() => {
    const fetchAttendeeDetails = async () => {
      try {
        const storedEmail = localStorage.getItem("email");
        const response = await Axios.get(
          `http://localhost:8080/api/auth/getAttendee/${storedEmail}`,
          {
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
          }
        );
        setEmail(response.data.emailAddress);
        setName(response.data.name);
        setNIC(response.data.nic);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchIds = () => {
      const storedEmail = localStorage.getItem("email");
      Axios.get(
        `http://localhost:8080/api/tickets/getTicketInfo/${storedEmail}`,
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      )
        .then((response) => {
          if (!response.data[0].isExpired) {
            setExId(response.data[0].exhibitionId);
            setTicketId(response.data[0].ticketId);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    };

    fetchAttendeeDetails();
    fetchIds();
  }, []);

  useEffect(() => {
    const fetchAvatarDetails = async () => {
      try {
        const storedEmail = localStorage.getItem("email");
        const response = await Axios.get(
          `http://localhost:8080/api/avatars/${storedEmail}`,
          {
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
          }
        );
        setAvatarIdVal(response.data.avatarId);
        console.log(response.data.avatarId + "JJ" + avatarIdVal);
      } catch (e) {
        console.error(e);
      }
    };
    fetchAvatarDetails();
  }, [avatarIdVal]);

  const inputRef = useRef(null);
  const inputRef1 = useRef(null);

  function handleCopyClick() {
    if (inputRef.current) {
      inputRef.current.select();
      document.execCommand("copy");
    }
  }

  function handleCopyClickEx() {
    if (inputRef1.current) {
      inputRef1.current.select();
      document.execCommand("copy");
    }
  }

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="6" sm="6">
            <Card className="card-stats" style={{ border: "none" }}>
              <Card.Body>
                <Row>
                  <div className="numbers text-center">
                    <i
                      className="nc-icon nc-tag-content text-primary"
                      style={{ fontSize: "28px" }}
                    ></i>
                    <Card.Title as="h5">Ticket ID</Card.Title>
                  </div>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <Form.Control
                  ref={inputRef}
                  ReadOnly
                  value={ticketId}
                ></Form.Control>
                <span
                  style={{ float: "right" }}
                  className="copy-btn"
                  onClick={handleCopyClick}
                ></span>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="6" sm="6">
            <Card className="card-stats" style={{ border: "none" }}>
              <Card.Body>
                <Row>
                  <div className="numbers text-center">
                    <i
                      className="nc-icon nc-album-2 text-primary"
                      style={{ fontSize: "28px" }}
                    ></i>
                    <Card.Title as="h5">Exhibition ID</Card.Title>
                  </div>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>

                <Form.Control
                  ref={inputRef1}
                  ReadOnly
                  value={exId}
                ></Form.Control>
                <span
                  style={{ float: "right" }}
                  className="copy-btn"
                  onClick={handleCopyClickEx}
                ></span>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12">
            <Card
              style={{
                border: "none",
              }}
            >
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          defaultValue={email}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          defaultValue={name}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>NIC</label>
                        <Form.Control
                          defaultValue={nic}
                          value={nic}
                          onChange={(e) => setNIC(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          value={pwd}
                          onChange={(e) => setPwd(e.target.value)}
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Re-enter password</label>
                        <Form.Control
                          value={rePwd}
                          onChange={(e) => setRePwd(e.target.value)}
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br></br>
                  <Button
                    className="btn-fill pull-right "
                    type="submit"
                    variant="info"
                    onClick={(e) => updateAttendee(e)}
                  >
                    Update
                  </Button>
                  <div className="clearfix"></div>
                </Form>
                <Modal
                  style={{ marginTop: "10vh" }}
                  className="modal-mini modal-primary"
                  show={showModal}
                  onHide={() => setShowModal(false)}
                >
                  <Modal.Header className="justify-content-center">
                    <div className="modal-profile">
                      <i className="nc-icon nc-notification-70"></i>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <Row>
          <Col lg='12'>
        <Card>
              <Card.Header>
                <Card.Title as="h4">Ongoing Exhibitions</Card.Title>
              </Card.Header>
              <Card.Body>
              <OngoingExhibitions/>
              </Card.Body>
            </Card></Col>
        </Row> */}
        <Row>
          <Col lg="12">
            <Card style={{ border: "none" }}>
              <Card.Header>
                <Card.Title as="h4">Visited Exhibitions</Card.Title>
              </Card.Header>
              <Card.Body>
                <PurchasedTickets />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const Exhibitor = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nic, setNIC] = useState("");
  const [tel, setTel] = useState("");
  const [pwd, setPwd] = useState("");
  const [rePwd, setRePwd] = useState("");
  const [company, setCompany] = useState("");
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = React.useState(false);

  const [exId, setExId] = useState("No records to show");
  const [ticketId, setTicketId] = useState("No records to show");

  const [selectedExhibitor, setSelectedExhibitor] = useState();
  const [ExhibitorAvatar, setExhibitorAvatar] = useState(false);

  const handleExhibitorSelect = async (avatarId) => {
    //if the exhibitor has already selected the avatar for the first time
    if (ExhibitorAvatar === true) {
      console.log("Updating the avatar:" + avatarId);
      try {
        const response = await fetch("http://localhost:8080/api/avatars/", {
          method: "PUT",
          body: JSON.stringify({
            avatarId: avatarId,
            userId: localStorage.getItem("email"),
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },

          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        });
        if (!response.ok) {
          throw new Error("Failed to save avatar.");
        }
        setSelectedExhibitor(avatarId);
      } catch (err) {
        console.log(err.message);
      }
    } else {
      try {
        const response = await fetch("http://localhost:8080/api/avatars/", {
          method: "POST",
          body: JSON.stringify({
            avatarId: avatarId,
            userId: localStorage.getItem("email"),
            userType: localStorage.getItem("userRole"),
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },

          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        });
        if (!response.ok) {
          throw new Error("Failed to save avatar.");
        }
        setSelectedExhibitor(avatarId);
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");

    const fetchAvatarDetails = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:8080/api/avatars/${storedEmail}`,
          {
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
          }
        );
        if (response.data.avatarId !== null) {
          setSelectedExhibitor(response.data.avatarId);
          setExhibitorAvatar(true);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchAvatarDetails();
  }, []);

  function updateExhibitor(e) {
    e.preventDefault();
    if (pwd == rePwd) {
      const storedEmail = localStorage.getItem("email");
      Axios.put(
        `http://localhost:8080/api/auth/updateExhibitor/${storedEmail}`,
        {
          emailAddress: email,
          name: name,
          contactNo: tel,
          nic: nic,
          password: pwd,
          company: company,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      )
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

  useEffect(() => {
    const fetchExhibitorDetails = async () => {
      try {
        const storedEmail = localStorage.getItem("email");
        const response = await Axios.get(
          `http://localhost:8080/api/auth/getExhibitor/${storedEmail}`,
          {
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
          }
        );
        setEmail(response.data.emailAddress);
        setName(response.data.name);
        setNIC(response.data.nic);
        setTel(response.data.contactNo);
        setCompany(response.data.company);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchIds = () => {
      const storedEmail = localStorage.getItem("email");
      Axios.get(
        `http://localhost:8080/api/tickets/getTicketInfo/${storedEmail}`,
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      )
        .then((response) => {
          if (!response.data[0].isExpired) {
            setExId(response.data[0].exhibitionId);
            setTicketId(response.data[0].ticketId);
          }
        })
        .catch((e) => {
          console.error(e);
        });
    };

    fetchExhibitorDetails();
    fetchIds();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col lg="6" sm="6">
            <Card className="card-stats" style={{ border: "none" }}>
              <Card.Body>
                <Row>
                  <div className="numbers text-center">
                    <i
                      className="nc-icon nc-tag-content text-primary"
                      style={{ fontSize: "28px" }}
                    ></i>
                    <Card.Title as="h5">Ticket ID</Card.Title>
                  </div>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">{ticketId}</div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="6" sm="6">
            <Card className="card-stats" style={{ border: "none" }}>
              <Card.Body>
                <Row>
                  <div className="numbers text-center">
                    <i
                      className="nc-icon nc-album-2 text-primary"
                      style={{ fontSize: "28px" }}
                    ></i>
                    <Card.Title as="h5">Exhibition ID</Card.Title>
                  </div>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">{exId}</div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col lg="12">
            <Card style={{ border: "none" }}>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Row>
                  <button
                    onClick={() => handleExhibitorSelect("5")}
                    style={{
                      border:
                        selectedExhibitor === "5"
                          ? "5px solid #3458c2"
                          : "none",
                      borderRadius: "50%",
                      backgroundColor: "transparent",
                      padding: 0,
                    }}
                  >
                    <img
                      src={ExhibitorFemale}
                      alt="Female Exhibitor"
                      style={{
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                      }}
                    />
                  </button>
                  <span className="mx-2"></span>
                  <button
                    onClick={() => handleExhibitorSelect("6")}
                    style={{
                      border:
                        selectedExhibitor === "6"
                          ? "5px solid #3458c2"
                          : "none",
                      borderRadius: "50%",
                      backgroundColor: "transparent",
                      padding: 0,
                    }}
                  >
                    <img
                      src={ExhibitorMale}
                      alt="Male Exhibitor"
                      style={{
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                      }}
                    />
                  </button>
                </Row>

                <Form>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          defaultValue={email}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          defaultValue={name}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Contact No</label>
                        <Form.Control
                          defaultValue={tel}
                          value={tel}
                          onChange={(e) => setTel(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>NIC</label>
                        <Form.Control
                          defaultValue={nic}
                          value={nic}
                          onChange={(e) => setNIC(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Company name</label>
                        <Form.Control
                          defaultValue={company}
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          value={pwd}
                          onChange={(e) => setPwd(e.target.value)}
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Re-enter password</label>
                        <Form.Control
                          value={rePwd}
                          onChange={(e) => setRePwd(e.target.value)}
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br></br>

                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={(e) => updateExhibitor(e)}
                  >
                    Update
                  </Button>
                  <div className="clearfix"></div>
                </Form>
                <Modal
                  style={{ marginTop: "10vh" }}
                  className="modal-mini modal-primary"
                  show={showModal}
                  onHide={() => setShowModal(false)}
                >
                  <Modal.Header className="justify-content-center">
                    <div className="modal-profile">
                      <i className="nc-icon nc-notification-70"></i>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const ExhibitionOwner = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [nic, setNIC] = useState("");
  const [tel, setTel] = useState("");
  const [pwd, setPwd] = useState("");
  const [rePwd, setRePwd] = useState("");
  const [company, setCompany] = useState("");
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [cards, setCards] = useState([]);

  function updateExhibitionOwner(e) {
    e.preventDefault();
    if (pwd == rePwd) {
      const storedEmail = localStorage.getItem("email");
      Axios.put(
        `http://localhost:8080/api/auth/updateExhibitionOwner/${storedEmail}`,
        {
          emailAddress: email,
          name: name,
          contactNo: tel,
          nic: nic,
          password: pwd,
          company: company,
        },
        {
          headers: {
            Authorization: localStorage.getItem("jwt"),
          },
        }
      )
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

  useEffect(() => {
    const fetchExhibitionOwnerDetails = async () => {
      try {
        const storedEmail = localStorage.getItem("email");
        const response = await Axios.get(
          `http://localhost:8080/api/auth/getExhibitionOwner/${storedEmail}`,
          {
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
          }
        );
        setEmail(response.data.emailAddress);
        setName(response.data.name);
        setNIC(response.data.nic);
        setTel(response.data.contactNo);
        setCompany(response.data.company);
      } catch (e) {
        console.error(e);
      }
    };

    const fetchExhibitiosByOwner = async () => {
      try {
        const storedEmail = localStorage.getItem("email");
        const response = await Axios.get(
          `http://localhost:8080/api/exhibitions/user/${storedEmail}`,
          {
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
          }
        );
        setCards(response.data);
        console.log(cards);
      } catch (error) {
        console.error(e);
      }
    };
    fetchExhibitiosByOwner();
    fetchExhibitionOwnerDetails();
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          {cards.length > 0 ? (
            <>
              <Carousel data={cards} />
            </>
          ) : (
            <></>
          )}
        </Row>
        <Row>
          <Col lg="10">
            <Card style={{ border: "none" }}>
              <Card.Header>
                <Card.Title as="h4">Edit Profile</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Email</label>
                        <Form.Control
                          defaultValue={email}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          defaultValue={name}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Contact No</label>
                        <Form.Control
                          defaultValue={tel}
                          value={tel}
                          onChange={(e) => setTel(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>NIC</label>
                        <Form.Control
                          defaultValue={nic}
                          value={nic}
                          onChange={(e) => setNIC(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <Form.Group>
                        <label>Company name</label>
                        <Form.Control
                          defaultValue={company}
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col md="6">
                      <Form.Group>
                        <label>Password</label>
                        <Form.Control
                          value={pwd}
                          onChange={(e) => setPwd(e.target.value)}
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="6">
                      <Form.Group>
                        <label>Re-enter password</label>
                        <Form.Control
                          value={rePwd}
                          onChange={(e) => setRePwd(e.target.value)}
                          type="password"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <br></br>

                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={(e) => updateExhibitionOwner(e)}
                  >
                    Update
                  </Button>
                  <div className="clearfix"></div>
                </Form>
                <Modal
                  style={{ marginTop: "10vh" }}
                  className="modal-mini modal-primary"
                  show={showModal}
                  onHide={() => setShowModal(false)}
                >
                  <Modal.Header className="justify-content-center">
                    <div className="modal-profile">
                      <i className="nc-icon nc-notification-70"></i>
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
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

const Other = () => {
  return <p>Please log in first</p>;
};

const User = () => {
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role) {
      setUserRole(role);
    } else {
      console.log("hjhjggjhgjhghjgj");
    }
  }, []);

  return userRole === "ATTENDEE" ? (
    <div>
      <Attendee />
    </div>
  ) : userRole === "EX_OWNER" ? (
    <div>
      <ExhibitionOwner />
    </div>
  ) : userRole === "EXHIBITOR" ? (
    <div>
      <Exhibitor />
    </div>
  ) : userRole === "ADMIN" ? (
    <div>
      <Admin />
    </div>
  ) : (
    <>
      <Other />
    </>
  );

  // if (userRole === "ATTENDEE") {
  //   return (
  //     <div>
  //       <Attendee />
  //     </div>
  //   );
  // }

  // if (userRole === "EX_OWNER") {
  //   return (
  //     <div>
  //       <ExhibitionOwner />
  //     </div>
  //   );
  // }

  // if (userRole === "EXHIBITOR") {
  //   return (
  //     <div>
  //       <Exhibitor />
  //     </div>
  //   );
  // }

  // if (userRole === "ADMIN") {
  //   return (
  //     <div>
  //       <Admin />
  //     </div>
  //   );
  // }

  // return (
  //   <div>
  //     <Other />
  //   </div>
  // );
};

export default User;
