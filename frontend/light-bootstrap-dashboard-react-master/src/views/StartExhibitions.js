import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

const Carousel = ({ data }) => {
  const [page, setPage] = useState(0);
  const [cards, setCards] = useState([]);
  const [cardsPerPage, setCardsPerPage] = useState(1);
  const [start, setStart] = useState(true);

  useEffect(() => {
    // Divide the data into pages of cardsPerPage cards each
    const pages = [];
    let i = 0;
    while (i < data.length) {
      pages.push(data.slice(i, i + cardsPerPage));
      i += cardsPerPage;
    }
    setCards(pages);
  }, [data, cardsPerPage]);

  const handlePrev = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const cardStyle = {
    width: "300px",
    marginRight: "10px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    borderRadius: "5px",
    overflow: "hidden",
  };

  const titleStyle = {
    fontWeight: "bold",
  };

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setCardsPerPage(1);
    } else {
      setCardsPerPage(3);
    }
  };

  function handleStart(id) {
    axios
      .put(`http://localhost:8080/api/exhibitions/${id}/start?start=true`)
      .then((res) => {
        window.location.reload();
      });
  }

  function handleEnd(id) {
    axios
      .put(`http://localhost:8080/api/exhibitions/${id}/start?start=false`)
      .then((res) => {
        window.location.reload();
      });
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "nowrap",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {cards[page] &&
          cards[page].map((card, index) => (
            <Card key={index} style={cardStyle}>
              <Card.Body>
                <Card.Title style={titleStyle}>
                  <div className="row">
                    <div className="col-3">
                      <img src="https://img.icons8.com/external-smashingstocks-isometric-smashing-stocks/55/null/external-Exhibition-art-and-culture-smashingstocks-isometric-smashing-stocks.png" />
                    </div>
                    <div className="col-9">
                      {card.exhibitionName ? (
                        <>{card.exhibitionName}</>
                      ) : (
                        <>No name</>
                      )}{" "}
                    </div>
                  </div>
                </Card.Title>
                <Card.Text>
                  Date: {card.datetime}
                  <br />
                  Active Users: {card.noOfUsers}
                </Card.Text>
                <Card.Text>Active Users: {card.noOfUsers}</Card.Text>
                <Card.Text>Visited Users:{card.visitedUsers}</Card.Text>
                <Card.Text>Ticket Price:{card.ticketPrice}</Card.Text>
                <span
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    justifyItems: "center",
                  }}
                >
                  {!card.start && !card.over ? (
                    <button
                      style={{
                        fontSize: "12px",
                        borderRadius: "20px",
                        marginTop: "2vh",
                        minWidth: "10vw",
                      }}
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleStart(card.id)}
                    >
                      Start
                    </button>
                  ) : card.start && !card.over ? (
                    <button
                      style={{
                        fontSize: "12px",
                        borderRadius: "20px",
                        marginTop: "2vh",
                        minWidth: "10vw",
                      }}
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleEnd(card.id)}
                    >
                      End
                    </button>
                  ) : card.over ? (
                    <>Exhibition Ended</>
                  ) : (
                    <></>
                  )}
                </span>
              </Card.Body>
            </Card>
          ))}
      </div>
      <div className="mx-4">
        <button onClick={handlePrev} disabled={page === 0}>
          <i className="fas fa-chevron-left"></i>
        </button>
        <button onClick={handleNext} disabled={page === cards.length - 1}>
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <br />
      <br />
    </div>
  );
};

export default Carousel;
