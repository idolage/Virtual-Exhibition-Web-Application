import React, { useState } from "react";
import Axios from "axios";
import Form from "react-bootstrap/Form";
import { Modal, Button } from "react-bootstrap";
export const Attendee = () => {
  const RegisterURL = "http://localhost:8080/api/auth/attendeeRegistration";
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNIC] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  function register(e) {
    e.preventDefault();
    if (password === rePassword) {
      Axios.post(
        RegisterURL,
        {
          emailAddress: email,
          name: name,
          nic: nic,
          password: password,
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
  return (
    <>
      <h4 style={{ color: "#2899fb" }}>
        <strong>
          <b>
            <i className="nc-icon nc-circle-09"></i>&nbsp;Join as an Attendee
          </b>
        </strong>
      </h4>
      <p className="primary-text">Sign up to Nerambum|නැරඹුම්</p>

      <Form style={{ width: "50vw" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter full name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
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

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>NIC No</Form.Label>
          <Form.Control
            value={nic}
            onChange={(e) => setNIC(e.target.value)}
            type="text"
            placeholder="Enter nic"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Re-Enter Password</Form.Label>
          <Form.Control
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

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
