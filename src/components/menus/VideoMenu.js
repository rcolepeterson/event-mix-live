import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import VideoMenuItem from './VideoMenuItem';
import './VideoMenu.css';

export default ({
  documents = [],
  onVideoSelect = () => {},
  selectedDocId = 0
}) => {
  const thumbnails = documents.map((item, i) => {
    const {name, documentId, confidence} = item;
    return (
      <div key={i}>
        <VideoMenuItem
          onVideoSelect={onVideoSelect}
          document={item.doc}
          topicMatch={name}
          selectedDocId={documentId}
          relevance={item.score.relevance}
        />
      </div>
    );
  });

  return (
    <div className="video-menu container-with-dots">
      <h3>Most relevant segments:</h3>
      {documents.length > 0 && (
        <Carousel
          additionalTransfrom={0}
          arrows={true}
          autoPlaySpeed={3000}
          centerMode={false}
          className=""
          containerClass="container-with-dots"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={{
            desktop: {
              breakpoint: {
                max: 3000,
                min: 1024
              },
              items: 3,
              partialVisibilityGutter: 0
            },
            mobile: {
              breakpoint: {
                max: 464,
                min: 0
              },
              items: 1,
              partialVisibilityGutter: 30
            },
            tablet: {
              breakpoint: {
                max: 1024,
                min: 464
              },
              items: 1,
              partialVisibilityGutter: 0
            }
          }}
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable>
          {thumbnails}
        </Carousel>
      )}
    </div>
  );
};
