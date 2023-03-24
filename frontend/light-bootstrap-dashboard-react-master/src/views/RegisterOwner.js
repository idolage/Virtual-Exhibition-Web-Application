import React from "react";
import WebNavBar from "components/Navbars/WebNavBar";
import Footer from "components/Footer/Footer";
import { Container } from "react-bootstrap";
import RegisterImg from "../assets/img/register.png";
import { Owner } from "components/Register/Owner";
export default function RegisterOwner() {
  const mainPanel = React.useRef(null);
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
  });
  return (
    <>
      <div className="wrapper">
        <div className="main-panel" ref={mainPanel} style={{ width: "100%" }}>
          <WebNavBar />
          <div className="content">
            <div className="home-container">
              <div className="home-banner-container">
                <div className="home-text-section">
                  <Owner/>
                </div>
                <div className="home-image-section">
                  <img src={RegisterImg} class="img-fluid" alt="Sample image" />
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}



