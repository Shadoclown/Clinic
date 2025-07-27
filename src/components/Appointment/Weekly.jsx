import React, { useState } from 'react';
import '../style/Appointment/weekly.css';

const WeeklyView = () => {
    const days = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
    const [selectedDate, setSelectedDate] = useState(new Date());
    const today = new Date();
    const currentDayIndex = today.getDay();

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

    return (
        <div className="week-view">
            <div className="view-header">
                <h3>ตารางนัดรายสัปดาห์</h3>
                <span>{formatDateRange()}</span>
            </div>
            <div className="week-grid">
                {days.map((day, index) => {
                    const date = weekDates[index];
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
                            <p className="no-appointments">ไม่มีนัดหมาย</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default WeeklyView;
