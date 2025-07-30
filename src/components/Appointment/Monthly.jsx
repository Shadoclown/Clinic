import React, { useState, useMemo } from 'react';
import '../style/Appointment/Monthly.css';
import '../style/Records.css'; // For shared table styles
import { getMonthlyAppointments } from '../../utils/patientData';

// --- Helper Constants & Functions ---
const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
const MONTH_NAMES = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const toThaiYear = (date) => date.getFullYear() + 543;
const formatDateKey = (date) => date.toDateString();

// --- Sub-Components ---

const CalendarHeader = ({ currentDate, onNavigate }) => (
    <div className="view-header month-header">
        <h3>ตารางนัดรายเดือน</h3>
        <div className="month-navigation">
            <button onClick={() => onNavigate(-1)} aria-label="Previous month">{'<'}</button>
            <span>{`${MONTH_NAMES[currentDate.getMonth()]} ${toThaiYear(currentDate)}`}</span>
            <button onClick={() => onNavigate(1)} aria-label="Next month">{'>'}</button>
        </div>
    </div>
);

const CalendarGrid = ({ days, selectedDate, today, appointmentsByDate, onDayClick }) => (
    <div className="calendar">
        <div className="calendar-header">
            {DAYS_OF_WEEK.map(day => <div key={day}>{day}</div>)}
        </div>
        <div className="calendar-body">
            {days.map(({ date, isOtherMonth }, index) => {
                const isSelected = formatDateKey(date) === formatDateKey(selectedDate);
                const isToday = formatDateKey(date) === formatDateKey(today);
                const hasAppointments = appointmentsByDate.has(formatDateKey(date));

                const classNames = [
                    'calendar-day',
                    isOtherMonth ? 'other-month' : '',
                    isSelected ? 'active-day' : '',
                    isToday ? 'today' : '',
                    hasAppointments ? 'has-appointments' : ''
                ].filter(Boolean).join(' ');

                return (
                    <div
                        key={index}
                        className={classNames}
                        onClick={() => onDayClick(date)}
                        tabIndex={0}
                        role="button"
                        aria-label={`Select ${date.getDate()}`}
                    >
                        {date.getDate()}
                    </div>
                );
            })}
        </div>
    </div>
);

const DailyAppointments = ({ date, appointments }) => {
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${toThaiYear(date)}`;
    return (
        <div className="daily-appointments">
            <h4>นัดหมายวันที่ {formattedDate}</h4>
            {appointments.length === 0 ? (
                <p>ไม่มีนัดหมายในวันนี้</p>
            ) : (
                <ul>
                    {/* Placeholder for daily appointment list */}
                </ul>
            )}
        </div>
    );
};

const MonthlyOverviewTable = ({ appointments }) => (
    <div className="monthly-overview">
        <h3>ภาพรวมนัดหมายประจำเดือน ({appointments.length} รายการ)</h3>
        <div className="table-wrapper">
            <table className="thai-clinic-table">
                <thead>
                    <tr>
                        <th>วันที่</th>
                        <th>เวลา</th>
                        <th>ชื่อผู้ป่วย</th>
                        <th>บริการ</th>
                        <th>คอร์ส</th>
                        <th>จำนวนครั้ง</th>
                        <th>การดำเนินการ</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length > 0 ? appointments.map(appt => (
                        <tr key={appt.id}>
                            <td>{`${appt.date.getDate()}/${appt.date.getMonth() + 1}/${toThaiYear(appt.date)}`}</td>
                            <td>{appt.time}</td>
                            <td>{appt.patientName}</td>
                            <td>{appt.service}</td>
                            <td>{appt.course[0]}</td>
                            <td>{`${appt.course[1]}/${appt.course[2]}`}</td>
                            <td className="table-actions">
                                <button className="action-btn view-btn">ดูรายละเอียด</button>
                                <button className="action-btn edit-btn">แก้ไข</button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan="7" style={{ textAlign: 'center' }}>ไม่มีนัดหมายในเดือนนี้</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);


// --- Main MonthlyView Component ---

const MonthlyView = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const today = useMemo(() => new Date(), []);
    
    // Memoize the raw appointment data to prevent re-fetching
    const allAppointments = useMemo(() => getMonthlyAppointments(), []);

    const navigateMonth = (direction) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev.getFullYear(), prev.getMonth() + direction, 1);
            return newDate;
        });
    };

    const handleDayClick = (date) => {
        setSelectedDate(date);
        if (date.getMonth() !== currentDate.getMonth()) {
            setCurrentDate(new Date(date.getFullYear(), date.getMonth(), 1));
        }
    };

    // Memoize the calendar grid days to avoid recalculating on every render
    const calendarDays = useMemo(() => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const days = [];
        // Add previous month's days
        for (let i = firstDayOfMonth; i > 0; i--) {
            days.push({ date: new Date(year, month, 1 - i), isOtherMonth: true });
        }
        // Add current month's days
        for (let i = 1; i <= daysInMonth; i++) {
            days.push({ date: new Date(year, month, i), isOtherMonth: false });
        }
        // Add next month's days to fill the grid
        while (days.length % 7 !== 0) {
            days.push({ date: new Date(year, month, daysInMonth + (days.length - daysInMonth) + 1), isOtherMonth: true });
        }
        return days;
    }, [currentDate]);

    // Memoize filtered appointments for the current month and a map for quick lookups
    const { currentMonthAppointments, appointmentsByDate } = useMemo(() => {
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();
        
        const filtered = allAppointments.filter(appt => 
            appt.date.getMonth() === currentMonth && appt.date.getFullYear() === currentYear
        );
        
        const dateMap = new Map();
        allAppointments.forEach(appt => {
            dateMap.set(formatDateKey(appt.date), true);
        });

        return { currentMonthAppointments: filtered, appointmentsByDate: dateMap };
    }, [currentDate, allAppointments]);

    const appointmentsForSelectedDay = useMemo(() => {
        return allAppointments.filter(appt => formatDateKey(appt.date) === formatDateKey(selectedDate));
    }, [selectedDate, allAppointments]);

    return (
        <div className="month-view">
            <CalendarHeader currentDate={currentDate} onNavigate={navigateMonth} />
            
            <div className="calendar-container">
                <CalendarGrid 
                    days={calendarDays}
                    selectedDate={selectedDate}
                    today={today}
                    appointmentsByDate={appointmentsByDate}
                    onDayClick={handleDayClick}
                />
                <DailyAppointments date={selectedDate} appointments={appointmentsForSelectedDay} />
            </div>

            <MonthlyOverviewTable appointments={currentMonthAppointments} />
        </div>
    );
};

export default MonthlyView;