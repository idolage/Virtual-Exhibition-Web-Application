import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { Form, Card, Row, Col } from "react-bootstrap";
import axios from "axios";

export default function EditSponsorVideos({exhibitionId}) {

    const [notification, setNotification] = useState(null);
    const [showModal, setShowModal] = React.useState(false);
    const [valid, setValid] = useState(false);
    const [files, setFiles] = useState([]);

    function handleUpload(e) {
        const uploadedFiles = e.target.files;
        setFiles([...files, uploadedFiles]);
        console.log(files);
    }

    function submitVideo(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', files[0][0]);
        Axios.post(`http://localhost:8080/api/exhibitions/video/${exhibitionId}`, formData)
            .then(res => {
                console.log(res);
                setFiles([]);
            }).catch((e)=>{
                console.log(e)
        })
    }

    return (
        <>
            <Card>
                <Card.Header>
                    <Card.Title as="h4" style={{ color: "#2899fb" }}>
                        Edit Exhibition Sponsor Videos
                    </Card.Title>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Videos</Form.Label>
                            <Form.Control type="file" onChange={
                                (e) => handleUpload(e)
                            } multiple />
                        </Form.Group>

                        <Form.Group>
                            <button
                                onClick={(e) => submitVideo(e)}
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
