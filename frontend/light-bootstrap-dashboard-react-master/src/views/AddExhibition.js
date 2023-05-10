import React, { useState } from "react";
import Axios from "axios";
import { Modal, Button } from "react-bootstrap";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import routes from "routes.js";
import sidebarImage from "assets/img/sidebar-3.jpg";
import { Form, Card, Row, Col } from "react-bootstrap";

export default function AddExhibition() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const mainPanel = React.useRef(null);

  const URL = "http://localhost:8080/api/exhibitions";
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [exhibitionName, setExhibitionName] = useState();
  const [ticketPrice, setTicketPrice] = useState();
  const [dateTime, setDateTime] = useState();

  function add(e) {
    e.preventDefault();
    Axios.post(
      URL,
      {
        exhibitionName: exhibitionName,
        exhibitionOwnerId: localStorage.getItem("email"),
        ticketPrice: parseInt(ticketPrice),
        datetime: new Date(dateTime),
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
        setNotification("Exhibition added successfuly!");
      })
      .catch((e) => {
        console.log(e);
      });
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
                  Add Exhibition
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Form.Group>
                    <Form.Label>Exhibition Name</Form.Label>
                    <Form.Control
                      value={exhibitionName}
                      onChange={(e) => setExhibitionName(e.target.value)}
                      type="text"
                      placeholder="Enter Exhibition Name"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Ticket Price</Form.Label>
                    <Form.Control
                      value={ticketPrice}
                      onChange={(e) => setTicketPrice(e.target.value)}
                      type="number"
                      placeholder="Enter Ticket Price"
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Date & Time</Form.Label>
                    <Form.Control
                      value={dateTime}
                      onChange={(e) => setDateTime(e.target.value)}
                      type="datetime-local"
                    />
                  </Form.Group>

                  <Form.Group>
                    <button
                      onClick={(e) => add(e)}
                      className="secondary-button"
                      type="submit"
                      style={{
                        marginTop: "2vh",
                        width: "20vw",
                        minWidth: "200px",
                      }}
                    >
                      Add Exhibition
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
            <br />
          </div>
          <br />
          <br />
          <br />
          <Footer />
        </div>
      </div>
    </>
  );
}
