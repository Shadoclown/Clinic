import React, { useState } from 'react';
// import './Homepage.css'; // REMOVED - styles are now in App.css
import AddAppointmentForm from './AddAppointmentForm'; // Import the new form component

function Homepage() {
  const [showAddForm, setShowAddForm] = useState(false); // State to control form visibility

  // Existing mock appointments for the homepage summary table
  const appointments = [
    { time: '09:00', name: 'นายสมชาย ใจดี', service: 'ฝังเข็ม', status: 'เสร็จสิ้น' },
    { time: '09:30', name: 'นางสมหญิง รักษ์ดี', service: 'กัวซา', status: 'กำลังรักษา' },
    { time: '10:00', name: 'นายวิชัย เก่งมาก', service: 'ครอบแก้ว', status: 'รอ' },
    { time: '10:30', name: 'นางสาวมณี สวยงาม', service: 'ฝังเข็ม + กัวซา', status: 'รอ' },
    { time: '11:00', name: 'นายประยุทธ์ แข็งแรง', service: 'นวดแผนไทย', status: 'รอ' },
  ];

  const handleSaveNewAppointment = (newApptData) => {
    // In a real app, you'd integrate this with your global state/API
    console.log("New appointment saved (from Homepage):", newApptData);
    // You might want to refresh your appointment list here or add the new item to state
  };

  return (
    <div className="homepage">
      <div className="homepage-header">
        <h2 className="homepage-title">ภาพรวมประจำวัน</h2>
        <div className="homepage-actions">
          <button className="add-button" onClick={() => setShowAddForm(true)}> {/* Click to show form */}
            <span className="add-icon">+</span> เพิ่มนัดหมาย
          </button>
          <span className="update-text">อัปเดตล่าสุด: 15:52:02</span>
        </div>
      </div>

      <div className="overview-cards">
        <div className="card">
          <div className="card-content">
            <p className="card-label">ผู้ป่วยวันนี้</p>
            <p className="card-value">24</p>
            <p className="card-detail">+3 จากเมื่อวาน</p>
          </div>
          <span className="card-icon patient-icon">🧑‍🤝‍🧑</span>
        </div>

        <div className="card">
          <div className="card-content">
            <p className="card-label">คิวที่เหลือ</p>
            <p className="card-value">8</p>
            <p className="card-detail">กำลังรอ</p>
          </div>
          <span className="card-icon queue-icon">⏳</span>
        </div>

        <div className="card">
          <div className="card-content">
            <p className="card-label">เตียงที่ใช้งาน</p>
            <p className="card-value">5/8</p>
            <p className="card-detail">3 เตียงว่าง</p>
          </div>
          <span className="card-icon bed-icon">🛏️</span>
        </div>

        <div className="card">
          <div className="card-content">
            <p className="card-label">นัดหมายวันนี้</p>
            <p className="card-value">16</p>
            <p className="card-detail">เสร็จแล้ว 8 ราย</p>
          </div>
          <span className="card-icon appointment-icon">🗓️</span>
        </div>
      </div>

      <div className="appointment-schedule">
        <div className="schedule-header">
          <h3 className="schedule-title">ตารางนัดหมายวันนี้</h3>
          <button className="view-all-button">ดูทั้งหมด</button>
        </div>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>เวลา</th>
              <th>ชื่อผู้ป่วย</th>
              <th>บริการ</th>
              <th>สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={index}>
                <td>{appt.time}</td>
                <td>{appt.name}</td>
                <td>{appt.service}</td>
                <td>
                  <span className={`status-badge ${appt.status === 'เสร็จสิ้น' ? 'status-done' : appt.status === 'กำลังรักษา' ? 'status-in-progress' : 'status-pending'}`}>
                    {appt.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddForm && (
        <AddAppointmentForm
          onClose={() => setShowAddForm(false)}
          onSave={handleSaveNewAppointment}
        />
      )}
    </div>
  );
}

export default Homepage;