import React, { useState, useMemo } from 'react';
import '../style/Appointment/Weekly.css';
import { getMonthlyAppointments } from '../../utils/patientData';

// --- Helper Constants & Functions ---
const DAYS_OF_WEEK = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
const formatDateKey = (date) => date.toDateString();
const toThaiYear = (date) => date.getFullYear() + 543;

// --- Sub-Components ---

const WeeklyViewHeader = ({ dateRange }) => (
    <div className="view-header">
        <h3>ตารางนัดรายสัปดาห์</h3>
        <span>{dateRange}</span>
    </div>
);

const DayCard = ({ day, date, count, isSelected, isToday, onClick }) => (
    <div
        className={`day-card ${isSelected ? 'active-day' : ''} ${isToday ? 'today' : ''}`}
        onClick={() => onClick(date)}
        tabIndex={0}
        role="button"
        aria-label={`Select ${day} ${date.getDate()}`}
    >
        <p>{day}</p>
        <p className="date-number">{date.getDate()}</p>
        <p className={count > 0 ? 'has-appointments' : 'no-appointments'}>
            {count > 0 ? `${count} นัดหมาย` : 'ไม่มีนัดหมาย'}
        </p>
    </div>
);

const AppointmentsForDayTable = ({ appointments, selectedDate }) => {
    const formattedDate = `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${toThaiYear(selectedDate)}`;

    return (
        <div className="daily-appointments-table">
            <h3>นัดหมายวันที่ {formattedDate}</h3>
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
                        {appointments.length === 0 ? (
                            <tr>
                                <td colSpan="8" className="no-data-cell">ไม่พบข้อมูลนัดหมาย</td>
                            </tr>
                        ) : (
                            appointments.map((appt, index) => (
                                <tr key={index}>
                                    <td className="appointment-time-cell">
                                        <div className="appointment-time"><span className="time">{appt.time}</span></div>
                                    </td>
                                    <td>{appt.patientName}</td>
                                    <td>{appt.phone}</td>
                                    <td>{appt.service}</td>
                                    <td>{appt.notes || '-'}</td>
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
        </div>
    );
};

// --- Main WeeklyView Component ---

const WeeklyView = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const today = useMemo(() => new Date(), []);

    // Memoize the grouping of appointments by date for performance
    const appointmentsByDate = useMemo(() => {
        const appointments = getMonthlyAppointments();
        const grouped = new Map();
        appointments.forEach(appt => {
            const key = formatDateKey(appt.date);
            if (!grouped.has(key)) {
                grouped.set(key, []);
            }
            grouped.get(key).push(appt);
        });
        return grouped;
    }, []);

    // Memoize the calculation of week dates
    const weekDates = useMemo(() => {
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
        return Array.from({ length: 7 }).map((_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            return date;
        });
    }, [selectedDate]);

    const formattedDateRange = useMemo(() => {
        const start = weekDates[0];
        const end = weekDates[6];
        return `${start.getDate()}/${start.getMonth() + 1}/${toThaiYear(start)} - ${end.getDate()}/${end.getMonth() + 1}/${toThaiYear(end)}`;
    }, [weekDates]);
    
    const selectedDayAppointments = appointmentsByDate.get(formatDateKey(selectedDate)) || [];

    return (
        <div className="week-view">
            <WeeklyViewHeader dateRange={formattedDateRange} />
            
            <div className="week-grid">
                {weekDates.map((date, index) => (
                    <DayCard
                        key={index}
                        day={DAYS_OF_WEEK[index]}
                        date={date}
                        count={(appointmentsByDate.get(formatDateKey(date)) || []).length}
                        isSelected={formatDateKey(date) === formatDateKey(selectedDate)}
                        isToday={formatDateKey(date) === formatDateKey(today)}
                        onClick={setSelectedDate}
                    />
                ))}
            </div>

            <AppointmentsForDayTable
                appointments={selectedDayAppointments}
                selectedDate={selectedDate}
            />
        </div>
    );
};

export default WeeklyView;