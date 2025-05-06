import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import SetupPage from './Pages/SetupPage';
import ComposePage from './Pages/ComposePage';
import FinalizePage from './Pages/FinalizePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/setup" element={<SetupPage />} />
        <Route path="/compose" element={<ComposePage />} />
        <Route path="/finalize" element={<FinalizePage />} />
      </Routes>
    </Router>
  );
};

export default App;