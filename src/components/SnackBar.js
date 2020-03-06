import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import './SnackBar.css';
import Button from '@material-ui/core/Button';

export default ({error, errorMsg}) => {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    console.log('we have an error', errorMsg);

    if (error === true) {
      console.log('we have an error', errorMsg);
      setOpen(true);
    }
  }, [error, errorMsg]);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={<span id="message-id">{errorMsg}</span>}
      />
    </div>
  );
};
