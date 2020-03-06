// import {Link} from 'react-router-dom';
// import * as ROUTES from '../constants/';
// import {Button} from '@material-ui/core';
import React from 'react';
import './DownloadBtn.css';

export default () => {
  return (
    <div className="download-btn">
      <img
        src={process.env.PUBLIC_URL + '/images/downloadandshareIcon.png'}
        alt="dounload"></img>
      <p>Download and Share</p>
    </div>
  );
};
