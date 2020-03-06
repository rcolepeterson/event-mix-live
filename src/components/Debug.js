import React from 'react';
//import NatLang from './NLU';
import {Button} from '@material-ui/core';
export default ({documents}) => {
  const [on, setOn] = React.useState('none');
  return (
    <div className="debug">
      <Button
        onClick={() => {
          let value = on === 'none' ? 'block' : 'none';
          setOn(value);
        }}>
        Debug
      </Button>

      {/* id: "e429d0e705"
name: "JuanEnriquez_2003"
publishedUrl: "https://rodmandev.streaming.mediaservices.windows.net/6e1f85f1-8c7f-4478-b93a-a19d78feb237/JuanEnriquez_20.ism/manifest(encryption=cbc)"
topics: (19) [{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
viewToken: "Bearer=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cm46bWljcm9zb2Z0OmF6dXJlOm1lZGlhc2VydmljZXM6Y29udGVudGtleWlkZW50aWZpZXIiOiI2MTM3ZWFiOC1kOThkLTQ5ZWQtYjMzZi0wZTMzNjhhMjBhZDQiLCJuYmYiOjE1NzY4ODYyMTQsImV4cCI6MTU3NjkyOTQ3NCwiaXNzIjoiaHR0cHM6Ly9icmVha2Rvd24ubWUiLCJhdWQiOiJCcmVha2Rvd25Vc2VyIn0.0QnggM09FpbWGUY5rUFrG6X4zqroyPOcgaTfbT2Oodk"
_attachments: "attachments/"
_etag: ""660012a8-0000-0800-0000-5dfd60030000""
_rid: "LzZsAJciigQCAAAAAAAAAA=="
_self: "dbs/LzZsAA==/colls/LzZsAJciigQ=/docs/LzZsAJciigQCAAAAAAAAAA==/"
_ts: 1576886275 */}

      <div style={{width: 'auto', display: on}}>
        {documents.map((item, i) => {
          let key = item.id + i;
          return (
            <div key={key}>
              <p>
                <strong>Video {i}</strong>
              </p>
              {/* <p>Bucket: {item.score.winningBucket}</p>
              <p>StrSearchValue: {item.doc.strSearchValue}</p>
              <p>Relevance: {item.score.relevance}</p> */}
              <p>Video Title: {item.name}</p>
              {/* <NatLang nlu={item.doc.data.NLU} /> */}

              <div>
                {item.topics &&
                  item.topicMatch.map((item, i) => {
                    return (
                      <p key={i}>
                        text: {item.name} <strong>confidence:</strong>{' '}
                        {item.confidence}
                        {/* <strong>count:</strong>
                        {item.count} */}
                      </p>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
