import React from 'react';
import './style/Home.css';
import { getClinicStats, getTodayAppointments } from '../utils/patientData';

// Sub-component for the header section
const HomeHeader = () => (
    <div className="home-header">
        <div className="header-text">
            <h1>แดชบอร์ด</h1>
            <p>ภาพรวมการดำเนินงานคลินิกในวันนี้</p>
        </div>
        <button className="add-button">+ เพิ่มข้อมูล</button>
    </div>
);

// Sub-component for individual statistic cards
const StatCard = ({ title, value, icon, color }) => (
    <div className={`stat-card ${color}`}>
        <div className="stat-content">
            <div className="stat-text">
                <h3>{title}</h3>
                <div className="stat-value">{value}</div>
            </div>
            <div className="stat-icon">
                <span>{icon}</span>
            </div>
        </div>
    </div>
);

// Sub-component for the appointments table
const AppointmentsTable = ({ appointments }) => (
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
                {appointments.length === 0 ? (
                    <tr>
                        <td colSpan="7" className="no-data-cell">
                            ไม่พบข้อมูลนัดหมาย
                        </td>
                    </tr>
                ) : (
                    appointments.map((appt, index) => (
                        <tr key={index}>
                            <td className="appointment-time-cell">
                                <div className="appointment-time">
                                    <span className="time">{appt.time}</span>
                                </div>
                            </td>
                            <td className="appointment-name-cell">{appt.patientName}</td>
                            <td>{appt.service}</td>
                            <td className="appointment-issue-cell">{appt.notes}</td>
                            <td>{appt.course[0]}</td>
                            <td>{`${appt.course[1]}/${appt.course[2]}`}</td>
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
);

function Home() {
    // Fetching data from utility functions
    const clinicStats = getClinicStats();
    const todayAppointments = getTodayAppointments();

    const statsData = [
        { title: 'ผู้ป่วยใหม่', value: clinicStats.newPatients, icon: '👥', color: 'blue' },
        { title: 'นัดหมายของวันนี้', value: clinicStats.dailyAppointments, icon: '📅', color: 'orange' },
        { title: 'รายได้วันนี้', value: `฿${clinicStats.revenue}`, icon: '💰', color: 'green' },
        { title: 'เตียงที่ใช้งาน', value: clinicStats.bedsOccupied, icon: '🛏️', color: 'blue' }
    ];

    return (
        <div className="home-container">
            <HomeHeader />

            <div className="stats-grid">
                {statsData.map((stat, index) => (
                    <StatCard
                        key={index}
                        title={stat.title}
                        value={stat.value}
                        icon={stat.icon}
                        color={stat.color}
                    />
                ))}
            </div>

            <div className="content-grid">
                <AppointmentsTable appointments={todayAppointments} />
            </div>
        </div>
    );
}

export default Home;