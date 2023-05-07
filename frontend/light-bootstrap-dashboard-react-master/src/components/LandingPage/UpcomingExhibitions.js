import React, { useState, useEffect } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button, Form, Col, Modal, Row, Table } from "react-bootstrap";

import Carousel from "./CarouselUpcoming";

export default function UpcomingExhibitions() {
  const [exhibitions, setExhibitions] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/exhibitions")
      .then((res) => {
        console.log(res.data);
        const filteredExhibitions = res.data.filter(
          (item) => item.over === false && item.start === false
        );
        setExhibitions(filteredExhibitions);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <br></br>
      <div className="home-container" style={{ background: "white" }}>
        <br />
        <h4 className="text-center">UPCOMING EXHIBITIONS</h4>
        <p className="text-center">
          Join as an exhibitor and level up your marketing strategy
        </p>

        <div className="mx-auto">
          {exhibitions.length > 0 ? (
            <Carousel data={exhibitions} />
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
