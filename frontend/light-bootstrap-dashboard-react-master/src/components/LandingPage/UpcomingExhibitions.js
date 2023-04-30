import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button, Form, Col, Modal, Row, Table } from "react-bootstrap";

export default function UpcomingExhibitions() {
  const [exhibitions, setExhibitions] = useState([]);
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [inquire, setInquire] = useState(false);
  const [exhibition, setExhibition] = useState({});

  const RegisterURL = "http://localhost:8080/api/auth/exhibitorRegistration";
  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nic, setNIC] = useState("");
  const [tel, setTel] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [exId, setExId] = useState("");

  function register(e) {
    e.preventDefault();
    if (password === rePassword) {
      axios
        .post(RegisterURL, {
          emailAddress: email,
          name: name,
          contactNo: tel,
          nic: nic,
          password: password,
          company: company,
          exhibitionId: exId,
        })
        .then((res) => {
          console.log(res.data);
          setShowModal(true);
          setNotification(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      setShowModal(true);
      setNotification("Passwords do not match!");
    }
  }

  const handleClose = () => {
    setShow(false);
    setShowDetails(false);
  };

  const handleInquiry = (id) => {
    setExId(id);
    setShowDetails(false);
    setInquire(true);
  };

  const handleShowExhibition = (id) =>
    axios.get(`http://localhost:8080/api/exhibitions/${id}`).then((resOne) => {
      setShowDetails(true);
      setExhibition(resOne.data);
    });

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/exhibitions")
      .then((res) => {
        console.log(res.data);
        const filteredExhibitions = res.data.filter(
          (item) =>
          item.over === false && item.start === false
        );
        setExhibitions(filteredExhibitions);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const BootyPagination = ({
    rowsPerPage,
    rowCount,
    onChangePage,
    currentPage,
  }) => {
    const handleBackButtonClick = () => {
      onChangePage(currentPage - 1);
    };

    const handleNextButtonClick = () => {
      onChangePage(currentPage + 1);
    };

    const handlePageNumber = (e) => {
      onChangePage(Number(e.target.value));
    };

    const pages = getNumberOfPages(rowCount, rowsPerPage);
    const pageItems = toPages(pages);
    const nextDisabled = currentPage === pageItems.length;
    const previosDisabled = currentPage === 1;
    return (
      <nav>
        <ul className="pagination">
          <li className="page-item">
            <button
              className="page-link"
              onClick={handleBackButtonClick}
              disabled={previosDisabled}
              aria-disabled={previosDisabled}
              aria-label="previous page"
            >
              Previous
            </button>
          </li>
          {pageItems.map((page) => {
            const className =
              page === currentPage ? "page-item active" : "page-item";

            return (
              <li key={page} className={className}>
                <button
                  className="page-link"
                  onClick={handlePageNumber}
                  value={page}
                >
                  {page}
                </button>
              </li>
            );
          })}
          <li className="page-item">
            <button
              className="page-link"
              onClick={handleNextButtonClick}
              disabled={nextDisabled}
              aria-disabled={nextDisabled}
              aria-label="next page"
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    );
  };

  function getNumberOfPages(rowCount, rowsPerPage) {
    return Math.ceil(rowCount / rowsPerPage);
  }

  function toPages(pages) {
    const results = [];

    for (let i = 1; i < pages; i++) {
      results.push(i);
    }

    return results;
  }

  const columns = [
    {
      name: "Name",
      selector: (row) => row.exhibitionName,
      sortable: true,
    },
    {
      name: "Date",
      selector: (row) => row.datetime,
      sortable: true,
    },
    {
      name: "View Exhibition Owner Details",
      selector: (row) => (
        <button
          style={{ fontSize: "12px", borderRadius: "20px" }}
          className="secondary-button"
          size="sm"
          onClick={() => handleShowExhibition(row.id)}
        >
          View
        </button>
      ),
    },
  ];

  function filterData(exhibitions, searchKey) {
    const result = exhibitions.filter((exhibition) =>
      String(exhibition.exhibitionName).toLowerCase().includes(searchKey)
    );
    setExhibitions(result);
  }

  function handleSearchArea(e) {
    const searchKey = e.currentTarget.value;
    axios
      .get("http://localhost:8080/api/exhibitions")
      .then((res) => {
        filterData(res.data, searchKey);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const SearchExhibition = (
    <div className="col-lg-3 mt-2 mb-2">
      <input
        className="form-control"
        type="search"
        placeholder="Search exhibition"
        name="searchQuery"
        onChange={handleSearchArea}
      ></input>
    </div>
  );

  const RegisterExhibitor = (exhibitionOwner) => {};

  const GetFreeTicket = (exhibitionId, userId, userType, price) => {
    const newPayment = {
      exhibitionId: exhibitionId,
      userId: userId,
      userType: userType,
      amount: price,
    };
    axios
      .post("http://localhost:8080/api/payments", newPayment)
      .then((res) => {
        console.log("done");
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <div className="home-container" style={{ background: "white" }}>
        <br />
        <h4 className="text-center">UPCOMING EXHIBITIONS</h4>
        <p className="text-center">
          {" "}
          Join as an exhibitor and level up your marketing strategy
        </p>
        <div>
          <DataTable
            responsive
            subHeader
            columns={columns}
            data={exhibitions}
            subHeaderComponent={SearchExhibition}
            striped={true}
            highlightOnHover={true}
            pagination
            paginationComponent={BootyPagination}
            defaultSortFieldID={1}
          />
          <Modal size="lg" show={inquire} onHide={() => handleClose()}>
            <Modal.Header
              style={{ backgroundColor: "#002D62", color: "white" }}
            >
              <Modal.Title>
                Fill your details to register as an exhibitor
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="card" style={{ margin: "20px", border: "none" }}>
                <div className="card-body">
                  <ul>
                    <li>
                      Once the exhibition owner approves yourinquiry you'll get
                      notified via an email
                    </li>
                    <li>
                      Log into your account and make the payment when selecting
                      the stall
                    </li>
                    <li>Upload your marketing materials and exhibits</li>
                  </ul>
                  <Form>
                    <Row>
                      <Col className="mb-3" md="6">
                        <Form.Group>
                          <Form.Label>Full Name</Form.Label>
                          <Form.Control
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Enter full name"
                          />
                        </Form.Group>
                      </Col>
                      <Col className="mb-3" md="6">
                        <Form.Group>
                          <Form.Label>Email Address</Form.Label>
                          <Form.Control
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Enter email"
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="mb-3" md="6">
                        <Form.Group>
                          <Form.Label>NIC No</Form.Label>
                          <Form.Control
                            value={nic}
                            onChange={(e) => setNIC(e.target.value)}
                            placeholder="Enter NIC"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                      <Col className="mb-3" md="6">
                        <Form.Group>
                          <Form.Label>Contact No</Form.Label>
                          <Form.Control
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                            placeholder="Enter Contact No"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>Company name</Form.Label>
                          <Form.Control
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                            placeholder="Enter company name"
                            type="text"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col className="mb-3" md="6">
                        <Form.Group>
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                          />
                        </Form.Group>
                      </Col>
                      <Col className="mb-3" md="6">
                        <Form.Group>
                          <Form.Label>Re-Enter Password</Form.Label>
                          <Form.Control
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            type="password"
                            placeholder="Password"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Form.Group>
                      <button
                        onClick={(e) => register(e)}
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
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setInquire(false)}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Modal size="lg" show={showDetails} onHide={() => handleClose()}>
            <Modal.Header
              style={{ backgroundColor: "#002D62", color: "white" }}
            >
              <Modal.Title>Exhibition Owner Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="card" style={{ margin: "20px", border: "none" }}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img src="https://img.icons8.com/fluency/48/null/microsoft-admin.png" />
                      </div>
                      <hr></hr>
                      <dl className="d-flex align-items-center">
                        <dl className="row">
                          <hr></hr>
                          <dt className="col-lg-5">Name</dt>
                          <dd className="col-lg-7">
                            {!showDetails
                              ? null
                              : exhibition.exhibitionOwner.name}
                          </dd>
                          <hr></hr>
                          <dt className="col-lg-5">Email</dt>
                          <dd className="col-lg-7">
                            {!showDetails
                              ? null
                              : exhibition.exhibitionOwner.emailAddress}
                          </dd>
                          <hr></hr>
                          <dt className="col-lg-5">Contact Number</dt>
                          <dd className="col-lg-7">
                            {!showDetails
                              ? null
                              : exhibition.exhibitionOwner.contactNo}
                          </dd>
                          <hr></hr>
                          <dt className="col-lg-5">NIC</dt>
                          <dd className="col-lg-7">
                            {!showDetails
                              ? null
                              : exhibition.exhibitionOwner.nic}
                          </dd>
                          <hr></hr>
                          <dt className="col-lg-5">Company</dt>
                          <dd className="col-lg-7">
                            {!showDetails
                              ? null
                              : exhibition.exhibitionOwner.company}
                          </dd>
                          <hr></hr>
                          <dt className="col-lg-5">Inquire</dt>
                          <dd className="col-lg-7">
                            <button
                              style={{ fontSize: "14px", borderRadius: "10px" }}
                              className="secondary-button"
                              size="sm"
                              onClick={() =>
                                handleInquiry(exhibition.exhibitionId)
                              }
                            >
                              Inquire
                            </button>
                          </dd>
                        </dl>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => handleClose()}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
}
