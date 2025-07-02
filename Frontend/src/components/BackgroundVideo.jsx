import React from "react";

const BackgroundVideo = ({ src }) => (
  <video
    autoPlay
    loop
    muted
    playsInline
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "120vw", // Zoom out by making video wider than viewport
      height: "120vh", // Zoom out by making video taller than viewport
      minWidth: "100vw",
      minHeight: "100vh",
      objectFit: "contain", // Show the whole video, may add black bars
      zIndex: -2,
      pointerEvents: "none",
      filter: "brightness(0.5) blur(1px)",
      transition: "all 0.5s",
    }}
  >
    <source src={src} type="video/mp4" />
    Your browser does not support the video tag.
  </video>
);

export default BackgroundVideo;