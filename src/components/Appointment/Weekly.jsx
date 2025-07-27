import React from 'react';
import '../style/Appointment/weekly.css';

const WeeklyView = () => {
    const days = ['อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
    const today = new Date();
    const currentDayIndex = today.getDay();

    // Simple date generation for the week
    const weekDates = Array.from({ length: 7 }).map((_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - currentDayIndex + i);
        return date.getDate();
    });

    return (
        <div className="week-view">
            <div className="view-header">
                <h3>ตารางนัดรายสัปดาห์</h3>
                <span>27/7/2568 - 2/8/2568</span>
            </div>
            <div className="week-grid">
                {days.map((day, index) => (
                    <div key={day} className={`day-card ${index === currentDayIndex ? 'active-day' : ''}`}>
                        <p>{day}</p>
                        <p className="date-number">{weekDates[index]}</p>
                        <p className="no-appointments">ไม่มีนัดหมาย</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeeklyView;
