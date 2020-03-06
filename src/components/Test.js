import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/';
import {Button} from '@material-ui/core';
import React from 'react';

export default ({searchTerms}) => {
  return (
    <div className="interests search-interests">
      <Button
        className="btn"
        variant="outlined"
        component={Link}
        to={ROUTES.DASH}>
        Watch now
      </Button>
    </div>
  );
};
