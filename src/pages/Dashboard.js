import React from 'react';
import './Home.css';
import {searchVideos} from '../API';
import {Button} from '@material-ui/core';
import DownloadBtn from '../components/buttons/DownloadBtn';
import Alert from '../components/SnackBar';
import InterestsForm from '../components/forms/InterestsForm.js';
import Grid from '@material-ui/core/Grid';

import VideoMenu from '../components/menus/VideoMenu';
//import * as Constants from '../constants';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import SwitchLabels from '../components/buttons/SwitchLabels';
import VideoPlayer from '../components/VideoPlayer';
import SearchTerms from '../components/SearchTerms';
import './Dashboard.css';

//import Debug from '../components/Debug';

export default () => {
  const [state, setState] = React.useState({
    loading: false,
    documents: [],
    selVideo: {},
    id: 444,
    initial: true,
    displayVideo: false,
    itemsHasErrored: false,
    itemErrorMessage: 'Error',
    remixOn: false,
    searchTerms: []
  });

  const video = {eventVideos: []};

  /* =================================================================
    Form methods
    ================================================================*/
  const formHandler = searchStr => {
    setState(previousValue => ({
      ...previousValue,
      searchTerms: [...state.searchTerms, searchStr]
    }));
  };

  const handleRemixClick = () => {
    let documents = searchVideos(state.documents, state.searchTerms);
    window.searchTermsArray = [...state.searchTerms];
    console.log(window.searchTermsArray);
    if (documents.length === 0) {
      setState(previousValue => ({
        ...previousValue,
        itemsHasErrored: true,
        itemErrorMessage: 'No videos'
      }));
    } else {
      setState(previousValue => ({
        ...previousValue,
        documents: documents
      }));
    }
  };

  /* =================================================================
    Video methods
    ================================================================*/
  // const nextVideo = () => {
  //   let nVideo = false;
  //   video.eventVideos.forEach((vid, i, arr) => {
  //     if (vid.id === video.selectedVideoId) {
  //       if (arr[i + 1]) {
  //         nVideo = arr[i + 1] ? arr[i + 1] : arr[0];
  //       }
  //     }
  //   });
  //   return nVideo;
  // };

  const onVideoEnd = () => {
    let index = getIndexbyId(state.id);
    let id = state.documents[index].doc.id;
    if (id) {
      onVideoSelect(id);
    }
  };
  /*===============================
  SELECT VIDEO
  ===================*/
  const onVideoSelect = (videoId, startTime) => {
    window.startTime = startTime;
    let selVideo = getVideoById(videoId)[0].doc.data;
    setState(previousValue => ({
      ...previousValue,
      loading: false,
      selVideo: selVideo,
      id: videoId,
      initial: false
    }));
  };

  const getVideoById = id => state.documents.filter(item => item.doc.id === id);
  const getIndexbyId = id => {
    let selIndex = 0;
    state.documents.forEach((item, i) => {
      if (item.doc.id === id) {
        selIndex = i;
      }
    });
    return selIndex + 1;
  };

  /*===============================
  END SELECT VIDEO
  ===================*/

  const reset = () => {};
  const clearSearch = () => {
    setState(previousValue => ({
      ...previousValue,
      searchTerms: []
    }));
  };

  return (
    <>
      {/* <Debug documents={video.eventVideos} /> */}
      <Alert error={state.itemsHasErrored} errorMsg={state.itemErrorMessage} />
      <Grid container spacing={0} className="dashboardPage max-width">
        <Grid item xs={12}>
          <img
            className="img-one-hundred"
            alt="top-menu"
            src={process.env.PUBLIC_URL + '/images/createpageTopBar.png'}
          />
        </Grid>

        <Grid container spacing={0}>
          <Grid item xs={6}>
            <div className="margin-content">
              <h1>Build your own EventMix</h1>
              <p>
                Customize a new highlight reel based on what you’d like to see
                more of, then download and share it with colleagues and more.
              </p>
              <SwitchLabels />

              <>
                <InterestsForm formHandler={formHandler} />
                <SearchTerms searchTerms={state.searchTerms} />
              </>
              <div onClick={clearSearch} className="icon-btn">
                <img
                  src={process.env.PUBLIC_URL + '/images/clearsearchIcon.png'}
                  alt="clear"></img>
                <p>Clear Search</p>
              </div>
              <div className="margin-twenty"></div>
              <Button
                onClick={handleRemixClick}
                disabled={state.searchTerms.length < 1}
                className="btn purple bold"
                variant="contained"
                color="primary">
                <strong>Assemble your mix</strong>
                <ArrowForwardIosIcon />
              </Button>
            </div>
            {video.itemsLoading && <p style={{marginLeft: 30}}>LOADING ...</p>}
          </Grid>
          <Grid item xs={6}>
            <div className="video-holder">
              <VideoPlayer
                initial={state.initial}
                selVideo={state.selVideo}
                onVideoEnd={onVideoEnd}
              />
              <DownloadBtn />
            </div>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <div className="margin-content">
            <VideoMenu
              documents={state.documents}
              onVideoSelect={onVideoSelect}
            />

            {/* {video.noResults && (
              <h3>No Results for {JSON.stringify(search.searchTerms)}</h3>
            )} */}
          </div>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <div className="margin-content">
              <h1>How we did it</h1>
              <img
                className="img-one-hundred"
                alt="case-study"
                src={process.env.PUBLIC_URL + '/images/casestudyvideoImage.png'}
              />
            </div>
          </Grid>
          <Grid item xs={6}>
            <div className="event-mix-white-paper">
              <p>
                <strong>EventMix Whitepaper</strong>
              </p>
              <p>
                RelevanceLorem ipsum dolor sit amet, consectetur adipiscing
                elit. Cras dapibus molestie orci, et vehicula quam maximus sed.
                Nam tellus dui, blandit quis nulla ac, aliquet accumsan leo.
                Phasellus neque augue, vehicula et vestibulum eget, efficitur a
                ex. Suspendisse vitae efficitur est. Cras vitae tellus nisl.{' '}
              </p>
              <img
                className="white-paper"
                alt="white paper"
                src={process.env.PUBLIC_URL + '/images/whitepaperimage.png'}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
