import React from 'react';
import '../style/Appointment/today.css';

const TodayView = ({ appointments }) => (
    <div className="today-view">
        <div className="today-header">
            <h3>รายการนัดหมายวันนี้</h3>
            <span>{appointments.length} รายการ</span>
        </div>
        {appointments.map(app => (
            <div key={app.id} className="appointment-card">
                <div className="card-left">
                    <p className="time">🕒 {app.time}  {app.id}</p>
                    <p className="patient-name">👤 {app.patientName}</p>
                    <p className="phone">📞 {app.phone}</p>
                    <p className="location">📍 {app.location}</p>
                    <hr />
                    <p className="notes"><strong>หมายเหตุ:</strong> {app.notes}</p>
                </div>
                <div className="card-center">
                    <p><strong>บริการ:</strong> {app.service}</p>
                    <p><strong>แพทย์:</strong> {app.doctor}</p>
                    <p><strong>ระยะเวลา:</strong> {app.duration}</p>
                    <p><strong>ราคา:</strong> {app.price}</p>
                </div>
                <div className="card-right">
                    <span className={`status-badge status-${app.status === 'รอตรวจ' ? 'waiting' : 'checked-in'}`}>
                        {app.status}
                    </span>
                    <div className="action-buttons">
                        <button className="btn-details">ดูละเอียด</button>
                        <button className="btn-edit">แก้ไข</button>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export default TodayView;
