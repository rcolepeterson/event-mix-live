import React from 'react';
import {convertTimeStampToSeconds} from '../../utils';
import './VideoPlayer.css';
import {AzureMP} from '../reactAzure';

export default ({videoSrc, options, onVideoEnd, initial}) => {
  //console.log('window.startTime', window.startTime);
  const VIDEO_ID = 'vidPlayer';
  const handleCanPlayThrough = event => {
    const vid = document.getElementById(VIDEO_ID);
    // let startTime = convertTimeStampToSeconds(selVideo.videoStartTime);
    let startTime = 1;
    vid.currentTime = window.startTime;
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
      //console.log('canplay');
      handleCanPlayThrough();
    };
  };

  const handleEnd = event => {
    console.log('we have ended');
  };

  const onInstanceCreated = player => {
    console.log('onInstanceCreated player', player);
  };

  function isMobileDevice() {
    return (
      typeof window.orientation !== 'undefined' ||
      navigator.userAgent.indexOf('IEMobile') !== -1
    );
  }
  return (
    <div>
      <AzureMP
        onInstanceCreated={onInstanceCreated}
        src={videoSrc}
        videoStartTime={window.startTime}
        videoEndTime={window.startTime + 30}
        onVideoEnd={onVideoEnd}
        options={options}
      />
    </div>
  );
};
