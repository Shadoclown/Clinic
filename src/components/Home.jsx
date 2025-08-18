import React, { useState } from 'react';
import './style/Home.css';
import { getClinicStats, getTodayAppointments } from '../utils/patientData';
import AddAppointment from './AddAppointment';
import PatientDetailExpanded from './PatientDetailExpanded';

// Sub-component for the header section
const HomeHeader = ({ onAddClick }) => (
    <div className="home-header">
        <div className="header-text">
            <h1>แดชบอร์ด</h1>
            <p>ภาพรวมการดำเนินงานคลินิกในวันนี้</p>
        </div>
        <button className="add-button" onClick={onAddClick}>+ เพิ่มข้อมูล</button>
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
const AppointmentsTable = ({ appointments }) => {
    const [expandedRowIndex, setExpandedRowIndex] = useState(null);
    
    const toggleRowExpansion = (index) => {
        // If clicking the already expanded row, collapse it
        // Otherwise expand the clicked row (and implicitly collapse any other)
        setExpandedRowIndex(expandedRowIndex === index ? null : index);
    };

    return (
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
                            <React.Fragment key={`${appt.id}-${index}`}>
                                <tr>
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
                                        <button 
                                            className="action-btn view-btn"
                                            onClick={() => toggleRowExpansion(index)}
                                        >
                                            {expandedRowIndex === index ? 'ซ่อนข้อมูล' : 'ดูรายละเอียด'}
                                        </button>
                                        <button className="action-btn edit-btn">แก้ไข</button>
                                    </td>
                                </tr>
                                {expandedRowIndex === index && (
                                    <tr className="patient-detail-row">
                                        <td colSpan="7">
                                            <PatientDetailExpanded patient={appt} />
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

function Home() {
    // State to control modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Fetching data from utility functions
    const clinicStats = getClinicStats();
    const [appointments, setAppointments] = useState(getTodayAppointments());

    const statsData = [
        { title: 'ผู้ป่วยใหม่', value: clinicStats.newPatients, icon: '👥', color: 'blue' },
        { title: 'นัดหมายของวันนี้', value: clinicStats.dailyAppointments, icon: '📅', color: 'orange' },
        { title: 'รายได้วันนี้', value: `฿${clinicStats.revenue}`, icon: '💰', color: 'green' },
        { title: 'เตียงที่ใช้งาน', value: clinicStats.bedsOccupied, icon: '🛏️', color: 'blue' }
    ];
    
    // Handler for saving a new appointment
    const handleSaveAppointment = (newAppointment) => {
        // In a real application, we would save this to the backend
        // For this demo, we'll just update the local state
        console.log("New appointment saved:", newAppointment);
        
        // Add to local state to immediately show in the UI
        // Create appointment format needed by the table
        const appointmentForTable = {
            id: newAppointment.id,
            time: newAppointment.details.time,
            patientName: newAppointment.details.name,
            phone: 'xxx-xxx-xxxx',
            service: newAppointment.details.service,
            notes: newAppointment.details.comment,
            course: newAppointment.details.course
        };
        
        // Only add to today's appointments if the date matches today
        const today = new Date();
        const todayStr = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear() + 543}`;
        
        if (newAppointment.details.date === todayStr) {
            setAppointments([...appointments, appointmentForTable]);
        }
        
        // In a real application, we would update patients.json here
        // For demo purposes, we're just showing the concept
        alert("นัดหมายถูกบันทึกเรียบร้อยแล้ว!");
    };

    return (
        <div className="home-container">
            <HomeHeader onAddClick={() => setIsModalOpen(true)} />

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
                <AppointmentsTable appointments={appointments} />
            </div>
            
            {/* Add Appointment Modal */}
            <AddAppointment 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveAppointment}
            />
        </div>
    );
}

export default Home;