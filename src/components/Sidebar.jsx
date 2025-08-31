import React from 'react';

function Sidebar({ currentPage, onNavigate }) { // Accept props
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <span className="sidebar-icon">👨‍⚕️</span>
        <h1 className="sidebar-title">คลินิกแพทย์แผนไทย</h1>
      </div>
      <nav className="sidebar-nav">
        <ul className="sidebar-nav-list">
          <li
            className={`sidebar-nav-item ${currentPage === 'homepage' ? 'active' : ''}`}
            onClick={() => onNavigate('homepage')}
          >
            <span className="nav-icon">🏠</span>
            หน้าหลัก
          </li>
          <li
            className={`sidebar-nav-item ${currentPage === 'appointments' ? 'active' : ''}`}
            onClick={() => onNavigate('appointments')}
          >
            <span className="nav-icon">🗓️</span>
            ตารางนัดหมาย
          </li>
          <li className="sidebar-nav-item">
            <span className="nav-icon">📄</span>
            เวชระเบียน
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;