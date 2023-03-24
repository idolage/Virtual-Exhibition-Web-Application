import React from 'react'
import RealLife from '../../assets/img/group.png'
import SpatialAudio from '../../assets/img/3d-audio.png'
import Stalls  from '../../assets/img/colour.png'
import MultipleViews from '../../assets/img/viewfinder.png'
import LiveStreaming from '../../assets/img/live.png'
import Video from '../../assets/img/video-chat.png' 
import Chatbot from '../../assets/img/chatbot.png'
import Avatars from '../../assets/img/people.png'
const Features = () => {
    const featuresInfoData = [
      {
        image: RealLife,
        title: "Immersive Stall Experience",
        text: "Recreates a real stall-like environment that allows attendees to walk around and explore with limited clicks for navigation",
      },
      {
        image: SpatialAudio,
        title: "Real-Life Sound Environment",
        text: "Uses 3D spatial audio and lip-synced avatars for a more realistic conversation experience",
      },
      {
        image: Avatars,
        title: "Customizable Avatars",
        text: "Provides a diverse range of customizable humanoid avatars to create an inclusive space for all users",
      },
      {
        image: MultipleViews,
        title: "Multiple Camera Views",
        text: "Allows users to explore the exhibits from different angles, providing a more immersive experience",
      },
      {
        image: LiveStreaming,
        title: "Live Streaming",
        text: "Exhibitors can effortlessly stream their content and interact with attendees in real-time",
      },
      {
        image: Video,
        title: "Video Rendering",
        text: "Provides a more immersive experience by recreating real-life display screens with spatial sound effects",
      },
      {
        image: Stalls,
        title: "Customizable Stalls",
        text: "Exhibitors can upload all kinds of marketing materials like banners, videos, and even 3D models to showcase their products",
      },
      {
        image: Chatbot,
        title: "Chatbot For Support",
        text: "Available in multiple languages so that all attendees can easily receive assistance, regardless of language barriers or physical abilities",
      },
    ];
      return (
        <>
          <div className="work-section-top">
            <h1 className="primary-heading">Our Features</h1>
            <p className="primary-text">
            We're using 3D technology to recreate the look and feel of real-life exhibitions in a virtual space
            </p>
          </div>
          <div className="work-section-bottom">
            {featuresInfoData.map((data) => (
              <div className="work-section-info" key={data.title}>
                <div className="info-boxes-img-container">
                  <img src={data.image} alt="" style={{width:'25%'}}/>
                </div>
                <h3>{data.title}</h3>
                <p>{data.text}</p>
              </div>
            ))}
          </div>
        </>
      );
}

export default Features