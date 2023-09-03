import React, { useState } from 'react';
import './InputArea.css';

const InputArea = ({ setRecommendations }) => {
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = () => {
    fetch('https://job2filter.onrender.com/recommendations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ job_description: jobDescription }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.recommendations) {
        setRecommendations(data.recommendations);
      } else if (data.error) {
        console.error('There was an error fetching recommendations:', data.error);
      }
    })
    .catch(error => {
      console.error('There was an error fetching recommendations:', error);
    });
  };

  return (
    <div className="input-area">
      <h1>Job Description</h1>
      <div className="input-box">
        <textarea 
          rows="10" 
          placeholder="Paste the job description here..." 
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" onClick={handleSubmit}>Get Recommendations</button>
    </div>
  );
};

export default InputArea;


