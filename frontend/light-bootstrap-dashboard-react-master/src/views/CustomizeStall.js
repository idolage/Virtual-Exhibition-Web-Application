import React, { useState, useEffect } from "react";
import { useLocation, Route, Switch } from "react-router-dom";
import Axios from 'axios';
import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import { MantineProvider } from "@mantine/core";
import { StallCustomizationProvider } from "contexts/StallCustomizationContext";
import routes from "routes.js";
import sidebarImage from "assets/img/sidebar-3.jpg";
import { Canvas } from "@react-three/fiber";
import Experience from "components/StallCustomization/Experience";
import Interface from "components/StallCustomization/Interface";
import Carousel from "react-bootstrap/Carousel";
import "../assets/css/custom-style.css";
function CustomizeStall() {
  const [index, setIndex] = useState(0);
  const [files, setFiles] = useState([]);
  const stallId = '1';
  const stallOwnerId = 'abc';
  const exhibitionId = '0c171753-685f-4cef-9b73-6eef6227eeb6';
  const tier = 'Gold'
  const logoUrl = `http://localhost:8080/api/stalls/upload-logo/${stallId}/?stallOwnerId=${stallOwnerId}&exhibitionId=${exhibitionId}&tier=${tier}`;
  const bannerUrl = `http://localhost:8080/api/stalls/upload-banner/${stallId}/?stallOwnerId=${stallOwnerId}&exhibitionId=${exhibitionId}&tier=${tier}`
  const videoUrl = `http://localhost:8080/api/stalls/upload-video/${stallId}/?stallOwnerId=${stallOwnerId}&exhibitionId=${exhibitionId}&tier=${tier}`


  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const stallType = "Platinum";


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

  function handleFileUpload(e) {
    const uploadedFiles = e.target.files;
    setFiles([...files, uploadedFiles]);
    // console.log(files);
  }
 
  function submitLogo(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', files[0][0]);
    Axios.post(logoUrl, formData)
      .then(res => {
        setFiles([]);
      })
  }

  function submitBanner(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', files[0][0]);
    Axios.post(bannerUrl, formData)
      .then(res => {
        setFiles([]);
      })
  }
  function submitVideo(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', files[0][0]);
    Axios.post(videoUrl, formData)
      .then(res => {
        setFiles([]);
      })
  }

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className=" mb-4 ">
            <Switch>{getRoutes(routes)}</Switch>
            <div className=" mt-5 mb-5 pt-4">
              <Carousel
                activeIndex={index}
                onSelect={handleSelect}
                variant={"dark"}
                interval={null}
              >
                <Carousel.Item>
                  <StallCustomizationProvider>
                    <div className="row mt-5">
                      <div className="col-lg-9 align-self-center ">
                        <Canvas
                          camera={{ position: [1.8, 1.0, 2.5], fov: 50 }}
                          style={{
                            height: 750,
                            width: "auto",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                        >
                          <Experience stallType={stallType} />
                        </Canvas>
                      </div>
                      <div className="col-lg-3">
                        <Interface />
                      </div>
                    </div>
                  </StallCustomizationProvider>
                </Carousel.Item>
                <Carousel.Item>
                  <div className="row mt-5">
                    <div className="col-lg-9 align-self-center ">
                      <div class="frame">
                        <div class="center">
                          <div class="title">
                            <h1 style={{ fontSize: 18 }}>Upload your logo here</h1>
                          </div>

                          <div class="dropzone">
                            <img src="http://100dayscss.com/codepen/upload.svg" class="upload-icon" />
                            <input type="file" class="upload-input" onChange={
                              (e) => handleFileUpload(e)
                            } multiple />

                          </div>
                          <button type="button" class="btn" name="uploadbutton" onClick={(e) => submitLogo(e)}>Upload file</button>

                        </div>
                      </div>
                    </div>

                  </div>
                </Carousel.Item>
                <Carousel.Item>
                <div className="row mt-5">
                    <div className="col-lg-9 align-self-center ">
                      <div class="frame">
                        <div class="center">
                          <div class="title">
                            <h1 style={{ fontSize: 18 }}>Upload your banner here</h1>
                          </div>

                          <div class="dropzone">
                            <img src="http://100dayscss.com/codepen/upload.svg" class="upload-icon" />
                            <input type="file" class="upload-input" onChange={
                              (e) => handleFileUpload(e)
                            } multiple />

                          </div>
                          <button type="button" class="btn" name="uploadbutton" onClick={(e) => submitBanner(e)}>Upload file</button>

                        </div>
                      </div>
                    </div>

                  </div>
                </Carousel.Item>
                {tier !== 'Gold' &&
                <Carousel.Item>
                <div className="row mt-5">
                    <div className="col-lg-9 align-self-center ">
                      <div class="frame">
                        <div class="center">
                          <div class="title">
                            <h1 style={{ fontSize: 18 }}>Upload your video here</h1>
                          </div>

                          <div class="dropzone">
                            <img src="http://100dayscss.com/codepen/upload.svg" class="upload-icon" />
                            <input type="file" class="upload-input" onChange={
                              (e) => handleFileUpload(e)
                            } multiple />

                          </div>
                          <button type="button" class="btn" name="uploadbutton" onClick={(e) => submitVideo(e)}>Upload file</button>

                        </div>
                      </div>
                    </div>

                  </div>
                </Carousel.Item>
                }
              </Carousel>
            </div>

            {/* <StallCustomizationProvider>
              <div className="row mt-5">
                <div className="col-lg-9 align-self-center ">
                  <Canvas
                    camera={{ position: [1.8, 1.0, 2.5], fov: 50 }}
                    style={{
                      height: 750,
                      width: "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Experience stallType={stallType} />
                  </Canvas>
                </div>
                <div className="col-lg-3">
                  <Interface />
                </div>
              </div>
            </StallCustomizationProvider> */}
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
export default CustomizeStall;
