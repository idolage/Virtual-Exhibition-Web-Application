import React, { Component, useEffect, useState } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import Axios from "axios";
import { Html } from "@react-three/drei";
import Alert from "react-bootstrap/Alert";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import { MantineProvider } from "@mantine/core";
import { AvatarCustomizationProvider } from "contexts/AvatarCustomizationContext";
import routes from "routes.js";
import sidebarImage from "assets/img/sidebar-3.jpg";
import { Canvas } from "@react-three/fiber";
import Experience from "components/AvatarCustomization/Experience";
import Interface from "components/AvatarCustomization/Interface";
import { Button } from "react-bootstrap";

function CustomizeAvatar() {
  const storedEmail = localStorage.getItem("email");
  const [avatarIdVal, setAvatarIdVal] = React.useState("");

  // const avatarIdVal = 1;

  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const [hasModel, setHasModel] = React.useState(false);
  const [hasAvatar, setHasAvtar] = React.useState(false);

  const location = useLocation();
  const mainPanel = React.useRef(null);
  const [err, setErr] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    console.log(storedEmail);
    const fetchAvatarDetails = async () => {
      try {
        const response = await Axios.get(
          `http://localhost:8080/api/avatars/${storedEmail}`,
          {
            headers: {
              Authorization: localStorage.getItem("jwt"),
            },
          }
        );

        console.log(response.data.avatarId);
        if (!response.ok) {
          setHasAvtar(false);
        }
        if (response.data.avatarId !== null) {
          setAvatarIdVal(response.data.avatarId);
          setHasAvtar(true);
          console.log(response.data.avatarId + "JJ" + avatarIdVal);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchAvatarDetails();
  }, []);

  const selectAvatar = async (avatarId) => {
    console.log(avatarId);

    try {
      const response = await fetch("http://localhost:8080/api/avatars/", {
        method: "POST",
        body: JSON.stringify({
          avatarId: avatarId,
          userId: localStorage.getItem("email"),
          userType: localStorage.getItem("userRole"),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
         
        headers: {
          Authorization: localStorage.getItem("jwt"),
        },
      
      });
      if (!response.ok) {
        setErr("Failed to Save the Avatar");
        throw new Error("Failed to save avatar.");
      } else if (response.ok) {
        setSuccess("Avatar Saved, Start Customizing");
        setHasAvtar(true);
        localStorage.setItem("avatarId", avatarId);
      }
    } catch (err) {
      console.log(err.message);
    }
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
  React.useEffect(() => {
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

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="container">
            <Switch>{getRoutes(routes)}</Switch>
            {hasAvatar ? (
              <>
                <div className="col-11">
                  <Alert variant="primary">
                    <p>Customize your avatar by changing colors.</p>
                  </Alert>
                </div>
                <AvatarCustomizationProvider>
                  <div className="row">
                    <div className="col-lg-6 align-self-center">
                      <Canvas
                        camera={{ position: [1, 1.5, 2.5], fov: 50 }}
                        style={{ height: 900 }}
                      >
                        <Experience avatarId={avatarIdVal} />
                      </Canvas>
                    </div>
                    <div className="col-lg-2"></div>
                    <div className="col-lg-4">
                      <span>
                        <Interface />
                      </span>
                    </div>
                  </div>
                </AvatarCustomizationProvider>
              </>
            ) : (
              <div className="col-12">
                <div className="row">
                  <div className="col-11">
                    <Alert variant="primary">
                      <p>
                        Please select one of the below avatars and start
                        customizing.
                      </p>
                    </Alert>

                    {err != "" ? (
                      <Alert variant="danger">
                        <p>{err}</p>
                      </Alert>
                    ) : (
                      <div></div>
                    )}

                    {success != "" ? (
                      <Alert variant="success">
                        <p>{success}</p>
                      </Alert>
                    ) : (
                      <div></div>
                    )}
                  </div>
                </div>
                <AvatarCustomizationProvider>
                  <div className="row">
                    <div className="col-lg-3">
                      <Canvas
                        camera={{ position: [1, 1.5, 2.5], fov: 50 }}
                        style={{ cursor: "pointer", height: 600 }}
                        onClick={() => selectAvatar(1)}
                      >
                        <group>
                          <Experience avatarId={"1"} />
                        </group>
                      </Canvas>
                    </div>

                    <div className="col-lg-3 ">
                      <Canvas
                        camera={{ position: [1, 1.5, 2.5], fov: 50 }}
                        style={{ cursor: "pointer", height: 600 }}
                        onClick={() => selectAvatar(2)}
                      >
                        <Experience avatarId={"2"} />
                      </Canvas>
                    </div>

                    <div className="col-lg-3 ">
                      <Canvas
                        camera={{ position: [1, 1.5, 2.5], fov: 50 }}
                        style={{ cursor: "pointer", height: 600 }}
                        onClick={() => selectAvatar(3)}
                      >
                        <Experience avatarId={"3"} />
                      </Canvas>
                    </div>

                    <div className="col-lg-3 ">
                      <Canvas
                        camera={{ position: [1, 1.5, 2.5], fov: 50 }}
                        style={{ cursor: "pointer", height: 600 }}
                        onClick={() => selectAvatar(4)}
                      >
                        <Experience avatarId={"4"} />
                      </Canvas>
                    </div>
                  </div>
                </AvatarCustomizationProvider>
              </div>
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
export default CustomizeAvatar;
