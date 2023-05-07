import React, { useState, useEffect } from "react";
import Axios from "axios";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Modal,
} from "react-bootstrap";

function ApproveExhibitors() {
  const [exhibitors, setExhibitors] = useState([]);
  const [approvedUsers, setApprovedUsers] = useState([]);

  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const storedEmail = localStorage.getItem("email");

  const handleApproval = (id) =>
    Axios.put(`http://localhost:8080/api/auth/confirm/${id}`).then((res) => {
      console.log(res);
      setShowModal(true);
      setNotification(res.data);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });

  const handleDelete = (id) =>
    Axios.delete(`http://localhost:8080/api/auth/delete/${id}`).then((res) => {
      console.log(res);
      setShowModal(true);
      setNotification(res.data);
    });

  useEffect(() => {
    Axios.get(
      `http://localhost:8080/api/exhibitions/getByExhibitionOwner/${storedEmail}`
    ).then((response) => {
      const allUsers = response.data;
      const approved = allUsers.filter((user) => user.enabled);
      const notApproved = allUsers.filter((user) => !user.enabled);

      setApprovedUsers(approved);
      setExhibitors(notApproved);
    });
  }, []);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="9">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">New Inquiries</Card.Title>
                <p className="card-category">
                  Approve exhibitors for your exhibition
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <div style={{ height: "300px", overflow: "scroll" }}>
                  <Table className="table-hover">
                    <thead>
                      <tr>
                        <th className="border-0">Exhibition ID</th>
                        <th className="border-0">Details</th>
                        <th className="border-0">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {exhibitors.map((exhibitor, i) => (
                        <tr key={i}>
                          <td>{exhibitor.exhibitionId}</td>
                          <td>
                            Name: {exhibitor.name}
                            <br />
                            Email: {exhibitor.emailAddress}
                            <br />
                            Contact No: {exhibitor.contactNo}
                            <br />
                            NIC: {exhibitor.nic}
                            <br />
                            Company Name: {exhibitor.company}
                          </td>
                          <td>
                            {exhibitor.enabled ? (
                              <p></p>
                            ) : (
                              <>
                                <button
                                  style={{
                                    fontSize: "14px",
                                    borderRadius: "10px",
                                  }}
                                  className="secondary-button"
                                  size="sm"
                                  onClick={() =>
                                    handleApproval(exhibitor.emailAddress)
                                  }
                                >
                                  Approve
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md="9">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Approved Users</Card.Title>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <div style={{ height: "300px", overflow: "scroll" }}>
                  <Table className="table-hover">
                    <thead>
                      <tr>
                        <th className="border-0">Exhibition ID</th>
                        <th className="border-0">Details</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {approvedUsers.map((exhibitor, i) => (
                        <tr key={i}>
                          <td>{exhibitor.exhibitionId}</td>
                          <td>
                            Name: {exhibitor.name}
                            <br />
                            Email: {exhibitor.emailAddress}
                            <br />
                            Contact No: {exhibitor.contactNo}
                            <br />
                            NIC: {exhibitor.nic}
                            <br />
                            Company Name: {exhibitor.company}
                          </td>
                          <td>
                            <button
                              style={{
                                fontSize: "14px",
                                borderRadius: "10px",
                                backgroundColor: "red",
                                color: "white",
                              }}
                              className="primary-button"
                              size="sm"
                              onClick={() =>
                                handleDelete(exhibitor.emailAddress)
                              }
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
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
      </Container>
    </>
  );
}

export default ApproveExhibitors;
