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
  const [logo, setLogo] = useState('');
  const [video, setVideo] = useState([]);
  const [exhibitionId, setIexhibitionId] = useState('');
  // const stallId = '1';

  const stallOwnerId = 'abc';
  //const exhibitionId = '0c171753-685f-4cef-9b73-6eef6227eeb6';
  var tier = '';
  //  const logoUrl = `http://localhost:8080/api/stalls/upload-logo/${stallId}/?stallOwnerId=${stallOwnerId}&exhibitionId=${exhibitionId}&tier=${tier}`;
  //  const bannerUrl = `http://localhost:8080/api/stalls/upload-banner/${stallId}/?stallOwnerId=${stallOwnerId}&exhibitionId=${exhibitionId}&tier=${tier}`
  //  const videoUrl = `http://localhost:8080/api/stalls/upload-video/${stallId}/?stallOwnerId=${stallOwnerId}&exhibitionId=${exhibitionId}&tier=${tier}`
  //const exhibitionId = '0c171753-685f-4cef-9b73-6eef6227eeb6';


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

  const storedEmail = 'exhibitionowner@gmail.com';
  console.log(storedEmail);
  Axios.get(`http://localhost:8080/api/tickets/getTicketInfo/${storedEmail}`)
    .then((res) => {
      console.log(res.data);
      setIexhibitionId(res.data[0].exhibitionId);
    })
    .catch((e) => {
      console.log(e);
    });

  const params = new URLSearchParams();
  params.append('stallOwnerId', stallOwnerId);
  Axios.get(
    `http://localhost:8080/api/stalls/${exhibitionId}/stall/?${params.toString()}`
  )
    .then((res) => {
      console.log(res.data);
      localStorage.setItem("stallId", res.data);

    })
    .catch((e) => {
      console.log(e);
    });
  const stallId = localStorage.getItem('stallId');
  if (
    (stallId >= 1 && stallId < 9) ||
    stallId == 22 ||
    stallId == 23 ||
    stallId == 44 ||
    (stallId >= 37 && stallId < 44)
  ) {
    tier = 'Platinum';
  } else if (
    stallId == 11 ||
    stallId == 15 ||
    stallId == 19 ||
    stallId == 27 ||
    stallId == 31 ||
    stallId == 35
  ) {
    tier = 'Diamond';
  }
  else {
    {
      tier = 'Gold';
    }
  }
  const logoUrl = `http://localhost:8080/api/stalls/upload-logo/${exhibitionId}`;
  const bannerUrl = `http://localhost:8080/api/stalls/upload-banner/${exhibitionId}`;
  const videoUrl = `http://localhost:8080/api/stalls/upload-video/${exhibitionId}`;
  console.log(logoUrl);

  function handleFileUpload(e) {
    const uploadedFiles = e.target.files;
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    console.log([files]);
  }

  function handleLogoUpload(e) {
    const uploadedLogo = e.target.value;
    setLogo(uploadedLogo);
    console.log(logo);
  }

  function handleVideoUpload(e) {
    const uploadedVideo = Array.from(e.target.files);
    setVideo((prevFiles) => [...prevFiles, ...uploadedVideo]);
    console.log(uploadedVideo);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    console.log([files]);
  }

  function handleLogoUpload(e) {
    const uploadedLogo = e.target.value;
    setLogo(uploadedLogo);
    console.log(logo);
  }

  function handleVideoUpload(e) {
    const uploadedVideo = Array.from(e.target.files);
    setVideo((prevFiles) => [...prevFiles, ...uploadedVideo]);
    console.log(uploadedVideo);
  }

  function submitLogo(e) {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.append('stallId',stallId);
    urlParams.append('logo', logo);
    console.log(urlParams);
    Axios.post(logoUrl, urlParams)
      .then(res => {
        setLogo('');
        document.getElementById("logoInput").value = "";
        alert("Successfully Uploaded");
      })
      .catch(error => {
        setLogo('');
        alert('Upload Fail!');
      })
  }

  function submitBanner(e) {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.append('stallId',stallId);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);

    });
    const url = `${bannerUrl}?${urlParams.toString()}`;
    Axios.post(url, formData)
      .then(res => {
        setFiles([]);
        console.log([files]);
        alert("Successfully Uploaded");
        var chooseFileInputs = document.querySelectorAll("#chooseFile");
        chooseFileInputs.forEach(input => {
          input.value = "";
        });
      }).catch(error => {
        alert("Upload Fail!");
      })
  }
  function submitVideo(e) {
    e.preventDefault();
    console.log([video]);
    const urlParams = new URLSearchParams();
    urlParams.append('stallId',stallId);
    const formData = new FormData();
    formData.append('file', video[0]);
    const url = `${videoUrl}?${urlParams.toString()}`;
    Axios.post(url, formData)
      .then(res => {
        setVideo([]);
        alert("Successfully Uploaded");
        document.getElementById("videoField").value = "";
      }).catch(error => {
        alert("Upload Fail!");
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
                    <div class="upload-card">
                      <div class="card-body">
                        <h5 class="card-topic ">Submit Logo</h5>
                        <form class="row ">
                          <div class="input-group mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-default">Logo</span>
                            <input type="text" class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" placeholder="Enter your logo here" onChange={(e) => handleLogoUpload(e)} id="logoInput"></input>

                          </div>
                          <div class="col-auto">
                            <button type="button" class="upload-button" name="uploadbutton" onClick={(e) => submitLogo(e)}>Submit</button>

                          </div>
                        </form>
                      </div>
                    </div>

                  </div>

                  {tier == 'Platinum' && (
                    <div className="row mt-5">
                      <div class="upload-card">
                        <div class="card-body">
                          <h5 class="card-topic ">Submit Banners</h5>

                          <div className="row mt-5">
                            <div className="col-lg-9 align-self-center ">

                              <div className="file-upload">
                                <div className="file-select">
                                  <div className="file-select-button" id="fileName">
                                    Choose File
                                  </div>
                                  <input
                                    type="file"
                                    name="chooseFile"
                                    id="chooseFile"
                                    onChange={(e) => handleFileUpload(e)}
                                  />
                                  <div className="file-select-name" id="noFile">
                                    {files[0] ? files[0].name : 'No file chosen...'}
                                  </div>
                                </div>
                              </div>
                              <div className="file-upload">
                                <div className="file-select">
                                  <div className="file-select-button" id="fileName">
                                    Choose File
                                  </div>
                                  <input
                                    type="file"
                                    name="chooseFile"
                                    id="chooseFile"
                                    onChange={(e) => handleFileUpload(e)}
                                  />
                                  <div className="file-select-name" id="noFile">
                                    {files[1] ? files[1].name : 'No file chosen...'}
                                  </div>
                                </div>
                              </div>
                              <div className="file-upload">
                                <div className="file-select">
                                  <div className="file-select-button" id="fileName">
                                    Choose File
                                  </div>
                                  <input
                                    type="file"
                                    name="chooseFile"
                                    id="chooseFile"
                                    onChange={(e) => handleFileUpload(e)}
                                  />
                                  <div className="file-select-name" id="noFile">
                                    {files[2] ? files[2].name : 'No file chosen...'}
                                  </div>
                                </div>
                              </div>
                              <div className="file-upload">
                                <div className="file-select">
                                  <div className="file-select-button" id="fileName">
                                    Choose File
                                  </div>
                                  <input
                                    type="file"
                                    name="chooseFile"
                                    id="chooseFile"
                                    onChange={(e) => handleFileUpload(e)}
                                  />
                                  <div className="file-select-name" id="noFile">
                                    {files[3] ? files[3].name : 'No file chosen...'}
                                  </div>
                                </div>
                              </div>
                              <div className="file-upload">
                                <div className="file-select">
                                  <div className="file-select-button" id="fileName">
                                    Choose File
                                  </div>
                                  <input
                                    type="file"
                                    name="chooseFile"
                                    id="chooseFile"
                                    onChange={(e) => handleFileUpload(e)}
                                  />
                                  <div className="file-select-name" id="noFile">
                                    {files[4] ? files[4].name : 'No file chosen...'}
                                  </div>
                                </div>
                              </div>
                              <div className="file-upload">
                                <div className="file-select">
                                  <div className="file-select-button" id="fileName">
                                    Choose File
                                  </div>
                                  <input
                                    type="file"
                                    name="chooseFile"
                                    id="chooseFile"
                                    onChange={(e) => handleFileUpload(e)}
                                  />
                                  <div className="file-select-name" id="noFile">
                                    {files[5] ? files[5].name : 'No file chosen...'}
                                  </div>
                                </div>
                              </div>
                              <button type="button" class="upload-button align-self-center" name="uploadbutton" onClick={(e) => submitBanner(e)}>Submit</button>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>)}

                  {tier == 'Gold' && (
                    <div className="row mt-5">
                      <div class="upload-card">
                        <div class="card-body">
                          <h5 class="card-topic ">Submit Banners</h5>

                          <div className="row mt-5">
                            <div className="col-lg-9 align-self-center ">

                              <div className="file-upload">
                                <div className="file-select">
                                  <div className="file-select-button" id="fileName">
                                    Choose File
                                  </div>
                                  <input
                                    type="file"
                                    name="chooseFile"
                                    id="chooseFile"
                                    onChange={(e) => handleFileUpload(e)}
                                  />
                                  <div className="file-select-name" id="noFile">
                                    {files[0] ? files[0].name : 'No file chosen...'}
                                  </div>
                                </div>
                              </div>
                              <div className="file-upload">
                                <div className="file-select">
                                  <div className="file-select-button" id="fileName">
                                    Choose File
                                  </div>
                                  <input
                                    type="file"
                                    name="chooseFile"
                                    id="chooseFile"
                                    onChange={(e) => handleFileUpload(e)}
                                  />
                                  <div className="file-select-name" id="noFile">
                                    {files[1] ? files[1].name : 'No file chosen...'}
                                  </div>
                                </div>
                              </div>
                              <div className="file-upload">
                                <div className="file-select">
                                  <div className="file-select-button" id="fileName">
                                    Choose File
                                  </div>
                                  <input
                                    type="file"
                                    name="chooseFile"
                                    id="chooseFile"
                                    onChange={(e) => handleFileUpload(e)}
                                  />
                                  <div className="file-select-name" id="noFile">
                                    {files[2] ? files[2].name : 'No file chosen...'}
                                  </div>
                                </div>
                              </div>
                              <div className="file-upload">
                                <div className="file-select">
                                  <div className="file-select-button" id="fileName">
                                    Choose File
                                  </div>
                                  <input
                                    type="file"
                                    name="chooseFile"
                                    id="chooseFile"
                                    onChange={(e) => handleFileUpload(e)}
                                  />
                                  <div className="file-select-name" id="noFile">
                                    {files[3] ? files[3].name : 'No file chosen...'}
                                  </div>
                                </div>
                              </div>
                              <button type="button" class="upload-button align-self-center" name="uploadbutton" onClick={(e) => submitBanner(e)}>Submit</button>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>)}

                  {tier == 'Diamond' && (
                    <div className="row mt-5">
                      <div class="upload-card">
                        <div class="card-body">
                          <h5 class="card-topic ">Submit Banners</h5>

                          <div className="row mt-5">
                            <div className="col-lg-9 align-self-center ">

                              <div className="file-upload">
                                <div className="file-select">
                                  <div className="file-select-button" id="fileName">
                                    Choose File
                                  </div>
                                  <input
                                    type="file"
                                    name="chooseFile"
                                    id="chooseFile"
                                    onChange={(e) => handleFileUpload(e)}
                                  />
                                  <div className="file-select-name" id="noFile">
                                    {files[0] ? files[0].name : 'No file chosen...'}
                                  </div>
                                </div>
                              </div>
                              <div className="file-upload">
                                <div className="file-select">
                                  <div className="file-select-button" id="fileName">
                                    Choose File
                                  </div>
                                  <input
                                    type="file"
                                    name="chooseFile"
                                    id="chooseFile"
                                    onChange={(e) => handleFileUpload(e)}
                                  />
                                  <div className="file-select-name" id="noFile">
                                    {files[1] ? files[1].name : 'No file chosen...'}
                                  </div>
                                </div>
                              </div>
                              <div className="file-upload">
                                <div className="file-select">
                                  <div className="file-select-button" id="fileName">
                                    Choose File
                                  </div>
                                  <input
                                    type="file"
                                    name="chooseFile"
                                    id="chooseFile"
                                    onChange={(e) => handleFileUpload(e)}
                                  />
                                  <div className="file-select-name" id="noFile">
                                    {files[2] ? files[2].name : 'No file chosen...'}
                                  </div>
                                </div>
                              </div>


                              <button type="button" class="upload-button align-self-center" name="uploadbutton" onClick={(e) => submitBanner(e)}>Submit</button>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>)}


                </Carousel.Item>

                {tier !== 'Gold' &&
                  <Carousel.Item>

                    <div className="row mt-5">
                      <div className="col-lg-9 align-self-center ">
                        <div className="row"><h5>Submit Video</h5></div>
                        <div class="frame">

                          <div class="center">
                            <div class="title">
                              <h1 style={{ fontSize: 18 }}>Upload your video here</h1>
                            </div>

                            <div class="dropzone" >
                              <div class="upload-icon"> {video[0] ? video[0].name : 'No file chosen...'} </div>
                              <input type="file" class="upload-input" id="videoField" onChange={
                                (e) => handleVideoUpload(e)
                              } multiple />

                            </div>
                            <button type="button" class="upload-button" name="uploadbutton" onClick={(e) => submitVideo(e)}>Submit</button>

                          </div>
                        </div>
                      </div>

                    </div>
                  </Carousel.Item>}
              </Carousel>
            </div>
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
        <FixedPlugin
          hasImage={hasImage}
          setHasImage={() => setHasImage(!hasImage)}
          color={color}
          setColor={(color) => setColor(color)}
          image={image}
          setImage={(image) => setImage(image)}
        />
      </div>
    </>
  );
}
export default CustomizeStall;
