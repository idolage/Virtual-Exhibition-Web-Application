import React, {  useState, useEffect } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import routes from "routes.js";
import sidebarImage from "assets/img/sidebar-3.jpg";

import AgoraUIKit, {  layout } from "agora-react-uikit";

function LiveStream() {
  const exhibitionID = "B";
  const stallId = "2ce678e703a841f185e2e312a9bdf2e0";
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const location = useLocation();
  const mainPanel = React.useRef(null);

  const [videoCall, setVideoCall] = useState(false);

  const [rtcProps, setRtcProps] = useState({
    appId: "2ce678e703a841f185e2e312a9bdf2e0",
    channel: "",
    token: "",
    role: "host",
    layout:  layout.grid,
  });

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
      const response = await fetch(
        "http://localhost:8080/api/agora/" + exhibitionID +"/"+ stallId,
        {
          method: "GET",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to join channel.");
      }
      const data = await response.json(); // parse response data as JSON
      setRtcProps({
        ...rtcProps,
        token: data.token,
        channel: data.channelName,
      });
      console.log(rtcProps);
      setVideoCall(true);
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
            <div>
              {videoCall ? (
                <div style={styles.container}>
                  <AgoraUIKit
                    rtcProps={rtcProps}
                    callbacks={callbacks}
                    styleProps={styleProps}
                  />
                </div>
              ) : (
                <h3 style={styles.btn} onClick={(e) => handleJoin(e)}>
                  Start Call
                </h3>
              )}
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
export default LiveStream;
