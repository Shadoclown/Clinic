import React from 'react'
import './style/Home.css'
import { getClinicStats, getTodayAppointments } from '../utils/patientData';

function Home() {
    // Get data from our utility functions
    const clinicStats = getClinicStats();
    const todayAppointments = getTodayAppointments();
    
    const stats = [
        { 
            title: 'ผู้ป่วยใหม่', 
            value: clinicStats.newPatients, 
            icon: '👥',
            color: 'blue'
        },
        { 
            title: 'นัดหมายของวันนี้', 
            value: clinicStats.dailyAppointments, 
            icon: '📅',
            color: 'orange'
        },
        { 
            title: 'รายได้วันนี้', 
            value: `฿${clinicStats.revenue}`, 
            icon: '💰',
            color: 'green'
        },
        { 
            title: 'เตียงที่ใช้งาน', 
            value: clinicStats.bedsOccupied, 
            icon: '🛏️',
            color: 'blue'
        }
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
                    </div>
                    
                    <table className="appointments-table thai-clinic-table">
                        <thead>
                            <tr>
                                <th>เวลา</th>
                                <th>ชื่อผู้ป่วย</th>
                                <th>บริการ</th>
                                <th>หมายเหตุ</th>
                                <th>คอร์ส</th>
                                <th>จำนวนครั้ง</th>
                                <th>การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todayAppointments.length === 0 ? (
                                <tr>
                                    <td colSpan="7" style={{textAlign: 'center', padding: '20px'}}>
                                        ไม่พบข้อมูลนัดหมาย
                                    </td>
                                </tr>
                            ) : (
                                todayAppointments.map((appointment, index) => (
                                    <tr key={index}>
                                        <td className="appointment-time-cell">
                                            <div className="appointment-time">
                                                <span className="time">{appointment.time}</span>
                                            </div>
                                        </td>
                                        <td className="appointment-name-cell">{appointment.patientName}</td>
                                        <td>{appointment.service}</td>
                                        <td className="appointment-issue-cell">{appointment.notes}</td>
                                        <td>{appointment.course[0]}</td>
                                        <td>{appointment.course[1]}/{appointment.course[2]}</td>
                                        <td className="table-actions">
                                            <button className="action-btn view-btn">ดูรายละเอียด</button>
                                            <button className="action-btn edit-btn">แก้ไข</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Home