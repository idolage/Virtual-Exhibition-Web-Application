import React from "react";
import { useLocation, Route, Switch } from "react-router-dom";

import WebNavBar from "components/Navbars/WebNavBar";
import Footer from "components/Footer/Footer";
import { Container } from "react-bootstrap";
import "../assets/css/home.css";
import Home from "components/LandingPage/Home";
import Features from "components/LandingPage/Features";
import Contact from "components/LandingPage/Contact";
import About from "components/LandingPage/About";

export default function Landing() {
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
            <Home />
            <About />
            <Features />
            <Contact />
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
