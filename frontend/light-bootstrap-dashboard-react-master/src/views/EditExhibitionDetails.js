import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { Form, Card, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function EditExhibitionDetails({exhibitionId}) {

    const [notification, setNotification] = useState(null);
    const [showModal, setShowModal] = React.useState(false);
    const [exhibitionName, setExhibitionName] = useState("");
    const [ticketPrice, setTicketPrice] = useState(0);
    const [dateTime, setDateTime] = useState("");
    const [exhibition, setExhibition] = useState({});

    useEffect(()=>{
        axios
            .get(`http://localhost:8080/api/exhibitions/${exhibitionId}`)
            .then((res)=>{
                setExhibitionName((res.data.exhibitionName));
                setTicketPrice((res.data.ticketPrice));
                setDateTime((res.data.datetime));
            }).catch((e)=>{
            console.log(e);
        })
    },[])
    function edit(e) {
        e.preventDefault();
        Axios.put(`http://localhost:8080/api/exhibitions/${exhibitionId}`, {
            exhibitionName: exhibitionName,
            ticketPrice: parseInt(ticketPrice),
            datetime: Date(dateTime),
        })
            .then((res) => {
                console.log(res.data);
                setShowModal(true);
                setNotification("Exhibition updated successfully!");
            })
            .catch((e) => {
                console.log(e);
            });
    }

    return (
        <>
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4" style={{ color: "#2899fb" }}>
                                    Edit Exhibition
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
                                            onClick={(e) => edit(e)}
                                            className="secondary-button"
                                            type="submit"
                                            style={{
                                                marginTop: "2vh",
                                                width: "20vw",
                                                minWidth: "200px",
                                            }}
                                        >
                                            Update
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
        </>
    );
}
