import React, { useState } from 'react';
import '../style/Appointment/Monthly.css';
import '../style/Records.css'; // Import Records CSS for table styling
import { getMonthlyAppointments } from '../../utils/patientData';

// Get monthly appointments from our utility
const monthlyAppointments = getMonthlyAppointments();

const MonthlyView = () => {
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const monthNames = [
        'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
        'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
    ];

    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const today = new Date();

    // Generate calendar days for current month
    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        
        // First day of the month
        const firstDay = new Date(year, month, 1);
        // Last day of the month
        const lastDay = new Date(year, month + 1, 0);
        // First day of the week for the first day of month
        const startDay = firstDay.getDay();
        // Number of days in month
        const daysInMonth = lastDay.getDate();
        
        const calendarDays = [];
        
        // Add previous month's trailing days
        const prevMonth = new Date(year, month - 1, 0);
        for (let i = startDay - 1; i >= 0; i--) {
            const day = prevMonth.getDate() - i;
            calendarDays.push({
                date: new Date(year, month - 1, day),
                isOtherMonth: true
            });
        }
        
        // Add current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            calendarDays.push({
                date: new Date(year, month, day),
                isOtherMonth: false
            });
        }
        
        // Add next month's leading days to complete the grid
        const remainingDays = 42 - calendarDays.length; // 6 weeks * 7 days
        for (let day = 1; day <= remainingDays; day++) {
            calendarDays.push({
                date: new Date(year, month + 1, day),
                isOtherMonth: true
            });
        }
        
        return calendarDays;
    };

    const calendarDays = generateCalendarDays();

    const navigateMonth = (direction) => {
        setCurrentDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setMonth(prevDate.getMonth() + direction);
            return newDate;
        });
    };

    const handleDayClick = (date) => {
        setSelectedDate(date);
        // If clicking on other month day, navigate to that month
        if (date.getMonth() !== currentDate.getMonth()) {
            setCurrentDate(new Date(date));
        }
    };

    const isToday = (date) => {
        return date.toDateString() === today.toDateString();
    };

    const isSelected = (date) => {
        return date.toDateString() === selectedDate.toDateString();
    };

    const formatSelectedDate = () => {
        return `${selectedDate.getDate()}/${selectedDate.getMonth() + 1}/${selectedDate.getFullYear() + 543}`;
    };

    // Filter appointments for current month
    const getMonthlyAppointments = () => {
        return monthlyAppointments.filter(appointment => {
            return appointment.date.getMonth() === currentDate.getMonth() &&
                   appointment.date.getFullYear() === currentDate.getFullYear();
        });
    };

    // Check if a date has appointments - updated to use our data
    const hasAppointments = (date) => {
        return monthlyAppointments.some(apt => 
            apt.date.toDateString() === date.toDateString()
        );
    };

    const currentMonthAppointments = getMonthlyAppointments().filter(appointment => {
        return appointment.date.getMonth() === currentDate.getMonth() &&
               appointment.date.getFullYear() === currentDate.getFullYear();
    });

    return (
        <div className="month-view">
            <div className="view-header month-header">
                <h3>ตารางนัดรายเดือน</h3>
                <div className="month-navigation">
                    <button onClick={() => navigateMonth(-1)} aria-label="Previous month">{'<'}</button>
                    <span>{monthNames[currentDate.getMonth()]} {currentDate.getFullYear() + 543}</span>
                    <button onClick={() => navigateMonth(1)} aria-label="Next month">{'>'}</button>
                </div>
            </div>
            <div className="calendar-container">
                <div className="calendar">
                    <div className="calendar-header">
                        {daysOfWeek.map(day => <div key={day}>{day}</div>)}
                    </div>
                    <div className="calendar-body">
                        {calendarDays.map((dayObj, index) => (
                            <div 
                                key={index} 
                                className={`calendar-day 
                                    ${dayObj.isOtherMonth ? 'other-month' : ''} 
                                    ${isSelected(dayObj.date) ? 'active-day' : ''} 
                                    ${isToday(dayObj.date) ? 'today' : ''}
                                    ${hasAppointments(dayObj.date) ? 'has-appointments' : ''}
                                `}
                                onClick={() => handleDayClick(dayObj.date)}
                                tabIndex={0}
                                role="button"
                                aria-label={`Select ${dayObj.date.getDate()}`}
                            >
                                {dayObj.date.getDate()}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="daily-appointments">
                    <h4>นัดหมายวันที่ {formatSelectedDate()}</h4>
                    <p>ไม่มีนัดหมายในวันนี้</p>
                </div>
            </div>

            {/* Monthly Appointments Overview - Table Layout */}
            <div className="monthly-overview">
                <h3>ภาพรวมนัดหมายประจำเดือน ({currentMonthAppointments.length} รายการ)</h3>
                <div className="table-wrapper">
                    <table className="thai-clinic-table">
                        <thead>
                            <tr>
                                <th>วันที่</th>
                                <th>เวลา</th>
                                <th>ชื่อผู้ป่วย</th>
                                <th>บริการ</th>
                                <th>ประเภท</th>
                                <th>จำนวนครั้ง</th>
                                <th>การดำเนินการ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentMonthAppointments.map(appointment => (
                                <tr key={appointment.id}>
                                    <td>{appointment.date.getDate()}/{appointment.date.getMonth() + 1}/{appointment.date.getFullYear() + 543}</td>
                                    <td>{appointment.time}</td>
                                    <td>{appointment.patientName}</td>
                                    <td>{appointment.service}</td>
                                    <td>{appointment.course[0]}</td>
                                    <td>{appointment.course[1]}/{appointment.course[2]}</td>
                                    <td className="table-actions">
                                        <button className="action-btn view-btn">ดูรายละเอียด</button>
                                        <button className="action-btn edit-btn">แก้ไข</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MonthlyView;
