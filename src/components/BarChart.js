import React from 'react';
import './BarChart.css';

export default ({label = 'test label', relevance = 0.8}) => {
  let percentage = relevance * 100;
  let perc = percentage.toFixed(0) + '%';
  return (
    <div>
      <p className="barLabel">{label}</p>

      <div className="barHolder">
        <div className="bar"></div>
        <div className="bar value" style={{width: perc}}></div>
      </div>
    </div>
  );
};
