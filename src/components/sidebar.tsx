import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style/Sidebar.css'; // Import the stylesheet

const navItems = [
    { icon: 'icon-home', text: 'หน้าหลัก', path: '/' },
    { icon: 'icon-calendar', text: 'ตารางนัด', path: '/appointments' },
    { icon: 'icon-stethoscope', text: 'ห้องตรวจ', path: '/examination' },
    { icon: 'icon-file-text', text: 'เวชระเบียน', path: '/records' },
    { icon: 'icon-credit-card', text: 'ห้องยาและการเงิน', path: '/pharmacy-finance' },
    { icon: 'icon-clock', text: 'จับเวลา', path: '/timer' },
    { icon: 'icon-box', text: 'คลังสินค้า', path: '/inventory' },
    { icon: 'icon-bar-chart', text: 'สถิติ', path: '/statistics' },
    { icon: 'icon-document-report', text: 'รายงาน', path: '/reports' },
    { icon: 'icon-users', text: 'ผู้ดูแลระบบ', path: '/admin' },
    { icon: 'icon-cog', text: 'ตั้งค่า', path: '/settings' },
];

const Sidebar = () => {
    const location = useLocation();

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <img src="https://placehold.co/80"></img>
                </div>
                <div className="brand-info">
                    <h1 className="brand-name">ไซ่ฮั่น คลินิก</h1>
                    <p className="brand-subtitle">สาขา : กรุงเทพฯ</p>
                </div>
            </div>

            <nav className="sidebar-nav">
                <ul>
                    {navItems.map((item) => (
                        <li key={item.text}>
                            <Link to={item.path} className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
                                <i className={`icon ${item.icon}`}></i>
                                <span className="nav-text">{item.text}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <div className="sidebar-footer">
                <p>© 2024 MediClinic System</p>
            </div>
        </aside>
    );
};

export default Sidebar;