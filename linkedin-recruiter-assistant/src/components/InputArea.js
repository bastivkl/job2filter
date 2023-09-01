import React, { useState } from 'react';
import axios from 'axios';
import './InputArea.css';

const InputArea = ({ setRecommendations }) => {
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/recommendations', {
        job_description: jobDescription
      });
      setRecommendations(response.data.recommendations);
    } catch (error) {
      console.error('There was an error fetching recommendations:', error);
    }
  };

  return (
    <div className="input-area">
      <h1>Paste Job Description</h1>
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