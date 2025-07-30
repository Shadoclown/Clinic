import React, { useState } from 'react';
import '../style/Appointment/Weekly.css';
import { getMonthlyAppointments } from '../../utils/patientData';

const WeeklyView = () => {
    const days = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
    const [selectedDate, setSelectedDate] = useState(new Date());
    const today = new Date();
    const currentDayIndex = today.getDay();
    
    // Get all appointments data
    const allAppointments = getMonthlyAppointments();

    // Generate week dates dynamically
    const getWeekDates = () => {
        const weekStart = new Date(selectedDate);
        weekStart.setDate(selectedDate.getDate() - selectedDate.getDay());
        
        return Array.from({ length: 7 }).map((_, i) => {
            const date = new Date(weekStart);
            date.setDate(weekStart.getDate() + i);
            return date;
        });
    };

    const weekDates = getWeekDates();
    
    // Format date range for header
    const formatDateRange = () => {
        const start = weekDates[0];
        const end = weekDates[6];
        const startFormatted = `${start.getDate()}/${start.getMonth() + 1}/${start.getFullYear() + 543}`;
        const endFormatted = `${end.getDate()}/${end.getMonth() + 1}/${end.getFullYear() + 543}`;
        return `${startFormatted} - ${endFormatted}`;
    };

    const handleDayClick = (date) => {
        setSelectedDate(date);
    };

    const isToday = (date) => {
        return date.toDateString() === today.toDateString();
    };

    const isSelected = (date) => {
        return date.toDateString() === selectedDate.toDateString();
    };

    // Get appointments for selected date
    const getAppointmentsForSelectedDate = () => {
        return allAppointments.filter(appointment => 
            appointment.date.toDateString() === selectedDate.toDateString()
        );
    };

    // Get count of appointments for a specific date
    const getAppointmentCountForDate = (date) => {
        return allAppointments.filter(appointment => 
            appointment.date.toDateString() === date.toDateString()
        ).length;
    };

    // Selected day's appointments
    const selectedDayAppointments = getAppointmentsForSelectedDate();

    // Format date for display
    const formatSelectedDate = () => {
        return `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear() + 543}`;
    };

    return (
        <div className="week-view">
            <div className="view-header">
                <h3>ตารางนัดรายสัปดาห์</h3>
                <span>{formatDateRange()}</span>
            </div>
            <div className="week-grid">
                {days.map((day, index) => {
                    const date = weekDates[index];
                    const appointmentCount = getAppointmentCountForDate(date);
                    return (
                        <div 
                            key={day} 
                            className={`day-card ${isSelected(date) ? 'active-day' : ''} ${isToday(date) ? 'today' : ''}`}
                            onClick={() => handleDayClick(date)}
                            tabIndex={0}
                            role="button"
                            aria-label={`Select ${day} ${date.getDate()}`}
                        >
                            <p>{day}</p>
                            <p className="date-number">{date.getDate()}</p>
                            <p className={appointmentCount > 0 ? 'has-appointments' : 'no-appointments'}>
                                {appointmentCount > 0 ? `${appointmentCount} นัดหมาย` : 'ไม่มีนัดหมาย'}
                            </p>
                        </div>
                    );
                })}
            </div>

            {/* Daily appointments table for selected day */}
            <div className="daily-appointments-table">
                <h3>นัดหมายวันที่ {formatSelectedDate()}</h3>
                <div className="table-wrapper">
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
                            {selectedDayAppointments.length === 0 ? (
                                <tr>
                                    <td colSpan="8" style={{textAlign: 'center', padding: '20px'}}>
                                        ไม่พบข้อมูลนัดหมาย
                                    </td>
                                </tr>
                            ) : (
                                selectedDayAppointments.map((appointment, index) => (
                                    <tr key={index}>
                                        <td className="appointment-time-cell">
                                            <div className="appointment-time">
                                                <span className="time">{appointment.time}</span>
                                            </div>
                                        </td>
                                        <td>{appointment.patientName}</td>
                                        <td>{appointment.phone}</td>
                                        <td>{appointment.service}</td>
                                        <td>{appointment.notes || '-'}</td>
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
    );
};

export default WeeklyView;
