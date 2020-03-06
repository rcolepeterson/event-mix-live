import React from 'react';
import {Link} from 'react-router-dom';
import './SearchByMenu.css';
import Btn2 from '../../images/button2.png';
import Btn3 from '../../images/button3.png';
import * as Constants from '../../constants';

export default ({clickHandler}) => {
  return (
    <div className="attrMenuContainer centerV">
      <Link
        className="attrBtn"
        to={`${Constants.DASH}/${Constants.SEARCH_BY_INTERESTS}`}>
        <img alt="button" src={Btn2}></img>
      </Link>
      <Link
        className="attrBtn"
        to={`${Constants.DASH}/${Constants.SEARCH_BY_ATTENDEE}`}>
        <img alt="button" src={Btn3}></img>
      </Link>
    </div>
  );
};
