import React from 'react';
import {convertTimeStampToSeconds} from '../utils';
import './VideoPlayer.css';

export default ({selVideo, onVideoEnd, initial}) => {
  const VIDEO_ID = 'vidPlayer';
  const handleCanPlayThrough = event => {
    let vid = document.getElementById(VIDEO_ID);
    let startTime = convertTimeStampToSeconds(selVideo.videoStartTime);
    vid.currentTime = startTime;
    if (!initial) {
      vid.play();
    } else {
      vid.pause();
    }
    vid.removeEventListener('canplay', handleCanPlayThrough);
  };

  const handleMetadata = event => {
    const vid = document.getElementById(VIDEO_ID);
    vid.oncanplay = () => {
      vid.oncanplay = null;
      console.log('canplay');
      handleCanPlayThrough();
    };
  };

  const handleTimeUpdate = event => {
    const vid = document.getElementById(VIDEO_ID);
    let seconds = convertTimeStampToSeconds(selVideo.videoEndTime);
    if (vid.currentTime >= seconds) {
      vid.pause();
      onVideoEnd();
    }
  };

  function isMobileDevice() {
    return (
      typeof window.orientation !== 'undefined' ||
      navigator.userAgent.indexOf('IEMobile') !== -1
    );
  }

  return (
    <div>
      <video
        id={VIDEO_ID}
        key={selVideo.videoStartTime}
        onLoadedMetadata={handleMetadata}
        autoPlay
        controls
        muted={isMobileDevice()}
        playsInline
        onTimeUpdate={handleTimeUpdate}>
        <source src={selVideo.videoUrl} type="video/mp4" />
      </video>
    </div>
  );
};
