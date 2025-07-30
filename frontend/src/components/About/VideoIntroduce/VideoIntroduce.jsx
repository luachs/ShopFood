import React, { useState } from "react";
import "./VideoIntroduce.css";

import icon1 from "../../assets/images/Video-intro/icon1.png";
import icon2 from "../../assets/images/Video-intro/icon2.png";
import icon3 from "../../assets/images/Video-intro/icon3.png";

const CartItems = [
  {
    icon: icon1,
    title: "Multi Cuisine",
    desc: "In the new era of technology we look in the future with certainty life.",
  },
  {
    icon: icon2,
    title: "Easy To Order",
    desc: "In the new era of technology we look in the future with certainty life.",
  },
  {
    icon: icon3,
    title: "Fast Delivery",
    desc: "In the new era of technology we look in the future with certainty life.",
  },
];
const VideoIntroduce = () => {
  const [showVideo, setShowVideo] = useState(false);

  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";

  return (
    <div className="video-introduce">
      <div className="video-container" data-aos="zoom-in-down">
        <div className="video-overlay"></div>
        <div className="video-content">
          <button className="play-button" onClick={() => setShowVideo(true)}>
            ▶
          </button>
          <h1 className="video-title">
            Feel the authentic & <br /> original taste from us
          </h1>
        </div>

        {showVideo && (
          <div className="modal">
            <div className="modal-content">
              <button
                className="close-button"
                onClick={() => setShowVideo(false)}
              >
                &times;
              </button>
              <iframe
                width="100%"
                height="100%"
                src={videoUrl}
                title="Intro Video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </div>
      <div className="list-card-video-items">
        {CartItems.map((item, index) => (
          <div key={index} className="cart-video-item">
            <img src={item.icon} alt="" />
            <div className="cart-video-content">
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoIntroduce;
