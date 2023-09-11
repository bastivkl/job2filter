import React from 'react';
import './Recommendations.css';

const Recommendations = ({ recommendations }) => {
  return (
    <div className="recommendations">
      <h1>LinkedIn Recruiter Recommendations</h1>
      <table className="recommendation-table">
        <thead>
          <tr>
            <th>Filter Name</th>
            <th>Recommendation</th>
          </tr>
        </thead>
        <tbody>
          {recommendations.map((rec, index) => (
            <tr key={index}>
              <td>{rec.filterName}</td>
              <td>{rec.recommendation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;