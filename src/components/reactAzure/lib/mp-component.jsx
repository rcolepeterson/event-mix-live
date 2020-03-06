import React, {Component} from 'react';
import loadLibrary from './load-library';

import './mp-component.css';

//https://amp.azure.net/libs/amp/latest/docs/samples.html

// const DEFAULT_SKIN = 'amp-default';
const DEFAULT_RATIO = [16, 9];

class AzureMP extends Component {
  constructor(props) {
    super(props);
    this.videoNode = React.createRef();
  }
  destroyPlayer() {
    this.player && this.player.dispose();
  }
  componentWillUnmount() {
    this.destroyPlayer();
  }
  componentDidMount() {
    const {skin} = this.props;
    this.initialization = loadLibrary(skin).then(() => {
      this.createPlayer();
      this.setVideo();
    });
  }
  componentDidUpdate(prevProps) {
    if (prevProps.src !== this.props.src) {
      this.initialization.then(() => this.setVideo());
    }
  }
  setVideo() {
    const {src, videoStartTime, videoEndTime, onVideoEnd} = this.props;
    // console.log('videoStartTime', videoStartTime);
    // console.log('videoEndTime', videoEndTime);
    if (!src || !src.url) {
      this.player.pause();
      return;
    }
    // let azureSrc = {
    //   src: src.url,
    //   type: 'application/vnd.ms-sstr+xml'
    // };

    console.log('src.url', src.url);

    let azureSrc = [
      {
        src: src.url,
        type: 'application/vnd.ms-sstr+xml',
        protectionInfo: [
          {
            type: 'AES',
            authenticationToken: src.jwt
          }
        ]
      }
    ];
    // https://stackoverflow.com/questions/31266839/microsoft-azure-media-player-start-at-defined-time
    const startTime = () => {
      console.log(window.startTime);
      this.player.currentTime(window.startTime);
      this.player.removeEventListener(window.amp.eventName.play, startTime);
    };

    const localOnUpdate = () => {
      let t = this.player.currentTime();
      // console.log('cool', t);
      if (t >= window.startTime + 30) {
        this.player.removeEventListener('timeupdate', localOnUpdate);
        this.player.removeEventListener(window.amp.eventName.play, startTime);
        this.player.pause();
        onVideoEnd();
      }
    };

    this.player.removeEventListener('timeupdate', localOnUpdate);
    this.player.removeEventListener(window.amp.eventName.play, startTime);

    this.player.addEventListener('timeupdate', localOnUpdate);
    this.player.addEventListener(window.amp.eventName.play, startTime);
    this.player.src(azureSrc);
  }
  createPlayer() {
    const {options, onInstanceCreated} = this.props;
    const defaultOptions = {
      controls: true,
      logo: {enabled: true}
    };
    this.player = window.amp(
      this.videoNode.current,
      Object.assign({}, defaultOptions, options)
    );
    onInstanceCreated && onInstanceCreated(this.player);
  }
  getRatioStyles(ratio) {
    if (!ratio) {
      return {};
    }
    return {paddingBottom: (ratio[1] / ratio[0]) * 100 + '%'};
  }
  render() {
    const {adaptRatio = DEFAULT_RATIO} = this.props;
    return (
      <div
        className="azure-mp-container"
        style={this.getRatioStyles(adaptRatio)}>
        <video
          id="vidPlayer"
          className="azuremediaplayer amp-flush-skin amp-big-play-centered "
          tabIndex="0"
          ref={this.videoNode}
        />
      </div>
    );
  }
}

export default AzureMP;
