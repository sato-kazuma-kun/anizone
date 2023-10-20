"use client"

import React, { createContext, useContext, useRef } from 'react';

const VideoContext = createContext();

export const VideoProvider = ({ children }) => {
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    // Reset the video to the beginning and play it again
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  return (
    <VideoContext.Provider value={{ videoRef, handleVideoEnd }}>
      {children}
    </VideoContext.Provider>
  );
};

export const useVideoContext = () => {
  return useContext(VideoContext);
};
