import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import HeaderInfo from './components/HeaderInfo';
import Homepage from './components/Homepage';
import AppointmentPage from './components/AppointmentPage'; // New import
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('homepage'); // State to manage current page

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="app-container">
      <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      <div className="main-content">
        <HeaderInfo />
        {currentPage === 'homepage' && <Homepage />}
        {currentPage === 'appointments' && <AppointmentPage />}
      </div>
    </div>
  );
}

export default App;