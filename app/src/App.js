import React from 'react';
import {Routes, Route} from 'react-router-dom';

import Welcome from 'pages/Welcome';

function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Welcome />}/>
      </Routes>
  );
}

export default App;
