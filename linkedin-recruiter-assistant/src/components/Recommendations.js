import React from 'react';
import './Recommendations.css';

const Recommendations = ({ recommendations }) => {
  return (
    <div className="recommendations">
      <h1>LinkedIn Recruiter Recommendations</h1>
      <div className="recommendation-box">
        <ul>
          {recommendations && recommendations.length > 0 ? (
            recommendations.map((rec, index) => <li key={index}>{rec}</li>)
          ) : (
            <li>No recommendations available</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Recommendations;