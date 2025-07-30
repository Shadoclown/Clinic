import React from 'react';
import '../style/Appointment/Today.css';

// Default empty appointments array
const TodayView = ({ appointments = [] }) => (
    <div className="today-view">
        <div className="today-header">
            <h3>รายการนัดหมายวันนี้</h3>
            <span>{appointments.length} รายการ</span>
        </div>
        
        <table className="thai-clinic-table">
            <thead>
                <tr>
                    <th>เวลา</th>
                    <th>ชื่อผู้ป่วย</th>
                    <th>โทรศัพท์</th>
                    <th>บริการ</th>
                    <th>หมายเหตุ</th>
                    <th>คอร์ส</th>
                    <th>จำนวนครั้ง</th>
                    <th>การดำเนินการ</th>
                </tr>
            </thead>
            <tbody>
                {appointments.map(app => (
                    <tr key={app.id}>
                        <td className="appointment-time-cell">
                            <div className="appointment-time">
                                <span className="time">{app.time}</span>
                            </div>
                        </td>
                        <td>{app.patientName}</td>
                        <td>{app.phone}</td>
                        <td>{app.service}</td>
                        <td>{app.notes}</td>
                        <td>{app.course[0]}</td>
                        <td>{app.course[1]}/{app.course[2]}</td>
                        <td className="table-actions">
                            <button className="action-btn view-btn">ดูรายละเอียด</button>
                            <button className="action-btn edit-btn">แก้ไข</button>
                        </td>
                    </tr>
                ))}
                {appointments.length === 0 && (
                    <tr>
                        <td colSpan="8" style={{textAlign: 'center', padding: '20px'}}>
                            ไม่พบข้อมูลนัดหมาย
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
);

export default TodayView;

