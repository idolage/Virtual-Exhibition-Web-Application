import React, { useState, useEffect } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import routes from "routes.js";
import sidebarImage from "assets/img/sidebar-3.jpg";
import { Button, Card, Col } from "react-bootstrap";
import AgoraUIKit, { layout } from "agora-react-uikit";
import Axios from "axios";

function LiveStream() {
  const [exhibitionId, setExhibitionId] = React.useState();
  const [stallId, setStallId] = React.useState();

  const appId = "2ce678e703a841f185e2e312a9bdf2e0";
  const appCertificate = "6e1ab42a2c0043d4a316f863bf036c38";

  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);

  const [videoCall, setVideoCall] = useState(false);

  const [rtcProps, setRtcProps] = useState({
    appId: appId,
    channel: "",
    token: "",
    role: "host",
    layout: layout.grid,
  });

  const storedEmail = localStorage.getItem("email");

  useEffect(() => {
    console.log("stored Email:" + storedEmail);
    const fetchStallDetails = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:8080/api/stalls/${storedEmail}`
        );
        if (response.data[0] !== null) {
          setExhibitionId(response.data[0].exhibitionId);
          setStallId(response.data[0].stallId);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchStallDetails();
  }, []);

  const styleProps = {
    localBtnContainer: { backgroundColor: "#007bff" },
  };

  const callbacks = {
    EndCall: () => setVideoCall(false),
  };
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

  const styles = {
    container: {
      width: "70vw",
      height: "70vh",
      display: "flex",
      backgroundColor: "#007bff22",
    },
    btn: {
      backgroundColor: "#007bff",
      cursor: "pointer",
      borderRadius: 5,
      padding: 5,
      color: "#ffffff",
      fontSize: 20,
    },
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
  }, [location]);

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      const response1 = await fetch("http://localhost:8080/api/agora/token", {
        method: "PUT",
        body: JSON.stringify({
          appId: appId,
          appCertificate: appCertificate,
          stallId: stallId,
          exhibitionId: exhibitionId,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response1.ok) {
        const response2 = await fetch(
          "http://localhost:8080/api/agora/" + exhibitionId + "/" + stallId,
          {
            method: "GET",
          }
        );
        if (!response2.ok) {
          throw new Error("Failed to join channel.");
        }
        const data = await response2.json(); // parse response data as JSON
        setRtcProps({
          ...rtcProps,
          token: data.token,
          channel: data.channelName,
        });
        console.log(rtcProps);
        setVideoCall(true);
      }
    } catch (err) {
      // setMsg(err.message);
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="container ">
            <Switch>{getRoutes(routes)}</Switch>

            {videoCall ? (
              <div style={styles.container}>
                <AgoraUIKit
                  rtcProps={rtcProps}
                  callbacks={callbacks}
                  styleProps={styleProps}
                />
              </div>
            ) : (
              <Col lg="10">
                <Card style={{ border: "none" }}>
                  <div className="mx-5 my-5">
                    <h4>Live Streaming Portal</h4>
                    <br></br>
                    <p>
                      1. Click on the "Start Streaming" button to start
                      streaming
                    </p>
                    <p>2. You will be redirected to the live stream screen.</p>
                    <p>
                      3. Your live stream will get rendered inside the virtual
                      exhibition platform.
                    </p>
                    <p>4. You can put/unmute your camera and microphones.</p>
                    <br></br>
                    <Button onClick={(e) => handleJoin(e)}>
                      Start Streaming
                    </Button>
                  </div>
                </Card>
              </Col>
            )}
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
export default LiveStream;
