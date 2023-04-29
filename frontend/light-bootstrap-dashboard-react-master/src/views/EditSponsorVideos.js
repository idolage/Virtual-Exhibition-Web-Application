import React, { useState, useEffect } from "react";
import Axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { Form, Card, Row, Col } from "react-bootstrap";
import "../assets/css/custom-style.css";

export default function EditSponsorVideos({exhibitionId}) {

    const [notification, setNotification] = useState(null);
    const [showModal, setShowModal] = React.useState(false);
    const [valid, setValid] = useState(false);
    const [files, setFiles] = useState([]);

    function handleUpload(e) {
        const uploadedFiles = Array.from(e.target.files);
        setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
        
    }

    function submitVideo(e) {
        e.preventDefault();
        const formData = new FormData();
         files.forEach((file, index) => {
    formData.append('files', file);
  });
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
                   
                    <div className="row mt-5">
                    <div className="col-lg-9 align-self-center ">
                      <div class="frame">
                        <div class="center">
                          <div class="title">
                            <h1 style={{ fontSize: 18 }}>Upload sponsor videos here</h1>
                          </div>

                          <div class="dropzone">
                            <img src="http://100dayscss.com/codepen/upload.svg" class="upload-icon" />
                            <input type="file" class="upload-input" onChange={
                              (e) => handleUpload(e)
                            } multiple />

                          </div>
                          <button type="button" class="upload-button" name="uploadbutton" onClick={(e) => submitVideo(e)}>Submit</button>

                        </div>
                      </div>
                    </div>

                  </div>
                    
                    <Modal
                        style={{ marginTop: "10vh" }}
                        className="modal-mini modal-primary"
                        show={showModal}
                        onHide={() => setShowModal(true)}
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
