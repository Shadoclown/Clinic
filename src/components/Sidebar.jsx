import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style/Sidebar.css';
import ClinicLogo from '../assets/clinic-logo.png';

function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const closeSidebar = () => setIsOpen(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    const location = useLocation();
    const menu_items = [
        { name: 'หน้าหลัก', icon: '🏠', path: '/' },
        { name: 'ตารางนัด', icon: '📅', path: '/appointments' },
        { name: 'ห้องตรวจ', icon: '🩺', path: '/examination' },
        { name: 'เวชระเบียน', icon: '📋', path: '/Records' },
        { name: 'ตั้งค่า', icon: '⚙️', path: '/settings' },
    ];

    return (
        <>
            {/* Hamburger button to OPEN the menu (mobile only) */}
            <button className={`sidebar-toggle ${isOpen ? 'toggle-close' : ''}`} onClick={toggleSidebar} aria-label="Open menu">
                ☰
            </button>

            {/* The main sidebar element */}
            <aside className={`sidebar ${isOpen ? 'is-open' : ''}`}>
                {/* THIS IS THE NEW CLOSE BUTTON */}
                <button className="sidebar-close-btn" onClick={closeSidebar} aria-label="Close menu">
                    ✕
                </button>
                
                <div className="sidebar-header">
                    <div className="logo-image">
                        <img src={ClinicLogo} alt="Clinic Logo" />
                    </div>
                    <div className="logo-name">
                        <h2>ไซ่ฮั่น คลินิก</h2>
                        <p>สาขา : วัชรพล</p>
                    </div>
                </div>
                <nav className="side-menu">
                    <ul>
                        {menu_items.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.path}
                                    className={`menu-link ${location.pathname === item.path ? 'active' : ''}`}
                                    onClick={closeSidebar} // Close on link click
                                >
                                    <span className="icon">{item.icon}</span>
                                    <span className="name">{item.name}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </aside>

            {/* Overlay for closing the menu */}
            {isOpen && <div className="sidebar-overlay" onClick={closeSidebar}></div>}
        </>
    );
}

export default Sidebar;