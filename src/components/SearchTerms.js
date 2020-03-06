import React from 'react';
import './SearchTerms.css';

export default ({searchTerms}) => {
  return (
    <div className="interests search-interests">
      {searchTerms.map((item, i) => {
        return (
          <div key={item + i} className="interest">
            {item}
          </div>
        );
      })}
    </div>
  );
};
