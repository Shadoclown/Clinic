import React, { useState } from 'react';
import '../style/Appointment/Today.css';
import PatientDetailExpanded from '../PatientDetailExpanded';

// Component for the header section
const TodayViewHeader = ({ count }) => (
    <div className="today-header">
        <h3>รายการนัดหมายวันนี้</h3>
        <span>{count} รายการ</span>
    </div>
);

// Component for a single row in the appointments table
const AppointmentRow = ({ appointment }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <tr>
                <td className="appointment-time-cell">
                    <div className="appointment-time">
                        <span className="time">{appointment.time}</span>
                    </div>
                </td>
                <td>{appointment.patientName}</td>
                <td>{appointment.phone}</td>
                <td>{appointment.service}</td>
                <td>{appointment.notes}</td>
                <td>{appointment.course[0]}</td>
                <td>{`${appointment.course[1]}/${appointment.course[2]}`}</td>
                <td className="table-actions">
                    <button 
                        className="action-btn view-btn"
                        onClick={() => setExpanded(!expanded)}
                    >
                        {expanded ? 'ซ่อนข้อมูล' : 'ดูรายละเอียด'}
                    </button>
                    <button className="action-btn edit-btn">แก้ไข</button>
                </td>
            </tr>
            {expanded && (
                <tr className="patient-detail-row">
                    <td colSpan="8">
                        <PatientDetailExpanded patient={appointment} />
                    </td>
                </tr>
            )}
        </>
    );
};

// Component for the "no data" placeholder row
const NoAppointmentsRow = () => (
    <tr>
        <td colSpan="8" className="no-appointments-cell">
            ไม่พบข้อมูลนัดหมาย
        </td>
    </tr>
);

// Component for the entire table
const AppointmentsTable = ({ appointments }) => (
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
            {appointments.length > 0
                ? appointments.map(app => <AppointmentRow key={app.id} appointment={app} />)
                : <NoAppointmentsRow />
            }
        </tbody>
    </table>
);

// Main TodayView component
const TodayView = ({ appointments = [] }) => (
    <div className="today-view">
        <TodayViewHeader count={appointments.length} />
        <AppointmentsTable appointments={appointments} />
    </div>
);

export default TodayView;