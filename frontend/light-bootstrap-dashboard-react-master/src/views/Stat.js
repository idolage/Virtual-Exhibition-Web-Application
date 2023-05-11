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
    const [sum, setSum] = useState([]);
    const [avg, setAvg] = useState([]);
    const [max, setMax] = useState([]);
    const [min, setMin] = useState([]);

    let exhibitionNames = [];
    let exhibitionUsers = [];
    let sumP = [];
    let avgP = [];
    let maxP = [];
    let minP = [];

    useEffect(() => {
        axios
          .get("http://localhost:8080/api/exhibitions", {
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
          })
          .then((res) => {
            const sumP = [];
            const avgP = [];
            const maxP = [];
            const minP = [];
            const exhibitionNames = [];
            const exhibitionUsers = [];

            res.data.forEach((ex) => {
              exhibitionNames.push(ex.exhibitionName);
              exhibitionUsers.push(ex.visitedUsers);
              if (ex.over && !ex.start) {
                axios
                  .get(
                    "http://localhost:8080/api/stats/exhibition/sum/" + ex.id,
                    {
                      headers: {
                        Authorization: localStorage.getItem("jwt"),
                      },
                    }
                  )
                  .then((response) => {
                    const tempSum = { id: ex.id, sum: response.data };
                    sumP.push(tempSum);
                    setSum(sumP); // Update the state of sum
                    localStorage.setItem("sum", JSON.stringify(sumP)); // Persist the updated state value in local storage
                  })
                  .catch((e) => {
                    console.log(e);
                  });

                axios
                  .get(
                    "http://localhost:8080/api/stats/exhibition/avg/" + ex.id,
                    {
                      headers: {
                        Authorization: localStorage.getItem("jwt"),
                      },
                    }
                  )
                  .then((response) => {
                    const tempAvg = { id: ex.id, avg: response.data };
                    avgP.push(tempAvg);
                    setAvg(avgP); // Update the state of avg
                    localStorage.setItem("avg", JSON.stringify(avgP)); // Persist the updated state value in local storage
                  })
                  .catch((e) => {
                    console.log(e);
                  });

                axios
                  .get(
                    "http://localhost:8080/api/stats/exhibition/max/" + ex.id,
                    {
                      headers: {
                        Authorization: localStorage.getItem("jwt"),
                      },
                    }
                  )
                  .then((response) => {
                    const tempMax = { id: ex.id, max: response.data };
                    maxP.push(tempMax);
                    setMax(maxP); // Update the state of max
                    localStorage.setItem("max", JSON.stringify(maxP)); // Persist the updated state value in local storage
                  })
                  .catch((e) => {
                    console.log(e);
                  });

                axios
                  .get(
                    "http://localhost:8080/api/stats/exhibition/min/" + ex.id,
                    {
                      headers: {
                        Authorization: localStorage.getItem("jwt"),
                      },
                    }
                  )
                  .then((response) => {
                    const tempMin = { id: ex.id, min: response.data };
                    minP.push(tempMin);
                    setMin(minP); // Update the state of min
                    localStorage.setItem("min", JSON.stringify(minP)); // Persist the updated state value in local storage
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }
            });

            setExhibitions(res.data);
            setFetch(true);
            setExhibitionUsers(exhibitionUsers);
            setExhibitionNames(exhibitionNames);
          })
          .catch((e) => {
            console.log(e);
          });
    }, []);


    // useEffect(() => {
    //     localStorage.setItem('sum', JSON.stringify(sum));
    //     localStorage.setItem('avg', JSON.stringify(avg));
    //     localStorage.setItem('max', JSON.stringify(max));
    //     localStorage.setItem('min', JSON.stringify(min));
    // }, [sum]);

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
        console.log("lk")
        if(!exhibition.over && !exhibition.start){
            return (<button
                style={{ fontSize: "12px", borderRadius: "20px" }}
                type="button"
                className="btn btn-warning text-align"
            >
                Not Yet Started
            </button>)
        }else if(!exhibition.over && exhibition.start){
            return (<button
                style={{ fontSize: "12px", borderRadius: "20px" }}
                type="button"
                className="btn btn-success text-align"
            >
                Running
            </button>)
        }
        else{
            const sumArray = sum.map((su) => {
                if (su.id === exhibition.id) {
                    return <div>{su.sum}</div>;
                } else {
                    return null;
                }
            });

            return <div>{sumArray}</div>;
        }
    }

    function getAvg(exhibition){
        if(!exhibition.over && !exhibition.start){
            return (<button
                style={{ fontSize: "12px", borderRadius: "20px" }}
                type="button"
                className="btn btn-warning text-align"
            >
                Not Yet Started
            </button>)
        }else if(!exhibition.over && exhibition.start){
            return (<button
                style={{ fontSize: "12px", borderRadius: "20px" }}
                type="button"
                className="btn btn-success text-align"
            >
                Running
            </button>)
        }
        else{
            const avgArray = avg.map((av) => {
                if (av.id === exhibition.id) {
                    return <div>{av.avg}</div>;
                } else {
                    return null;
                }
            });

            return <div>{avgArray}</div>;
        }
    }

    function getMax(exhibition){
        if(!exhibition.over && !exhibition.start){
            return (<button
                style={{ fontSize: "12px", borderRadius: "20px" }}
                type="button"
                className="btn btn-warning text-align"
            >
                Not Yet Started
            </button>)
        }else if(!exhibition.over && exhibition.start){
            return (<button
                style={{ fontSize: "12px", borderRadius: "20px" }}
                type="button"
                className="btn btn-success text-align"
            >
                Running
            </button>)
        }
        else{
            const maxArray = max.map((ma) => {
                if (ma.id === exhibition.id) {
                    return <div>{ma.max}</div>;
                } else {
                    return null;
                }
            });

            return <div>{maxArray}</div>;
        }
    }

    function getMin(exhibition){
        if(!exhibition.over && !exhibition.start){
            return (<button
                style={{ fontSize: "12px", borderRadius: "20px" }}
                type="button"
                className="btn btn-warning text-align"
            >
                Not Yet Started
            </button>)
        }else if(!exhibition.over && exhibition.start){
            return (<button
                style={{ fontSize: "12px", borderRadius: "20px" }}
                type="button"
                className="btn btn-success text-align"
            >
                Running
            </button>)
        }
        else{
            const minArray = min.map((mi) => {
                if (mi.id === exhibition.id) {
                    return <div>{mi.min}</div>;
                } else {
                    return null;
                }
            });

            return <div>{minArray}</div>;
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
          .get("http://localhost:8080/api/exhibitions", {
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
          })
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
