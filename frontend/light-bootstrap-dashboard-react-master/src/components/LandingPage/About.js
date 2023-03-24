import React from "react";
import AboutBackgroundImage from "../../assets/img/About.jpg";
import attendee from "../../assets/img/attendee.png";
import owner from "../../assets/img/owner.png";
import exhibitors from "../../assets/img/exhibitors.png";
import buyer from "../../assets/img/buyer.png";
const About = () => {
  const userLevels = [
    {
      image: buyer,
      title: "Event Organizer",
      text: "Elevate your business with Nerambum, join the new norm of exhibitions and expand your business without the hassle and expense of physical events",
    },
    {
      image: owner,
      title: "Exhibiton Owner",
      text: "By hosting virtual events on Nerambum, you can have more control over your events, reach more peopleand achieve better results",
    },
    {
      image: exhibitors,
      title: "Exhibitors",
      text: "Customizable booths are designed to help exhibitors to showcase their products effectively and engage with potential customers in a wide range",
    },
    {
      image: attendee,
      title: "Attendees",
      text: "Provides an immersive and inclusive virtual environment infused with advanced features that enhance attendee engagement",
    },
  ];
  return (
    <>
      <br />
      <div className="home-container" style={{ background: "white" }}>
        <div className="home-banner-container">
          <div className="home-image-section">
            <img src={AboutBackgroundImage} alt="" />
          </div>
          <div className="home-text-section">
            <h2>Why Choose Nerambum?</h2>
            <p className="primary-text">
              Nerambum provides several advantages over physical exhibitions:
            </p>
            <p style={{ marginRight: "8px" }}>
              Eliminates the need for attendees to travel, which can be
              time-consuming and expensive. Provides a more convenient
              experience since attendees can access the virtual exhibition from
              anywhere with an internet connection. More environmentally
              friendly, as it reduces the carbon footprint associated with
              physical events. Allows for a more inclusive experience, as
              attendees who may not have been able to attend physical events due
              to mobility or other limitations can now participate in virtual
              exhibitions. Nerambum provides an engaging and immersive
              experience that replicates the feel of real-life exhibitions,
              making it an attractive alternative for attendees and exhibitors
              alike.
            </p>
          </div>
        </div>
        <div className="work-section-bottom" style={{ marginTop: "0" }}>
          {userLevels.map((data) => (
            <div className="work-section-info" key={data.title}>
              <div className="info-boxes-img-container">
                <img src={data.image} alt="" style={{ width: "25%" }} />
              </div>
              <h3>{data.title}</h3>
              <p>{data.text}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;
