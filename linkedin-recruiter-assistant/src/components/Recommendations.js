import React from 'react';
import './Recommendations.css';

const Recommendations = ({ recommendations }) => {
  return (
    <div className="recommendations">
      <h1>LinkedIn Recruiter Recommendations</h1>
      <div className="recommendation-box">
        <p>{recommendations}</p>
      </div>
    </div>
  );
};

export default Recommendations;