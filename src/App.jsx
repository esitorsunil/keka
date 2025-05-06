
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DocumentHeader from './DocumentHeader';
import HomePage from './HomePage';

const Setup = () => <><DocumentHeader /><h2 className="text-center">Setup Page</h2></>;
const Compose = () => <><DocumentHeader /><h2 className="text-center">Compose Page</h2></>;
const Finalize = () => <><DocumentHeader /><h2 className="text-center">Finalize Page</h2></>;

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/compose" element={<Compose />} />
        <Route path="/finalize" element={<Finalize />} />
      </Routes>
    </Router>
  );
};

export default App;
