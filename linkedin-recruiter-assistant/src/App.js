import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputArea from './components/InputArea';
import Recommendations from './components/Recommendations';

function App() {
  // Initialize recommendations as an array with a single string element
  const [recommendations, setRecommendations] = useState(['Your recommendations will appear here.']);

  return (
    <div className="App">
      <InputArea setRecommendations={setRecommendations} />
      <Recommendations recommendations={recommendations} />
    </div>
  );
}

export default App;

