import React, {useState, useEffect} from 'react'
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button, Modal, Card, Row, Col, Container } from "react-bootstrap";

export default function Approve() {
    const [exhibitions, setExhibitions] = useState([]);
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [exhibition, setExhibition] = useState({});

  const [notification, setNotification] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShow(false);
    setShowDetails(false);
  };

  const handleApprove = (id) =>axios.put(`http://localhost:8080/api/exhibitions/approve/${id}`).then((res) => {
    setShowModal(true);
    setNotification(res.data);
  });

  const handleShowExhibition = (id) =>
    axios.get(`http://localhost:8080/api/exhibitions/${id}`).then((resOne) => {
      setShowDetails(true);
      setExhibition(resOne.data);
    });

    useEffect(() => {
        axios
        .get("http://localhost:8080/api/exhibitions") //
        .then((res) => {
            console.log(res.data);
            const filteredExhibitions = res.data.filter(
              (item) =>
              item.approved === false
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
            name: "Details",
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
        {
            name: "Action",
            selector: (row) => (
              <button
                style={{ fontSize: "12px", borderRadius: "20px" }}
                className="secondary-button"
                size="sm"
                onClick={() => handleApprove(row.exhibitionId)}
              >
                Approve
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



  return (
    <>
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
                      <dt className="col-lg-5">Ticket Price</dt>
                      <dd className="col-lg-7">{exhibition.ticketPrice}</dd>
                      {/* <hr></hr>
                      <dt className="col-lg-5">Approve</dt>
                      <dd className="col-lg-7">
                        {exhibition.approved==false?
                        <button
                        style={{ fontSize: "14px", borderRadius: "10px" }}
                        className="secondary-button"
                        size="sm"
                        onClick={()=>handleApprove(exhibition.exhibitionId)}
                        > Approve</button>:"Already approved"}
                      </dd> */}
                      <br/>
                      </dl>
                      </dl>
                  <h5
                      className="card-title"
                      style={{ textAlign: "center", textTransform: "uppercase" }}
                  >
                    Exhibition Owner Details
                  </h5>  
                  <div className="d-flex flex-column align-items-center text-center">
                    <img src="https://img.icons8.com/fluency/48/null/microsoft-admin.png"/>
                  </div>
                  <hr></hr>
                <dl className="d-flex align-items-center">
                    <dl className="row">
                      <hr></hr>
                      <dt className="col-lg-5">Name</dt>
                      <dd className="col-lg-7">
                        {!showDetails?null:exhibition.exhibitionOwner.name}
                      </dd>
                      <hr></hr>
                      <dt className="col-lg-5">Email</dt>
                      <dd className="col-lg-7">
                        {!showDetails?null:exhibition.exhibitionOwner.emailAddress}
                      </dd>
                      <hr></hr>
                      <dt className="col-lg-5">Contact Number</dt>
                      <dd className="col-lg-7">
                        {!showDetails?null:exhibition.exhibitionOwner.contactNo}
                      </dd>
                      <hr></hr>
                      <dt className="col-lg-5">NIC</dt>
                      <dd className="col-lg-7">
                        {!showDetails?null:exhibition.exhibitionOwner.nic}
                      </dd>
                      <hr></hr>
                      <dt className="col-lg-5">Company</dt>
                      <dd className="col-lg-7">
                        {!showDetails?null:exhibition.exhibitionOwner.company}
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
    </>
  )
}
