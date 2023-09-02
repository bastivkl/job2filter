import React, { useState } from 'react';
import './InputArea.css';

const InputArea = ({ setRecommendations }) => {
  const [jobDescription, setJobDescription] = useState('');
  const [jobUrl, setJobUrl] = useState('');

  // Function to scrape job ad from a URL
  const handleScrape = () => {
    fetch('https://job2filter.onrender.com/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: jobUrl }),
    })
    .then(response => response.json())
    .then(data => {
      if (data.job_description) {
        setJobDescription(data.job_description);
      }
    })
    .catch(error => {
      console.error('There was an error scraping the job ad:', error);
    });
  };

  // Function to get recommendations based on the job description
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
        <input 
          type="text" 
          placeholder="Paste the job ad URL here..." 
          onChange={(e) => setJobUrl(e.target.value)}
        />
        <button type="button" onClick={handleScrape}>Scrape Job Ad</button>
      </div>
      <div className="input-box">
        <textarea 
          rows="10" 
          placeholder="Or paste the job description here..." 
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" onClick={handleSubmit}>Get Recommendations</button>
    </div>
  );
};

export default InputArea;

