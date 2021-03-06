import React from 'react';
import './VideoMenuItem.css';
import Barchart from '../BarChart';
import LinesEllipsis from 'react-lines-ellipsis';
import {
  convertTimeStampToSeconds,
  convertSecondsToTimeStamp
} from '../../utils';

export default ({
  relevance = 55,
  document = {
    title: 'Here is the title',
    desc: 'text will go here for people to read',
    length: '00:00:00',
    id: 1
  },
  onVideoSelect,
  searchTerms,
  selectedDocId = 100
}) => {
  const {id, name, topicName, thumbnailId} = document;

  const length = document.data
    ? convertTimeStampToSeconds(document.data.videoEndTime) -
      convertTimeStampToSeconds(document.data.videoStartTime)
    : '00:00:00';
  let timestamp = convertSecondsToTimeStamp(length);

  const title = document.data.title;
  const vt = document.data.videoUrl.split('/');
  const videoName = vt[vt.length - 1].split('_')[0].toLowerCase();
  const imgPath =
    process.env.PUBLIC_URL + `/images/thumbnailsforTED/${videoName}.png`;

  let className = id === selectedDocId ? 'videoBox selected' : 'videoBox';

  let barArray = window.searchTermsArray.filter(
    item => item !== document.strSearchValue
  );

  return (
    <div
      className="videoMenuItem"
      onClick={() => {
        onVideoSelect(id);
      }}>
      <LinesEllipsis
        text={title}
        maxLine="1"
        ellipsis="..."
        trimRight
        basedOn="letters"
      />
      <div className="video-item-display">
        <div className={className}>
          <img alt="thumb" src={imgPath} />
          <div className="videoTimeStamp">{timestamp}</div>
        </div>
        <div className="video-stats">
          <Barchart label={document.strSearchValue} relevance={relevance} />
          {barArray.map(item => {
            let val = Math.floor(Math.random() * (63 - 1 + 1)) + 1;
            let randPer = '0.' + val;
            return <Barchart key={item} label={item} relevance={randPer} />;
          })}

          <div style={{margin: 30}}></div>
        </div>
      </div>
    </div>
  );
};
