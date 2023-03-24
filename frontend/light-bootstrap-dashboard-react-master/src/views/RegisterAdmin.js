import React, { useState } from "react";
import Axios from "axios";
import { Modal, Button } from "react-bootstrap";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import routes from "routes.js";
import sidebarImage from "assets/img/sidebar-3.jpg";
import { Form, Card, Row, Col } from "react-bootstrap";
export default function RegisterAdmin() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const mainPanel = React.useRef(null);

  const RegisterURL = "http://localhost:8080/api/auth/adminRegistration";
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNIC] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [isChecked, setIsChecked] = useState(false);

  function register(e) {
    e.preventDefault();
    if (isChecked === false) {
      setShowModal(true);
      setNotification("Please accept the terms and conditions");
    } else if (password === rePassword) {
      Axios.post(RegisterURL, {
        emailAddress: email,
        name: name,
        contactNo: tel,
        nic: nic,
        password: password,
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

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="container" style={{ marginTop: "5vh" }}>
            <Card>
              <Card.Header>
                <Card.Title as="h4" style={{ color: "#2899fb" }}>
                  <i className="nc-icon nc-circle-09"></i>&nbsp;Register new
                  admin
                </Card.Title>
              </Card.Header>
              <Card.Body>
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
                    <Col cclassName="mb-3" md="6">
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

                  <Row
                    className="justify-content-center"
                    style={{ marginLeft: "2.5vw" }}
                  >
                    <Form.Group>
                      <Form.Check
                        value={isChecked}
                        onChange={(e) => setIsChecked(e.target.value)}
                      />
                      By selecting this checkbox, you confirm that you have
                      carefully reviewed and agreed to all rules and regulations
                      governing this registration.
                    </Form.Group>
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
              </Card.Body>
            </Card>
            <br />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
