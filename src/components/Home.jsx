import React from 'react'
import './style/Home.css'

function Home() {
    const stats = [
        { 
            title: 'ผู้ป่วยใหม่', 
            value: '24', 
            change: '+12% จากเมื่อวาน', 
            icon: '👥',
            color: 'blue'
        },
        { 
            title: 'นัดหมายของเมื่อ', 
            value: '8', 
            change: '3 นัดครึ่งวัน', 
            icon: '📅',
            color: 'orange'
        },
        { 
            title: 'รายได้วันนี้', 
            value: '฿12,450', 
            change: '+8.2% จากเมื่อวาน', 
            icon: '💰',
            color: 'green'
        },
        { 
            title: 'เซียงต์โร่งาน', 
            value: '6/9', 
            change: '3 เซียงว่าง', 
            icon: '📊',
            color: 'blue'
        }
    ]

    const appointments = [
        { time: '09:30', name: 'นางสาว สมใจ โลดี', issue: 'ตรวจสุขภาพท่าที่ปี', status: 'รอตรวจ' },
        { time: '10:00', name: 'นาย วิชิต สมชาย', issue: 'ฉีดวัคซีน', status: 'เข้าตรวจแล้ว' },
        { time: '10:30', name: 'นางสมหญิง โจเซ็น', issue: 'ตรวจหู คอ จมูก', status: 'รอตรวจ' },
        { time: '11:00', name: 'เด็กชาย โจดี ก็สบุ', issue: 'ตรวจสุขภาพเด็ก', status: 'รอตรวจ' }
    ]

    const quickActions = [
        { name: 'ลงทะเบียนผู้ป่วยใหม่', icon: '👤' },
        { name: 'จัดการตารางนัด', icon: '📅' },
        { name: 'บันทึกรายรับ-จ่าย', icon: '💳' },
        { name: 'สรายงานยอดขาย', icon: '📈' }
    ]

    return (
        <div className="home-container">
            <div className="home-header">
                <div className="header-text">
                    <h1>แดชบอร์ด</h1>
                    <p>ภาพรวมการดำเนินงานคลินิกในวันนี้</p>
                </div>
                <button className="add-button">
                    + เพิ่มข้อมูล
                </button>
            </div>

            {/* Stats Cards */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className={`stat-card ${stat.color}`}>
                        <div className="stat-content">
                            <div className="stat-text">
                                <h3>{stat.title}</h3>
                                <div className="stat-value">{stat.value}</div>
                                <p className="stat-change">{stat.change}</p>
                            </div>
                            <div className="stat-icon">
                                <span>{stat.icon}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="content-grid">
                {/* Appointments Section */}
                <div className="appointments-section">
                    <div className="section-header">
                        <h2>นัดหมายวันนี้</h2>
                        <button className="calendar-btn">📅 ลิงวันหนด</button>
                    </div>
                    
                    <div className="appointments-list">
                        {appointments.map((appointment, index) => (
                            <div key={index} className="appointment-item">
                                <div className="appointment-time">
                                    <span className="time">{appointment.time}</span>
                                </div>
                                <div className="appointment-details">
                                    <h4>{appointment.name}</h4>
                                    <p>{appointment.issue}</p>
                                </div>
                                <div className="appointment-status">
                                    <span className={`status ${appointment.status === 'เข้าตรวจแล้ว' ? 'completed' : 'pending'}`}>
                                        {appointment.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions Section */}
                <div className="quick-actions-section">
                    <h2>การดำเนินการด่วน</h2>
                    <div className="quick-actions-list">
                        {quickActions.map((action, index) => (
                            <div key={index} className="quick-action-item">
                                <span className="action-icon">{action.icon}</span>
                                <span className="action-name">{action.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home