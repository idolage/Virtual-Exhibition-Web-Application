import React, {useState, useEffect, useRef} from 'react'
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto"
import DataTable from "react-data-table-component";

import {
    Card,
    Table,
    Container,
    Row,
    Col, Button,
} from "react-bootstrap";

export default function Stat() {
    const [stats, setStats] = useState([]);
    const [count, setCount] = useState(0);
    const [exhibitions, setExhibitions] = useState([]);
    const [fetch, setFetch] = useState(false);
    const [exhibitionNamesB, setExhibitionNames] = useState([]);
    const [exhibitionUsersB, setExhibitionUsers] = useState([]);
    const [sum, setSum] = useState(0);
    let sumTot;
    let avg;
    let min;
    let max;

    let exhibitionNames = [];
    let exhibitionUsers = [];

    useEffect(() => {
        const fetchStats = async () => {
          try {
              axios.get("http://localhost:8080/api/exhibitions")
                  .then((res)=>{
                      setExhibitions(res.data);
                      setFetch(true);
                      res.data.forEach((ex)=>{
                          exhibitionNames.push(ex.exhibitionName);
                          exhibitionUsers.push(ex.visitedUsers);
                      })
                      setExhibitionUsers(exhibitionUsers);
                      setExhibitionNames(exhibitionNames);
                  })
                  .catch((e)=>{
                      console.log(e);
                  })
            // const response = await axios.get("http://localhost:8080/api/stats");
            // setStats(response.data);
          } catch (e) {
            console.error(e);
          }
        };
        fetchStats();
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
            name: "Total Duration",
            selector: (row) => getSum(row),
            sortable: true,
        },
        {
            name: "Average Duration",
            selector: (row) => getAvg(row),
            sortable: true,
        },
        {
            name: "Max Duration",
            selector: (row) => getMax(row),
            sortable: true,
        },
        {
            name: "Min Duration",
            selector: (row) => getMin(row),
            sortable: true,
        },
    ];

    function getSum(exhibition){
        let sumTemp = 0;
        if(!exhibition.over && !exhibition.start){
            return (<div>Not yet started</div>)
        }else{
            axios.get("http://localhost:8080/api/stats/exhibition/sum/" + exhibition.id).then((res) => {
                sumTot=res.data;
            }).catch((e) => {
            })
            return (<div>{sumTot}</div>);
        }
    }

    function getAvg(exhibition){
        let sumTemp = 0;
        if(!exhibition.over && !exhibition.start){
            return (<div>Not yet started</div>)
        }else{
            axios.get("http://localhost:8080/api/stats/exhibition/avg/" + exhibition.id).then((res) => {
                sumTemp=res.data;
                return (<div>{res.data}</div>);
            }).catch((e) => {
            })
            return (<div>{sumTemp}</div>);
        }
    }

    function getMax(exhibition){
        let sumTemp = 0;
        if(!exhibition.over && !exhibition.start){
            return (<div>Not yet started</div>)
        }else{
            axios.get("http://localhost:8080/api/stats/exhibition/max/" + exhibition.id).then((res) => {
                sumTemp=res.data;
                return (<div>{res.data}</div>);
            }).catch((e) => {
            })
            return (<div>{sumTemp}</div>);
        }
    }

    function getMin(exhibition){
        let sumTemp = 0;
        if(!exhibition.over && !exhibition.start){
            return (<div>Not yet started</div>)
        }else{
            axios.get("http://localhost:8080/api/stats/exhibition/min/" + exhibition.id).then((res) => {
                sumTemp=res.data;
                return (<div>{res.data}</div>);
            }).catch((e) => {
            })
            return (<div>{sumTemp}</div>);
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

    let barData = {
        labels: exhibitionNamesB,
        datasets: [
            {
                label: "Visited Users",
                backgroundColor: [
                    "#002366",
                    "#FFD12A",
                    "#DE5D83",
                    "#87A96B",
                    "#007BA7",
                    "#5D8AA8",
                    "#318CE7",
                    "#A1CAF1",
                    "#002366",
                    "#120A8F",
                    "#003399",
                    "#1560BD",
                    "#3B444B",
                    "#7FFFD4",
                    "#CC5500",
                    "#A0785A",
                    "#00CC99",
                    "#FFEF00",
                ],
                borderWidth: 1,
                data: exhibitionUsersB,
            },
        ],
    };

  return (
    <>
    <Container fluid>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <Card.Title as="h4">Statistics</Card.Title>
              </Card.Header>
              <Card.Body>
                  <DataTable
                      title="Exhibition Stats"
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
            {/*<td>{getDurationStats(item.exhibitionId).avg.toFixed(2)}</td>*/}
            {/*<td>{getDurationStats(item.exhibitionId).median.toFixed(2)}</td>*/}
            {/*<td>{getDurationStats(item.exhibitionId).max.toFixed(2)}</td>*/}
            {/*<td>{getDurationStats(item.exhibitionId).min.toFixed(2)}</td>*/}
              </Card.Body>
            </Card>
              <Card>
                  <Card.Header>
                      <Card.Title as="h4">User Count</Card.Title>
                  </Card.Header>
                  <Card.Body>
                  <Bar
                      data={barData}
                      options={{
                          title: {
                              display: true,
                              text: "Number of Visited Users",
                              fontSize: 20,
                          },
                          legend: {
                              display: true,
                              position: "right",
                          },
                      }}
                  />
              
                </Card.Body>
                </Card>
                </Col>
                </Row>
                </Container>
                </>
  )
}
