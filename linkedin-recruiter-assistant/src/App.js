import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputArea from './components/InputArea';
import Recommendations from './components/Recommendations';

function App() {
  const [recommendations, setRecommendations] = useState('Your recommendations will appear here.');
  const [recommendationsArray, setRecommendationsArray] = useState([]);

  useEffect(() => {
    // Convert the recommendations string into an array
    if (typeof recommendations === 'string') {
      setRecommendationsArray(recommendations.split(';')); // Assuming recommendations are separated by semicolons
    }
  }, [recommendations]);

  return (
    <div className="App">
      <InputArea setRecommendations={setRecommendations} />
      <Recommendations recommendations={recommendationsArray} />
    </div>
  );
}

export default App;