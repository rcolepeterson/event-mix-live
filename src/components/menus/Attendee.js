import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './Attendee.css';

const Atendee = ({user_image, display_name, title, location}) => {
  return (
    <div className="spot-user flexbox ">
      <Avatar
        alt={display_name}
        src={process.env.PUBLIC_URL + '/images/' + user_image}
        className="bigAvatar"
      />
      <div className="info">
        <p className="title">{display_name}</p>
        <p>{title}</p>
        <p>{location}</p>
      </div>
    </div>
  );
};

Atendee.whyDidYouRender = {
  logOnDifferentValues: false,
  customName: 'Menu'
};

export default Atendee;
