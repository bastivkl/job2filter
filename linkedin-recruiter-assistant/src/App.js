import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputArea from './components/InputArea';
import Recommendations from './components/Recommendations';
import cors from "cors";
const corsOrigin ={
    origin:'http://localhost:3000', //or whatever port your frontend is using
    credentials:true,            
    optionSuccessStatus:200
}
function App() {
  return (
    <div className="App">
      <InputArea />
      <Recommendations recommendations="Your recommendations will appear here." />
    </div>
  );
}

export default App;