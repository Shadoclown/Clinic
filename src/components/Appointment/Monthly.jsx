import React from 'react';
import '../style/Appointment/monthly.css';

const MonthlyView = () => {
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const daysInMonth = [
        29, 30, 1, 2, 3, 4, 5,
        6, 7, 8, 9, 10, 11, 12,
        13, 14, 15, 16, 17, 18, 19,
        20, 21, 22, 23, 24, 25, 26,
        27, 28, 29, 30, 31, 1, 2
    ];
    const today = 27;

    return (
        <div className="month-view">
            <div className="view-header month-header">
                <h3>ตารางนัดรายเดือน</h3>
                <div className="month-navigation">
                    <button>{'<'}</button>
                    <span>กรกฎาคม 2568</span>
                    <button>{'>'}</button>
                </div>
            </div>
            <div className="calendar-container">
                <div className="calendar">
                    <div className="calendar-header">
                        {daysOfWeek.map(day => <div key={day}>{day}</div>)}
                    </div>
                    <div className="calendar-body">
                        {daysInMonth.map((day, index) => (
                            <div key={index} className={`calendar-day ${day === today ? 'active-day' : ''} ${index < 2 || index > 32 ? 'other-month' : ''}`}>
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="daily-appointments">
                    <h4>นัดหมายวันที่ 27/7/2568</h4>
                    <p>ไม่มีนัดหมายในวันนี้</p>
                </div>
            </div>
        </div>
    );
};

export default MonthlyView;
