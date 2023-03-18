import React, { useEffect } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import { Container, Carousel, Row, Col, Card } from "react-bootstrap";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import { MantineProvider } from "@mantine/core";
import routes from "routes.js";
import sidebarImage from "assets/img/sidebar-3.jpg";
import "components/Stalls/StallsSelect.css";
import axios from "axios";

function StallsSelect() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const [selectedStall, setSelectedStall] = React.useState(0);
  const [selectedStallTier, setSelectedStallTier] = React.useState(null);
  const [error, setError] = React.useState("");
  const [amount, setAmount] = React.useState(0);
  const [bookedStalls, setBookedStalls] = React.useState([]);
  const location = useLocation();
  const mainPanel = React.useRef(null);
  const getRoutes = (routes) => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={(props) => <prop.component {...props} />}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
      var element = document.getElementById("bodyClick");
      element.parentNode.removeChild(element);
    }
    axios
      .get(
        "http://localhost:8080/api/stalls/booked/5d4a0180-01c8-4ec2-b7d7-2045ecdffe0a"
      )
      .then((res) => {
        setBookedStalls(res.data);
        res.data.forEach((bookedStall) => {
          let divBookedStall = document.getElementById(bookedStall);
          let stall = parseInt(bookedStall);
          if (
            (stall >= 1 && stall < 9) ||
            stall == 22 ||
            stall == 23 ||
            stall == 44 ||
            (stall >= 37 && stall < 44)
          ) {
            divBookedStall.style.backgroundColor = "#0047ab";
          } else if (
            stall == 9 ||
            stall == 14 ||
            stall == 18 ||
            stall == 27 ||
            stall == 31 ||
            stall == 35
          ) {
            divBookedStall.style.backgroundColor = "#ed872d";
          } else {
            divBookedStall.style.backgroundColor = "#00a86b";
          }
        });
      });
  }, [location]);

  function handleSelectedState(stall) {
    const divStall = document.getElementById(String(stall));
    setError("");
    if (bookedStalls.includes(String(stall))) {
      setError("Sorry! the stall you selected was occupied already");
    } else if (stall == selectedStall) {
      setAmount(0);
      setSelectedStall(0);
      setSelectedStallTier(null);
      if (
        (stall >= 1 && stall < 9) ||
        stall == 22 ||
        stall == 23 ||
        stall == 44 ||
        (stall >= 37 && stall < 44)
      ) {
        divStall.style.backgroundColor = "#87ceeb";
        divStall.style.transform = "scale(1)";
      } else if (
        stall == 9 ||
        stall == 14 ||
        stall == 18 ||
        stall == 27 ||
        stall == 31 ||
        stall == 35
      ) {
        divStall.style.backgroundColor = "#ffef00";
        divStall.style.transform = "scale(1)";
      } else {
        divStall.style.backgroundColor = "#b2ec5d";
        divStall.style.transform = "scale(1)";
      }
    } else if (selectedStall == 0) {
      if (
        (stall >= 1 && stall < 9) ||
        stall == 22 ||
        stall == 23 ||
        stall == 44 ||
        (stall >= 37 && stall < 44)
      ) {
        setAmount(100);
        setSelectedStallTier("Platinum ");
        divStall.style.backgroundColor = "#0047ab";
        divStall.style.transform = "scale(1.3)";
        divStall.style.transition = "ease-in 0.5s";
      } else if (
        stall == 9 ||
        stall == 14 ||
        stall == 18 ||
        stall == 27 ||
        stall == 31 ||
        stall == 35
      ) {
        setAmount(300);
        setSelectedStallTier("Diamond ");
        divStall.style.backgroundColor = "#ed872d";
        divStall.style.transform = "scale(1.3)";
        divStall.style.transition = "ease-in 0.5s";
      } else {
        setAmount(500);
        setSelectedStallTier("Gold ");
        divStall.style.backgroundColor = "#00a86b";
        divStall.style.transform = "scale(1.3)";
        divStall.style.transition = "ease-in 0.5s";
      }
      setSelectedStall(stall);
    } else {
      setError("Sorry! you can only select one stall");
    }
  }

  function handlePayment() {
    if (amount == 0) {
      setError("Please select a stall first!");
    } else {
      setError("");
    }
  }

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="container">
            <Switch>{getRoutes(routes)}</Switch>
            <div className="container">
              <label>Pick a stall </label>

              <Row className="showcase">
                <li>
                  <div className="stall"></div>
                  <small>N/A Gold</small>
                </li>
                <li>
                  <div className="stall-sel"></div>
                  <small>Occupied Gold</small>
                </li>
                <li>
                  <div className="pstall"></div>
                  <small>N/A Platinum</small>
                </li>
                <li>
                  <div className="pstall-sel"></div>
                  <small>Occupied Platinum</small>
                </li>
                <li>
                  <div className="dstall"></div>
                  <small>N/A Diamond</small>
                </li>
                <li>
                  <div className="dstall-sel"></div>
                  <small>Occupied Diamond</small>
                </li>
                <li>
                  <div className="entrance"></div>
                  <small>Entrance</small>
                </li>
              </Row>

              <div className="container">
                <div className="row1">
                  <div
                    id="1"
                    className="stall"
                    onClick={() => handleSelectedState(1)}
                  ></div>
                  <div
                    id="2"
                    className="stall"
                    onClick={() => handleSelectedState(2)}
                  ></div>
                  <div
                    id="3"
                    className="stall"
                    onClick={() => handleSelectedState(3)}
                  ></div>
                  <div
                    id="4"
                    className="stall"
                    onClick={() => handleSelectedState(4)}
                  ></div>
                  <div
                    id="5"
                    className="stall"
                    onClick={() => handleSelectedState(5)}
                  ></div>
                  <div
                    id="6"
                    className="stall"
                    onClick={() => handleSelectedState(6)}
                  ></div>
                  <div
                    id="7"
                    className="stall"
                    onClick={() => handleSelectedState(7)}
                  ></div>
                  <div
                    id="8"
                    className="stall"
                    onClick={() => handleSelectedState(8)}
                  ></div>
                </div>
                <div className="row">
                  <div
                    id="9"
                    className="dstall"
                    onClick={() => handleSelectedState(9)}
                  ></div>
                  <div
                    id="10"
                    className="stall"
                    onClick={() => handleSelectedState(10)}
                  ></div>
                  <div
                    id="11"
                    className="stall"
                    onClick={() => handleSelectedState(11)}
                  ></div>
                  <div
                    id="12"
                    className="stall"
                    onClick={() => handleSelectedState(12)}
                  ></div>
                  <div
                    id="13"
                    className="stall"
                    onClick={() => handleSelectedState(13)}
                  ></div>
                  <div
                    id="14"
                    className="dstall"
                    onClick={() => handleSelectedState(14)}
                  ></div>
                  <div
                    id="15"
                    className="stall"
                    onClick={() => handleSelectedState(15)}
                  ></div>
                  <div
                    id="16"
                    className="stall"
                    onClick={() => handleSelectedState(16)}
                  ></div>
                  <div
                    id="17"
                    className="stall"
                    onClick={() => handleSelectedState(17)}
                  ></div>
                  <div
                    id="18"
                    className="dstall"
                    onClick={() => handleSelectedState(18)}
                  ></div>
                  <div
                    id="19"
                    className="stall"
                    onClick={() => handleSelectedState(19)}
                  ></div>
                  <div
                    id="20"
                    className="stall"
                    onClick={() => handleSelectedState(20)}
                  ></div>
                  <div
                    id="21"
                    className="stall"
                    onClick={() => handleSelectedState(21)}
                  ></div>
                </div>
                <div className="row3">
                  <div
                    id="22"
                    className="stall1"
                    onClick={() => handleSelectedState(22)}
                  ></div>
                  <div
                    id="23"
                    className="stall2"
                    onClick={() => handleSelectedState(23)}
                  ></div>
                </div>
                <div className="row">
                  <div
                    id="24"
                    className="stall"
                    onClick={() => handleSelectedState(24)}
                  ></div>
                  <div
                    id="25"
                    className="stall"
                    onClick={() => handleSelectedState(25)}
                  ></div>
                  <div
                    id="26"
                    className="stall"
                    onClick={() => handleSelectedState(26)}
                  ></div>
                  <div
                    id="27"
                    className="dstall"
                    onClick={() => handleSelectedState(27)}
                  ></div>
                  <div
                    id="28"
                    className="stall"
                    onClick={() => handleSelectedState(28)}
                  ></div>
                  <div
                    id="29"
                    className="stall"
                    onClick={() => handleSelectedState(29)}
                  ></div>
                  <div
                    id="30"
                    className="stall"
                    onClick={() => handleSelectedState(30)}
                  ></div>
                  <div
                    id="31"
                    className="dstall"
                    onClick={() => handleSelectedState(31)}
                  ></div>
                  <div
                    id="32"
                    className="stall"
                    onClick={() => handleSelectedState(32)}
                  ></div>
                  <div
                    id="33"
                    className="stall"
                    onClick={() => handleSelectedState(33)}
                  ></div>
                  <div
                    id="34"
                    className="stall"
                    onClick={() => handleSelectedState(34)}
                  ></div>
                  <div
                    id="35"
                    className="dstall"
                    onClick={() => handleSelectedState(35)}
                  ></div>
                  <div
                    id="36"
                    className="stall"
                    onClick={() => handleSelectedState(36)}
                  ></div>
                </div>
                <div className="row5">
                  <div
                    id="37"
                    className="stall"
                    onClick={() => handleSelectedState(37)}
                  ></div>
                  <div
                    id="38"
                    className="stall"
                    onClick={() => handleSelectedState(38)}
                  ></div>
                  <div
                    id="39"
                    className="stall"
                    onClick={() => handleSelectedState(39)}
                  ></div>
                  <div
                    id="40"
                    className="stall"
                    onClick={() => handleSelectedState(40)}
                  ></div>
                  <div
                    id="41"
                    className="stall"
                    onClick={() => handleSelectedState(41)}
                  ></div>
                  <div
                    id="42"
                    className="stall"
                    onClick={() => handleSelectedState(42)}
                  ></div>
                  <div
                    id="43"
                    className="stall"
                    onClick={() => handleSelectedState(43)}
                  ></div>
                  <div className="entrance"></div>
                  <div
                    id="44"
                    className="stall"
                    onClick={() => handleSelectedState(44)}
                  ></div>
                </div>
                {selectedStall == 0 ? (
                  <p className="text">Please select a stall</p>
                ) : (
                  <p className="text">
                    You have selected the number{" "}
                    <span id="count">{selectedStall}</span>{" "}
                    <span id="count">{selectedStallTier}</span>stall
                  </p>
                )}
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => handlePayment()}
                >
                  Payment
                </button>
                <br></br>
                {error == "" ? null : (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
              </div>
              {/* <div>
                Top view of stalls arrangment in the hall
                <img
                  className="responsive"
                  style={{ width: "100%", height: "100%" }}
                  src={require("assets/img/stalls/hall-top.png")}
                ></img>
              </div> */}
            </div>
            <h3>Stall Tiers</h3>
            <div className="row">
              <Col md={4}>
                <div className="card">
                  <Carousel>
                    <Carousel.Item>
                      <img
                        className="d-block"
                        style={{ width: "100%", height: "100%" }}
                        src={require("assets/img/stalls/gold1.png")}
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block"
                        style={{ width: "100%", height: "100%" }}
                        src={require("assets/img/stalls/gold2.png")}
                        alt="Second slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block"
                        style={{ width: "100%", height: "100%" }}
                        src={require("assets/img/stalls/gold3.png")}
                        alt="Third slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                  <div className="card-body">
                    <h4 className="card-title">Gold Tier</h4>
                    <li>Customize stall color</li>
                    <li>Upload banners(Img)</li>
                    <li>Upload brochures(PDF)</li>
                    <li>Voice based communication</li>
                    <br></br>
                    <br></br>
                    <br></br>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="card">
                  <Carousel>
                    <Carousel.Item>
                      <img
                        className="d-block"
                        style={{ width: "100%", height: "100%" }}
                        src={require("assets/img/stalls/platinum1.png")}
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block"
                        style={{ width: "100%", height: "100%" }}
                        src={require("assets/img/stalls/platinum2.png")}
                        alt="Second slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block"
                        style={{ width: "100%", height: "100%" }}
                        src={require("assets/img/stalls/platinum3.png")}
                        alt="Third slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                  <div className="card-body">
                    <h4 className="card-title">Platinum Tier</h4>
                    <li>Customize stall color</li>
                    <li>Upload banners(Img)</li>
                    <li>Upload brochures(PDF)</li>
                    <li>Voice based communication</li>
                    <li>Upload video clips</li>
                    <li>Video streaming</li>
                    <br></br>
                  </div>
                </div>
              </Col>
              <Col md={4}>
                <div className="card">
                  <Carousel>
                    <Carousel.Item>
                      <img
                        className="d-block"
                        style={{ width: "100%", height: "100%" }}
                        src={require("assets/img/stalls/diamond1.png")}
                        alt="First slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block"
                        style={{ width: "100%", height: "100%" }}
                        src={require("assets/img/stalls/diamond2.png")}
                        alt="Second slide"
                      />
                    </Carousel.Item>
                    <Carousel.Item>
                      <img
                        className="d-block"
                        style={{ width: "100%", height: "100%" }}
                        src={require("assets/img/stalls/diamond3.png")}
                        alt="Third slide"
                      />
                    </Carousel.Item>
                  </Carousel>
                  <div className="card-body">
                    <h4 className="card-title">Diamond Tier</h4>
                    <li>Customize stall color</li>
                    <li>Upload banners(Img)</li>
                    <li>Upload brochures(PDF)</li>
                    <li>Voice based communication</li>
                    <li>Upload video clips</li>
                    <li>Video streaming</li>
                    <li>Upload 3D models</li>
                  </div>
                </div>
              </Col>
            </div>
          </div>
          <Footer />
        </div>
      </div>
      <FixedPlugin
        hasImage={hasImage}
        setHasImage={() => setHasImage(!hasImage)}
        color={color}
        setColor={(color) => setColor(color)}
        image={image}
        setImage={(image) => setImage(image)}
      />
    </>
  );
}
export default StallsSelect;
