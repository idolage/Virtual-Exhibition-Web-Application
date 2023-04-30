import React from "react";
import BannerImage from "../../assets/img/home-banner-img.png";
const Home = () => {
  return (
    <div className="home-container">
      <div className="home-banner-container">
        <div className="home-text-section">
          <p className="primary-text">
            Your virtual gateway to immersive and engaging events
          </p>
          <h5 className="primary-heading">Nerambum|නැරඹුම්</h5>
          <p className="primary-text">
            Experience exhibitions like never before, bringing the world of
            exhibitions to your fingertips - the ultimate virtual exhibition
            platform!
            <br />
            Join us and elevate your exhibition experience to new heights!
          </p>
          <button className="secondary-button">Download Nerambum</button>
        </div>
        <div className="home-image-section">
          <img src={BannerImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Home;
