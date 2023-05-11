import React, { useState, useEffect } from "react";
import Axios from "axios";
import {
  Container,
  Row,
  Col,
  Form,
  Modal,
  Button,
  Card,
} from "react-bootstrap";

export default function SubmitFeedback() {
  const addURL = "http://localhost:8080/api/feedbacks";
  const storedUserRole = localStorage.getItem("userRole");
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [exID, setExID] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [type, setType]=useState(null);
  const [exhibitions, setExhibitions] = useState([]);
  const [fetch, setFetch]=useState(false);

useEffect(()=>{
  Axios.get("http://localhost:8080/api/exhibitions", {
    headers: {
      Authorization: localStorage.getItem("jwt"),
    },
  })
    .then((res) => {
      setExhibitions(res.data);
      setFetch(true);
      console.log(res.data);
    })
    .catch((e) => {
      console.log(e);
    });
},[fetch])

  function submitFeedback(e){
    e.preventDefault();
    Axios.post(
      addURL,
      {
        exhibitionId: exID,
        feedback: feedback,
        userRole: storedUserRole,
        type: type,
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
        setNotification("Feedback Submitted!");
        setFeedback("");
        setType(null);
      })
      .catch((e) => {
        console.log(e);
      });  
  }
  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card style={{ overflow: "hidden", border: "none" }}>
              <Card.Header>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row>
                    <Col className="mb-3">
                      <Form.Group>
                        <Form.Label>Exhibition</Form.Label>
                        <Form.Control
                          value={exID}
                            as="select"
                          onChange={(e) => setExID(e.target.value)}
                        >
                          {exhibitions.map((exhibition,index)=>{
                            return(
                          <option value={exhibition.id} key={{index}}>{exhibition.exhibitionName}</option>)
                        })}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mb-3">
                      <Form.Group>
                        <Form.Label>Type</Form.Label>
                        <Form.Control
                        required
                          as="select"
                          value={type}
                          onChange={(e) => setType(e.target.value)}
                        >
                        <option value="">Select type</option>
                          <option value="PLATFORM">PLATFORM</option>
                          {storedUserRole=="EX_OWNER"?<></>:
                          <option value="EXHIBITION">EXHIBITION</option>}
                        </Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col className="mb-3">
                      <Form.Group>
                        <Form.Label>FeedBack</Form.Label>
                        <Form.Control
                        required={true}
                          value={feedback}
                          onChange={(e) => setFeedback(e.target.value)}
                          rows="4"
                          as="textarea"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group>
                    <button
                      onClick={(e) => submitFeedback(e)}
                      className="secondary-button"
                      type="submit"
                      style={{
                        marginTop: "2vh",
                        width: "20vw",
                        minWidth: "200px",
                      }}
                    >
                      Submit
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
          </Col>
        </Row>
      </Container>
    </>
  );
}
