import Header from "components/Header";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import "../assets/css/home.css";
// react-bootstrap components
import Form from "react-bootstrap/Form";
import { Modal, Button } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";
import WebNavBar from "components/Navbars/WebNavBar";
import Footer from "components/Footer/Footer";
export default function Login() {
  const mainPanel = React.useRef(null);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
    console.log(localStorage.getItem("jwt"))
    console.log(localStorage.getItem("userRole"))
    console.log(localStorage.getItem("userLoggedIn"))
  });
  return (
    <>
      <div className="wrapper">
        <div className="main-panel" ref={mainPanel} style={{ width: "100%" }}>
          <WebNavBar />
          <div className="content">
            <div className="home-container">
              <div className="home-banner-container">
                <div className="home-text-section">
                  <p className="primary-text">Sign in to continue</p>
                  <LoginForm />
                </div>
                <div className="home-image-section">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    class="img-fluid"
                    alt="Sample image"
                  />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

const LoginForm = () => {
  const LoginURL = "http://localhost:8080/api/auth/login";
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  function login(e) {
    e.preventDefault();
    Axios.post(LoginURL, {
      emailAddress: email,
      password: password,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.userRole === "null") {
          setNotification(res.data.token);
        } else {
          localStorage.setItem("userLoggedIn", true);
          localStorage.setItem("email", email);
          localStorage.setItem("userRole", res.data.userRole);
          localStorage.setItem("jwt", res.data.token);
          history.push("/admin/dashboard");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <>
      {notification === null ? (
        <p></p>
      ) : (
        <Alert style={{ width: "50vw" }} variant={"danger"}>
          {notification}
        </Alert>
      )}
      <Form style={{ width: "50vw" }}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
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

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
          />
        </Form.Group>

        <Form.Group>
          <a href="#" onClick={() => setShowModal(true)}>
            Forgot password?
          </a>
        </Form.Group>
        <Form.Group>
          <button
            className="secondary-button"
            type="submit"
            style={{ marginTop: "2vh", width: "20vw", minWidth: "200px" }}
            onClick={(e) => login(e)}
          >
            Log in
          </button>
        </Form.Group>
      </Form>

      <Modal
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
          <p>Please enter your email address</p>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group>
              <button
                className="secondary-button"
                type="submit"
                style={{ width: "100%", padding: "0" }}
              >
                Send
              </button>
            </Form.Group>
          </Form>
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
