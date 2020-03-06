import React from 'react';
import './Remix.css';
import RemixImage from '../../images/remixbutton_off.png';
import RemixImageOn from '../../images/remixbutton_on.png';

export default ({handleRemixClick, remixOn}) => {
  return (
    <div onClick={handleRemixClick} className="remixHolder">
      {!remixOn && <img alt="remix" src={RemixImage}></img>}
      {remixOn && <img alt="remix" src={RemixImageOn}></img>}
    </div>
  );
};
