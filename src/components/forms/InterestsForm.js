import React, {useState} from 'react';
import {TextField, Button} from '@material-ui/core';
import './InterestsForm.css';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import useMountEffect from '../hooks/useMountEffect';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
//import SearchIcon2 from '@material-ui/icons/Search';

const INITIAL_STATE = {
  hashtag: '',
  error: null,
  status: '',
  message: ''
};

const FormBase = ({formHandler, loading = false}) => {
  const [state, setState] = useState(INITIAL_STATE);
  const {message, error} = state;
  const isInvalid = message === '';

  const onSubmit = event => {
    state.searchItems.push(state.message);
    setState(prevState => ({
      ...prevState,
      status: 'Loading ...',
      hashtag: '',
      message: ''
    }));

    event.preventDefault();

    formHandler(state.message);
  };

  const changeHandler = event => {
    const {value} = event.target;
    setState(prev => ({...prev, message: value}));
  };

  const didMount = () => {
    setState(prevState => ({
      ...prevState,
      searchItems: []
    }));
  };
  useMountEffect(didMount);

  return (
    <div className="form-insight">
      <form onSubmit={onSubmit}>
        <Grid container spacing={0}>
          <Grid item xs={11}>
            <TextField
              name="hashtag"
              variant="outlined"
              margin="normal"
              required
              fullWidth
              value={message}
              onChange={changeHandler}
              type="text"
              className="tClass"
              placeholder="Add interests to your Mix"
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton type="submit">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Grid>
        </Grid>
        {error && <p>{error.message}</p>}
      </form>
    </div>
  );
};

export default FormBase;
