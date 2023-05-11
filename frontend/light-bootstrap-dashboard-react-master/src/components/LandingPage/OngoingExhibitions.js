import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import DataTable from "react-data-table-component";
import { Button, Modal } from "react-bootstrap";
import Carousel from "./CarouselOngoing";

export default function OngoingExhibitions() {
  const history = useHistory();
  const [exhibitions, setExhibitions] = useState([]);
  const [show, setShow] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [exhibition, setExhibition] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/exhibitions", {
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      })
      .then((res) => {
        console.log(res.data);
        const filteredExhibitions = res.data.filter(
          (item) => item.over === false && item.start === true
        );
        setExhibitions(filteredExhibitions);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <>
      <br />
      <h4 className="text-center">ONGOING EXHIBITIONS</h4>
      <p className="text-center">
        Join now as an attendee and enjoy exhibitions like never before!
      </p>
      <div>
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
