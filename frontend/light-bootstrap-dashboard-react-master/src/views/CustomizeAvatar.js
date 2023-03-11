import React, { Component } from "react";
import { useLocation, Route, Switch } from "react-router-dom";

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

function CustomizeAvatar() {
  const avatarIdVal = 2;

  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
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
                  <Interface />
                </div>
              </div>
            </AvatarCustomizationProvider>
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
