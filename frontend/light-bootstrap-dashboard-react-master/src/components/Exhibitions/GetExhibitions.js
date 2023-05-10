import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button, Modal } from "react-bootstrap";
import AttendPayment from "./AttendPayment";
import EditExhibition from "../../views/EditExhibition";

export default function GetExhibitions() {
  const history = useHistory();
  const [exhibitions, setExhibitions] = useState([]);
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [exhibition, setExhibition] = useState({});
  const [activeUsers, setActiveUsers] = useState(0);
  let var1 = 0;

  const handleClose = () => {
    setShow(false);
    setShowDetails(false);
  };

  const handleShowExhibition = (id) =>
    axios
      .get(`http://localhost:8080/api/exhibitions/${id}`, {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((resOne) => {
        setShowDetails(true);
        setExhibition(resOne.data);
      });

  useEffect(() => {
    var1 = 0;
    axios.get("http://localhost:8080/api/exhibitions"),
      {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      }
        .then((res) => {
          console.log(res.data);
          setExhibitions(res.data);
          res.data.map((users) => {
            var1 = users.noOfUsers + var1;
          });
          setActiveUsers(var1);
        })
        .catch((e) => {
          console.log(e);
        });
  }, [exhibition]);

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
      name: "Status",
      selector: (row) => returnStatus(row.start, row.over),
      sortable: true,
    },
    {
      name: "View",
      selector: (row) => (
        <Button
          style={{ fontSize: "12px", borderRadius: "20px" }}
          variant="primary"
          size="sm"
          onClick={() => handleShowExhibition(row.id)}
        >
          View
        </Button>
      ),
    },
  ];

  function returnStatus(start, over) {
    if (start) {
      return (
        <button
          style={{ fontSize: "12px", borderRadius: "20px" }}
          type="button"
          className="btn btn-success"
        >
          Started
        </button>
      );
    } else if (!over) {
      return (
        <button
          style={{ fontSize: "12px", borderRadius: "20px" }}
          type="button"
          className="btn btn-warning text-align"
        >
          Not Yet Started
        </button>
      );
    } else {
      return (
        <button
          style={{ fontSize: "12px", borderRadius: "20px" }}
          type="button"
          className="btn btn-danger text-align"
        >
          Finished
        </button>
      );
    }
  }

  function filterData(exhibitions, searchKey) {
    const result = exhibitions.filter((exhibition) =>
      String(exhibition.exhibitionName).toLowerCase().includes(searchKey)
    );
    setExhibitions(result);
  }

  function handleSearchArea(e) {
    const searchKey = e.currentTarget.value;
    axios.get("http://localhost:8080/api/exhibitions"),
      {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      }
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

  const GetFreeTicket = (exhibitionId, userId, userType, price) => {
    const newPayment = {
      exhibitionId: exhibitionId,
      userId: userId,
      userType: userType,
      amount: price,
    };
    axios.post("http://localhost:8080/api/payments", newPayment),
      {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      }
        .then((res) => {
          console.log("done");
        })
        .catch((e) => {
          console.log(e);
        });
  };

  return (
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
      <Modal size="lg" show={showDetails} onHide={() => handleClose()}>
        <Modal.Header style={{ backgroundColor: "#002D62", color: "white" }}>
          <Modal.Title>Exhibition Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="card" style={{ margin: "20px", border: "none" }}>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-12">
                  <h5
                    className="card-title"
                    style={{ textAlign: "center", textTransform: "uppercase" }}
                  >
                    {exhibition.exhibitionName}
                  </h5>
                  <br></br>
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://img.icons8.com/external-smashingstocks-isometric-smashing-stocks/55/null/external-Exhibition-art-and-culture-smashingstocks-isometric-smashing-stocks.png" />
                  </div>
                  <hr></hr>
                  <dl className="d-flex align-items-center">
                    <dl className="row">
                      <dt className="col-lg-5">Date</dt>
                      <dd className="col-lg-7">{exhibition.datetime}</dd>
                      <hr></hr>
                      <dt className="col-lg-5">Exhibition ID</dt>
                      <dd className="col-lg-7">{exhibition.exhibitionId}</dd>
                      <hr></hr>
                      <dt className="col-lg-5">Status</dt>
                      <dd className="col-lg-7">
                        {exhibition.start? (
                          <div>Started</div>
                        ) : !exhibition.over ? (
                          <div>Not yet started</div>
                        ) : (
                          <div>Ended</div>
                        )}
                      </dd>
                      <hr></hr>
                      {/*<dt className="col-lg-5">Active Users</dt>*/}
                      {/*<dd className="col-lg-7">{exhibition.noOfUsers}</dd>*/}
                      <dt className="col-lg-5"></dt>
                      {localStorage.getItem("userRole") === "ATTENDEE" && (
                      <dd className="col-lg-7">
                        {exhibition.over ? (
                          <Button
                            style={{ fontSize: "12px", borderRadius: "20px" }}
                            variant="secondary"
                            size="sm"
                          >
                            Ended
                          </Button>
                        ) : exhibition.start && activeUsers == 10 ? (
                          <Button
                            style={{ fontSize: "12px", borderRadius: "20px" }}
                            variant="danger"
                            size="md"
                          >
                            Sorry Exhibition is Full. Please try again later!
                          </Button>
                        ) : (
                          <>
                            {exhibition.ticketPrice == 0 ? (
                              <Button
                                style={{
                                  fontSize: "14px",
                                  borderRadius: "10px",
                                }}
                                variant="success"
                                size="sm"
                                onClick={() =>
                                  GetFreeTicket(
                                    exhibition.exhibitionId,
                                    "abc@gmail.com",
                                    "ATTENDEE",
                                    0
                                  )
                                }
                              >
                                Free
                              </Button>
                            ) : (
                              <>
                                USD&nbsp;{exhibition.ticketPrice}&nbsp;
                                <AttendPayment
                                  exhibitionId={exhibition.exhibitionId}
                                  userId={localStorage.getItem("email")}
                                  userType={"ATTENDEE"}
                                  price={parseInt(exhibition.ticketPrice)}
                                ></AttendPayment>
                              </>
                            )}
                          </>
                        )}
                        <br></br>
                      </dd>)}
                    </dl>
                  </dl>
                  <h5
                    className="card-title"
                    style={{ textAlign: "center", textTransform: "uppercase" }}
                  >
                    Exhibition Owner Details
                  </h5>
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://img.icons8.com/fluency/48/null/microsoft-admin.png" />
                  </div>
                  <hr></hr>
                  <dl className="d-flex align-items-center">
                    <dl className="row">
                      <hr></hr>
                      <dt className="col-lg-5">Name</dt>
                      <dd className="col-lg-7">
                        {!showDetails ? null : exhibition.exhibitionOwner.name}
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
                        {!showDetails ? null : exhibition.exhibitionOwner.nic}
                      </dd>
                      <hr></hr>
                      <dt className="col-lg-5">Company</dt>
                      <dd className="col-lg-7">
                        {!showDetails
                          ? null
                          : exhibition.exhibitionOwner.company}
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
          {!showDetails ? null : exhibition.exhibitionOwner.emailAddress ===
            localStorage.getItem("email") ? (
            <Button
              variant="primary"
              onClick={() =>
                history.push("/editExhibition", { exhibitionId: exhibition.id })
              }
            >
              Edit
            </Button>
          ) : null}
        </Modal.Footer>
      </Modal>
    </div>
  );
}
