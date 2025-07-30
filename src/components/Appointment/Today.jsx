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
                    <th>สถานะ</th>
                    <th>การดำเนินการ</th>
                    <th>ยกเลิก</th>
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
                        <td>
                            <span className={`status-pill status-${app.status === 'รอตรวจ' ? 'รอตรวจ' : 'เข้าตรวจแล้ว'}`}>
                                {app.status}
                            </span>
                        </td>
                        <td className="table-actions">
                            <button className="action-btn view-btn">ดูรายละเอียด</button>
                            <button className="action-btn edit-btn">แก้ไข</button>
                        </td>
                        <td className='cancel-action'>
                            <button className="action-btn cancel-btn">ยกเลิก</button>
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
