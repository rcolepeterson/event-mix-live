import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import * as ROUTES from '../constants/';
import {Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DownloadBtn from '../components/buttons/DownloadBtn';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: {max: 4000, min: 3000},
    items: 1
  },
  desktop: {
    breakpoint: {max: 3000, min: 1024},
    items: 1
  },
  tablet: {
    breakpoint: {max: 1024, min: 464},
    items: 1
  },
  mobile: {
    breakpoint: {max: 464, min: 0},
    items: 1
  }
};

export default () => {
  return (
    <Grid
      container
      alignItems="center"
      justify="center"
      spacing={0}
      className="landingPage">
      <Grid className="max-width topbar" item xs={12}>
        <img
          className="img-one-hundred"
          alt="top-menu"
          src={process.env.PUBLIC_URL + '/images/landingpageTopBar.png'}
        />
      </Grid>
      <Grid className="container" item xs={12}>
        <div className="hero-carousel">
          <Carousel
            infinite={false}
            showDots
            arrows={false}
            renderDotsOutside={false}
            responsive={responsive}>
            <div class="item">
              <Grid
                className="hero-container max-width-smaller"
                container
                spacing={0}>
                <Grid className="hero-container-message" item xs={5}>
                  <div className="message">
                    <h1>Build LIVE</h1>
                    <p>
                      Catch all the 2020 Build action LIVE. Stream the
                      experience to see the latest technologies and learn new
                      ways to solve your development challenges.
                    </p>
                    <div className="margin-twenty"></div>
                    <div className="links">
                      <Button
                        className="btn purple bold"
                        variant="contained"
                        color="primary">
                        <strong>See all</strong>
                        <ArrowForwardIosIcon />
                      </Button>
                      <Link to={ROUTES.DASH}>Set Reminders</Link>
                    </div>
                  </div>
                </Grid>
                <Grid className="hero-container-image" item xs={7}>
                  <div className="hero hero-two">
                    <img
                      className="img-one-hundred"
                      alt="hero"
                      src={
                        process.env.PUBLIC_URL + '/images/livevideomodules.png'
                      }
                    />
                  </div>
                </Grid>
              </Grid>
            </div>

            <div class="item">
              <Grid
                className="hero-container max-width-smaller"
                container
                spacing={0}>
                <Grid className="hero-container-message" item xs={5}>
                  <div className="message">
                    <h1>Your EventMix</h1>
                    <p>
                      We used AI to select portions of the 2,423 hours of Build
                      sessions to create a highlight reel that’s personally
                      relevant to you.
                    </p>
                    <div className="margin-twenty"></div>
                    <div className="links">
                      <Button
                        className="btn purple bold"
                        variant="contained"
                        color="primary">
                        <strong>Watch now</strong>
                        <ArrowForwardIosIcon />
                      </Button>
                      <Link to={ROUTES.DASH}>Create a new mix</Link>
                    </div>
                  </div>
                </Grid>
                <Grid className="hero-container-image" item xs={7}>
                  <div className="hero">
                    <img
                      className="img-one-hundred"
                      alt="hero"
                      src={
                        process.env.PUBLIC_URL +
                        '/images/herovideodisplayimage.png'
                      }
                    />
                    {/* <DownloadBtn /> */}
                  </div>
                </Grid>
              </Grid>
            </div>
          </Carousel>
        </div>
      </Grid>
      <Grid className="highlighted-content max-width" item xs={12}>
        <img
          className="img-one-hundred"
          alt="btm-menu"
          src={process.env.PUBLIC_URL + '/images/landingpageBottomBar.png'}
        />
      </Grid>
    </Grid>
  );
};
