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
  Form,
  FormControl,
} from "react-bootstrap";

export default function ViewMaterials() {
  const storedEmail = localStorage.getItem("email");
  const [materials, setMaterials] = useState([]);

  const handleDownload = async (val, e) => {
    e.preventDefault();
    try {
      const response = await Axios.get(val, {
        responseType: "blob",
      });
      const url = URL.createObjectURL(response.data);
      const link = document.createElement("a");
      link.href = url;
      link.download = "image.png";
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

  const handleVideo = async (val, e) => {
    e.preventDefault();
    const response = await Axios.get(val, { responseType: 'blob' });
    const blob = new Blob([response.data], { type: response.headers['content-type'] });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'video.mp4';
    link.click();
  };

  useEffect(() => {
    Axios.get(`http://localhost:8080/api/stalls/${storedEmail}`)
      .then((response) => {
        console.log(response.data);
        setMaterials(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h4">Uploaded materials</Card.Title>
              </Card.Header>
              <Card.Body>
                {materials.map((material) => (
                  <>
                    <Form>
                      <Row>
                        <Col mb="3">
                          <Form.Group>
                            <Form.Label>Exhibition ID</Form.Label>
                            <Form.Control
                              disabled
                              value={material.exhibitionId}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col mb="3">
                          <Form.Group>
                            <Form.Label>Stall ID</Form.Label>
                            <Form.Control disabled value={material.stallId} />
                          </Form.Group>
                        </Col>
                        <Col mb="3">
                          <Form.Group>
                            <Form.Label>Stall Name</Form.Label>
                            <Form.Control disabled value={material.stallName} />
                          </Form.Group>
                        </Col>
                        <Col mb="3">
                          <Form.Group>
                            <Form.Label>Stall Tier</Form.Label>
                            <Form.Control disabled value={material.tier} />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col mb="3">
                          <Form.Group controlId="formHexValue">
                            <Form.Label>Stall Color</Form.Label>
                            <div
                            md="6"
                              style={{
                                backgroundColor: material.stallColor,
                                height: "5vh",
                                
                              }}
                            ></div>
                          </Form.Group>
                        </Col>
                        <Col mb="3">
                          <Form.Group>
                            <Form.Label>Logo</Form.Label>
                            <Form.Control disabled value={material.logoUrl} />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col mb="3">
                          <Form.Group>
                            <br />
                            <Form.Label>Banners</Form.Label>
                            {material.bannerUrl1 == null ? (
                              <></>
                            ) : (
                              <>
                                <button
                                className="secondary-button"
                                style={{
                                    marginTop: "2vh",
                                    minWidth: "200px",
                                    maxHeight: "20px",
                                  }}
                                  onClick={(e) =>
                                    handleDownload(material.bannerUrl1, e)
                                  }
                                >
                                  Download image
                                </button>
                              </>
                            )}
                            {material.bannerUrl2 == null ? (
                              <></>
                            ) : (
                              <>
                                <button
                                className="secondary-button"
                                style={{
                                    marginTop: "2vh",
                                    minWidth: "200px",
                                    maxHeight: "20px",
                                  }}
                                  onClick={(e) =>
                                    handleDownload(material.bannerUrl2, e)
                                  }
                                >
                                  Download image
                                </button>
                              </>
                            )}
                            {material.bannerUrl3 == null ? (
                              <></>
                            ) : (
                              <>
                                <button
                                className="secondary-button"
                                style={{
                                    marginTop: "2vh",
                                    minWidth: "200px",
                                    maxHeight: "20px",
                                  }}
                                  onClick={(e) =>
                                    handleDownload(material.bannerUrl3, e)
                                  }
                                >
                                  Download image
                                </button>
                              </>
                            )}
                            {material.bannerUrl4 == null ? (
                              <></>
                            ) : (
                              <>
                                <button
                                className="secondary-button"
                                style={{
                                    marginTop: "2vh",
                                    minWidth: "200px",
                                    maxHeight: "20px",
                                  }}
                                  onClick={(e) =>
                                    handleDownload(material.bannerUrl4, e)
                                  }
                                >
                                  Download image
                                </button>
                              </>
                            )}
                            {material.bannerUrl5 == null ? (
                              <></>
                            ) : (
                              <>
                                <button
                                className="secondary-button"
                                style={{
                                    marginTop: "2vh",
                                    minWidth: "200px",
                                    maxHeight: "20px",
                                  }}
                                  onClick={(e) =>
                                    handleDownload(material.bannerUrl5, e)
                                  }
                                >
                                  Download image
                                </button>
                              </>
                            )}
                            {material.bannerUrl6 == null ? (
                              <></>
                            ) : (
                              <>
                                <button
                                className="secondary-button"
                                style={{
                                    marginTop: "2vh",
                                    minWidth: "200px",
                                    maxHeight: "20px",
                                  }}
                                  onClick={(e) =>
                                    handleDownload(material.bannerUrl6, e)
                                  }
                                >
                                  Download image
                                </button>
                              </>
                            )}
                          </Form.Group>
                        </Col>
                      </Row>
                            {material.videoUrl == null ? (
                              <></>
                            ) : (
                              <>
                              <Row>
                              <Col mb="3">
                          <Form.Group>
                            <br />
                            <Form.Label>Video</Form.Label>
                                <button
                                className="secondary-button"
                                style={{
                                    marginTop: "2vh",
                                    minWidth: "200px",
                                    maxHeight: "20px",
                                  }}
                                  onClick={(e) =>
                                    handleVideo(material.videoUrl, e)
                                  }
                                >
                                  Download Video
                                </button>
                              </Form.Group>
                              </Col>
                              </Row>
                              </>
                            )}
                    </Form>
                  </>
                ))}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}
