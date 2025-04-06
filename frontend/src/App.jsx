import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ExampleComponent from './components/ExampleComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/example" element={<ExampleComponent />} />
      </Routes>
    </Router>
  );
}

export default App;