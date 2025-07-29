import React, { useState } from "react";
import "./VideoIntroduce.css";

const VideoIntroduce = () => {
  const [showVideo, setShowVideo] = useState(false);

  // Giả lập URL video do backend trả về
  const videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1";

  return (
    <div className="hero-container" data-aos="zoom-in-down">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <button className="play-button" onClick={() => setShowVideo(true)}>
          ▶
        </button>
        <h1 className="hero-title">
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
  );
};

export default VideoIntroduce;
