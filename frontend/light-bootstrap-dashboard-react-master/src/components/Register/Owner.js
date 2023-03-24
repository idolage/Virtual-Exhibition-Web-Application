import React, { useState } from "react";
import Axios from "axios";
import { Row, Col } from "react-bootstrap";
import { Modal, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
export const Owner = () => {
  const RegisterURL =
    "http://localhost:8080/api/auth/exhibitionOwnerRegistration";
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNIC] = useState("");
  const [tel, setTel] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  function register(e) {
    e.preventDefault();
    if (password === rePassword) {
      Axios.post(RegisterURL, {
        emailAddress: email,
        name: name,
        contactNo: tel,
        nic: nic,
        password: password,
        company: company,
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
      <h4 style={{ color: "#2899fb" }}>
        <strong>
          <b>
            <i className="nc-icon nc-circle-09"></i>&nbsp;Join as an Exhibition
            Owner
          </b>
        </strong>
      </h4>
      <p className="primary-text">Sign up to Nerambum|නැරඹුම්</p>
      <Form style={{ width: "50vw" }}>
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
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
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

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Company Name</Form.Label>
          <Form.Control
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            type="text"
            placeholder="Enter Company Name"
          />
        </Form.Group>

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
            style={{ marginTop: "2vh", width: "20vw", minWidth: "200px" }}
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
    </>
  );
};
