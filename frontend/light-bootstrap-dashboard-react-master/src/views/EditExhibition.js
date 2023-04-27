import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import EditExhibitionDetails from "./EditExhibitionDetails";
import { useLocation } from 'react-router-dom';
import React from "react";
import sidebarImage from "../assets/img/sidebar-3.jpg";
import Sidebar from "../components/Sidebar/Sidebar";
import routes from "../routes";
import AdminNavbar from "../components/Navbars/AdminNavbar";
import EditSponsorVideos from "./EditSponsorVideos";

function UncontrolledExample() {
  const [image, setImage] = React.useState(sidebarImage);
  const [color, setColor] = React.useState("black");
  const [hasImage, setHasImage] = React.useState(true);
  const mainPanel = React.useRef(null);
  const location = useLocation();
  const { exhibitionId } = location.state;

  return (
      <>
        <div className="wrapper">
          <Sidebar color={color} image={hasImage ? image : ""} routes={routes} />
          <div className="main-panel" ref={mainPanel}>
            <AdminNavbar />
            <div className="container" style={{ marginTop: "5vh" }}>
      <Tabs
          defaultActiveKey="details"
          id="uncontrolled-tab-example"
          className="mb-3"
      >
        <Tab eventKey="details" title="Details">
          <EditExhibitionDetails exhibitionId={exhibitionId}/>
        </Tab>
        <Tab eventKey="videos" title="Videos">
            <EditSponsorVideos exhibitionId={exhibitionId}/>
        </Tab>
      </Tabs>
            </div>
          </div>
        </div>
        </>
  );
}

export default UncontrolledExample;