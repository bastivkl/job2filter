import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputArea from './components/InputArea';
import Recommendations from './components/Recommendations';

function App() {
  return (
    <div className="App">
      <InputArea />
      <Recommendations recommendations="Your recommendations will appear here." />
    </div>
  );
}

export default App;
