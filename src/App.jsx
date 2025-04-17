import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import DeploymentForm from './pages/DeploymentForm/DeploymentForm';
import DeploymentDetail from './pages/DeploymentDetail/DeploymentDetail';
import { DeploymentProvider } from './context/DeploymentContext';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider>
      <DeploymentProvider>
        <Router>
          <div className="app">
            <Header />
            <main>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/new" element={<DeploymentForm />} />
                <Route path="/deployment/:id" element={<DeploymentDetail />} />
              </Routes>
            </main>
          </div>
        </Router>
      </DeploymentProvider>
    </ThemeProvider>
  );
}

export default App;