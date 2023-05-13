import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import {
  Container,
  Row,
  Col,
  Form,
  Modal,
  Button,
  Table,
  Card,
} from "react-bootstrap";

export default function ViewFeedbacks() {
  const [exhibitions, setExhibitions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  const handleClose = () => {
    setShowModal(false);
  };

  const showFeedbacks = (id) =>
    axios
      .get(`http://localhost:8080/api/feedbacks/exhibition/${id}`, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        const filteredFeedbacks = res.data.filter(
          (item) => item.type === "EXHIBITION"
        );
        setShowModal(true);
        setFeedbacks(filteredFeedbacks);
      })
      .catch((e) => {
        setShowModal(true);
        setFeedbacks(e);
      });

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    axios
      .get(`http://localhost:8080/api/exhibitions/user/${storedEmail}`, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })

      .then((res) => {
        setExhibitions(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card style={{ overflow: "hidden" }}>
              <Card.Header>
                <Card.Title as="h4">View Feedback</Card.Title>
                <p className="card-category">
                  Click on exhibition name to view feedbacks
                </p>
              </Card.Header>
              <Card.Body>
                <div style={{ maxHeight: "60vh", overflowY: "scroll" }}>
                  {exhibitions.map((exhibition) => (
                    <>
                      <Button
                        style={{ marginBottom: "15px", minWidth: "100%" }}
                        onClick={() => showFeedbacks(exhibition.id)}
                      >
                        <span style={{ textAlign: "left" }}>
                          {exhibition.exhibitionName}
                          <br />
                          Exhibition ID: {exhibition.exhibitionId}
                        </span>
                      </Button>
                      <br />
                    </>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <Modal size="lg" show={showModal} onHide={() => handleClose()}>
        <Modal.Header style={{ backgroundColor: "#002D62", color: "white" }}>
          <Modal.Title>Feedbacks</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {feedbacks.length > 0 ? (
            feedbacks.map((feedback) => (
              <>
                User Role: {feedback.userRole}
                <br />
                Feedback: {feedback.feedback}
                <hr />
                <br />
              </>
            ))
          ) : (
            <p>No feedbacks found</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose()}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
