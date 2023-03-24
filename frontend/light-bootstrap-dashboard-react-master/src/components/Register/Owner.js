import React from 'react'
import { Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
export const Owner = () => {
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
          <Form.Control type="text" placeholder="Enter full name" />
            </Form.Group>
          </Col>
          <Col className="mb-3" md="6">
            <Form.Group>
            <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
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
              <Form.Control placeholder="Enter NIC" type="text"></Form.Control>
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

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Company Name</Form.Label>
          <Form.Control type="text" placeholder="Enter Company Name" />
        </Form.Group>

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

        <Form.Group>
          <button
            className="secondary-button"
            type="submit"
            style={{ marginTop: "2vh", width: "20vw" , minWidth:'200px'}}
          >
            Register
          </button>
        </Form.Group>
      </Form>
    </>
  );
}
