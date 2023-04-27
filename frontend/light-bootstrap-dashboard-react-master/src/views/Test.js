import React , { useState }from 'react';
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import routes from "routes.js";
import sidebarImage from "assets/img/sidebar-3.jpg";
// react-bootstrap components
import {
    Container,
    Form, Card, Row, Col
  } from "react-bootstrap";
export default function Test() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const mainPanel = React.useRef(null);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4">Test</Card.Title>
              </Card.Header>
              <Card.Body>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}
