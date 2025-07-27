import React from 'react'
import {Link, useLocation} from 'react-router-dom' //npm install react-router-dom
import './style/Sidebar.css'
import ClinicLogo from '../assets/clinic-logo.png' // Importing the logo image
function Sidebar() {
    const location = useLocation()
    const menu_items = [
        { name: 'หน้าหลัก', icon: '🏠', path: '/' },
        { name: 'ตารางนัด', icon: '📅', path: '/appointments'},
        { name: 'ห้องตรวจ', icon: '🩺', path: '/examination' },
        { name: 'เวชระเบียน', icon: '📋', path: '/medical-records' },
        { name: 'ห้องยาและการชำระ', icon: '💊', path: '/pharmacy-payment' },
        { name: 'รับเลข', icon: '🎫', path: '/queue' },
        { name: 'คลังคลินิก', icon: '📦', path: '/inventory' },
        { name: 'สถิติ', icon: '📊', path: '/statistics' },
        { name: 'รายงาน', icon: '📄', path: '/reports' },
        { name: 'ผู้ดูแลระบบ', icon: '👥', path: '/admin' },
        { name: 'ตั้งค่า', icon: '⚙️', path: '/settings' },
    ]

    return (
        <aside className='sidebar'>
            <div className="sidebar-header">
                <div className="logo-image">
                    <img src={ClinicLogo} alt="" className="image" /> 
                    {/* https://placehold.co/100 */}
                </div>
                <div className="logo-name">
                    <h2>ไซ่ฮั่น คลินิก</h2>
                    <p>สาขา : วัชรพล</p>
                </div>
            </div>
            <div className="side-menu">
                <ul>
                    {menu_items.map((item, index) => (
                        <li key={index}>
                            <Link 
                                to={item.path} 
                                className={`menu-link ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                <span className="icon">{item.icon}</span>
                                <span className="name">{item.name}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    )
}

export default Sidebar