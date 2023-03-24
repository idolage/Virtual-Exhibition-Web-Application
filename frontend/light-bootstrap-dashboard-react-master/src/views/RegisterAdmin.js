import React from "react";
import Axios from 'axios' ;
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import routes from "routes.js";
import sidebarImage from "assets/img/sidebar-3.jpg";
import {
  Form,
  Card,
  Row,
  Col,
} from "react-bootstrap";
export default function RegisterAdmin() {
  const url="http://127.0.0.1:5000/estimate_house_price"
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const mainPanel = React.useRef(null);

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="container" style={{ marginTop: "5vh" }}>
            <Card>
              <Card.Header>
                <Card.Title as="h4" style={{ color: "#2899fb" }}><i className="nc-icon nc-circle-09"></i>&nbsp;Register new admin</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="mb-3" md="6">
                      <Form.Group>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Enter full name"
                        />
                      </Form.Group>
                    </Col>
                    <Col className="mb-3" md="6">
                      <Form.Group>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col className="mb-3" md="6">
                      <Form.Group>
                        <Form.Label>NIC No</Form.Label>
                        <Form.Control
                          placeholder="Enter NIC"
                          type="text"
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col cclassName="mb-3" md="6">
                      <Form.Group>
                        <Form.Label>Contact No</Form.Label>
                        <Form.Control
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
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                    </Col>
                    <Col className="mb-3" md="6">
                      <Form.Group>
                        <Form.Label>Re-Enter Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row
                    className="justify-content-center"
                    style={{ marginLeft: "2.5vw" }}
                  >
                    <Form.Group>
                      <Form.Check />
                      By selecting this checkbox, you confirm that you have
                      carefully reviewed and agreed to all rules and regulations
                      governing this registration.
                    </Form.Group>
                  </Row>

                  <Form.Group>
                    <button
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
