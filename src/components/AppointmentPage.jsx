import React, { useState, useEffect } from 'react';
// No need to import CSS here as App.css handles it via @import

// Helper function to get Thai month name
const getMonthNameThai = (date) => {
    return new Intl.DateTimeFormat('th-TH', { month: 'long' }).format(date);
};

// Helper function to get Thai Buddhist year
const getThaiYear = (date) => {
    return date.getFullYear() + 543; // Buddhist year is 543 years ahead of Gregorian
};

// Helper function to format a Date object to 'YYYY-MM-DD' string
const formatDateKey = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

// --- Consolidated Mock Appointments Data ---
// Keyed by 'YYYY-MM-DD' string
const mockAllAppointments = {
    '2025-08-31': [
        { time: '09:00', name: 'นายสมชาย ใจดี', service: 'ฝังเข็ม', phone: '081-234-5678', status: 'เสร็จสิ้น', id: 'a1' },
        { time: '09:30', name: 'นางสมหญิง รักษ์ดี', service: 'กัวซา', phone: '082-345-6789', status: 'กำลังรักษา', id: 'a2' },
        { time: '10:00', name: 'นายวิชัย เก่งมาก', service: 'ครอบแก้ว', phone: '083-456-7890', status: 'รอ', id: 'a3' },
        { time: '11:00', name: 'นางสาวมณี สวยงาม', service: 'ฝังเข็ม + กัวซา', phone: '084-567-8901', status: 'กำลังรักษา', id: 'a4' },
        { time: '14:00', name: 'นายประยุทธ์ แข็งแรง', service: 'นวดแผนไทย', phone: '085-678-9012', status: 'รอ', id: 'a5' },
        { time: '14:00', name: 'นางสาวมาลี รักษาดี', service: 'กัวซา', phone: '086-789-0123', status: 'รอ', id: 'a6' },
    ],
    '2025-09-01': [
        { time: '10:00', name: 'นางสาววิภาวดี พรชัย', service: 'ฝังเข็ม', phone: '087-654-3210', status: 'รอ', id: 'a7' },
        { time: '11:00', name: 'นายวรพจน์ จิตดี', service: 'นวดแผนไทย', phone: '088-765-4321', status: 'รอ', id: 'a8' },
    ],
    '2025-09-02': [
        { time: '09:00', name: 'นายธนาชัย ดีพร้อม', service: 'ครอบแก้ว', phone: '089-876-5432', status: 'เสร็จสิ้น', id: 'a9' },
        { time: '15:00', name: 'นางสาวกานดา มีสุข', service: 'นวดแผนไทย', phone: '090-987-6543', status: 'รอ', id: 'a10' },
    ],
    '2025-09-04': [
        { time: '11:00', name: 'นางสุดาพร สงบสุข', service: 'ฝังเข็ม', phone: '091-234-5678', status: 'รอ', id: 'a11' },
    ],
    '2025-09-06': [
        { time: '13:00', name: 'นายชูศักดิ์ มั่นคง', service: 'นวดแผนไทย', phone: '092-345-6789', status: 'เสร็จสิ้น', id: 'a12' },
    ],
    '2025-07-20': [
        { time: '09:00', name: 'นางสาวรัชนี ดวงดี', service: 'นวดแผนไทย', status: 'เสร็จสิ้น', id: 'a13' },
    ],
    '2025-06-12': [
        { time: '14:00', name: 'นายสมบัติ ใจเย็น', service: 'ครอบแก้ว', status: 'เสร็จสิ้น', id: 'a14' },
        { time: '15:00', name: 'นางสาวเดือนเพ็ญ สบายดี', service: 'ฝังเข็ม', status: 'รอ', id: 'a15' },
    ],
    // Add more mock data for different dates, months, and years as needed for testing
    '2025-10-10': [
        { time: '10:00', name: 'นายอดุลย์ จิตรใจ', service: 'ปรึกษาทั่วไป', status: 'รอ', id: 'oct1' },
    ],
    '2024-12-25': [
        { time: '10:00', name: 'นางสาวรุ่งนภา แจ่มใส', service: 'นวดแผนไทย', status: 'เสร็จสิ้น', id: 'dec1' },
        { time: '11:00', name: 'นายวันชัย โชคดี', service: 'ฝังเข็ม', status: 'กำลังรักษา', id: 'dec2' },
    ],
};


// --- Daily View Component ---
function DailyView() {
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date()); // Start with today

  const handlePrevDay = () => {
    setCurrentDisplayDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setCurrentDisplayDate(prevDate => {
      const newDate = new Date(prevDate);
      newDate.setDate(prevDate.getDate() + 1);
      return newDate;
    });
  };

  const formattedDate = new Intl.DateTimeFormat('th-TH', {
    weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
  }).format(currentDisplayDate);

  const appointmentsForDay = mockAllAppointments[formatDateKey(currentDisplayDate)] || [];

  return (
    <div className="daily-view">
      <div className="schedule-navigation">
        <span className="nav-arrow" onClick={handlePrevDay}>{"<"}</span>
        <span className="current-period">{formattedDate}</span>
        <span className="nav-arrow" onClick={handleNextDay}>{">"}</span>
      </div>
      <h3 className="sub-header">{formattedDate}</h3>
      <div className="daily-appointments-list">
        {appointmentsForDay.length > 0 ? (
          appointmentsForDay.sort((a,b) => a.time.localeCompare(b.time)).map((appt) => (
            <div key={appt.id} className="daily-appointment-item">
              <div className="appt-time">{appt.time}</div>
              <div className="appt-details">
                <div className="appt-patient">{appt.name}</div>
                <div className="appt-service">{appt.service}</div>
              </div>
              <div className="appt-contact">
                <span className="phone-icon">📞</span> {appt.phone}
                <span className={`status-badge ${appt.status === 'เสร็จสิ้น' ? 'status-done' : appt.status === 'กำลังรักษา' ? 'status-in-progress' : 'status-pending'}`}>
                  {appt.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-appointments-message">ไม่มีนัดหมายสำหรับวันนี้</p>
        )}
      </div>
    </div>
  );
}


// --- Weekly View Component ---
function WeeklyView() {
    // State to hold the first day of the week being displayed (e.g., Sunday)
    const [currentWeekStart, setCurrentWeekStart] = useState(() => {
        const today = new Date();
        const dayOfWeek = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
        const startOfWeek = new Date(today);
        startOfWeek.setDate(today.getDate() - dayOfWeek); // Set to Sunday of the current week
        startOfWeek.setHours(0, 0, 0, 0); // Normalize time
        return startOfWeek;
    });

    const daysOfWeekNames = ['อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
    const times = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']; // Extended times for more slots

    const getWeekDays = () => {
        const weekDays = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(currentWeekStart);
            date.setDate(currentWeekStart.getDate() + i);
            weekDays.push(date);
        }
        return weekDays;
    };

    const weekDays = getWeekDays();

    const handlePrevWeek = () => {
        setCurrentWeekStart(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() - 7);
            return newDate;
        });
    };

    const handleNextWeek = () => {
        setCurrentWeekStart(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(prevDate.getDate() + 7);
            return newDate;
        });
    };

    const formatShortDate = (date) => `${date.getDate()}/${date.getMonth() + 1}`;
    const weekRangeStart = formatShortDate(weekDays[0]);
    const weekRangeEnd = formatShortDate(weekDays[6]);
    const weekRangeYear = getThaiYear(weekDays[0]);

    return (
        <div className="weekly-view">
            <div className="schedule-navigation">
                <span className="nav-arrow" onClick={handlePrevWeek}>{"<"}</span>
                <span className="current-period">{weekRangeStart} - {weekRangeEnd}/{weekRangeYear}</span>
                <span className="nav-arrow" onClick={handleNextWeek}>{">"}</span>
            </div>
            <table className="weekly-schedule-table">
                <thead>
                    <tr>
                        <th>เวลา</th>
                        {weekDays.map((date, index) => (
                            <th key={date.toISOString()}>
                                {daysOfWeekNames[index]}<br/>{formatShortDate(date)}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {times.map(time => (
                        <tr key={time}>
                            <td>{time}</td>
                            {weekDays.map(date => {
                                const dayKey = formatDateKey(date);
                                const appointmentsForSlot = mockAllAppointments[dayKey]?.filter(
                                    appt => appt.time === time
                                );
                                return (
                                    <td key={`${time}-${dayKey}`}>
                                        {appointmentsForSlot && appointmentsForSlot.length > 0 ? (
                                            appointmentsForSlot.sort((a,b) => a.time.localeCompare(b.time)).map((appt, idx) => (
                                                <div key={appt.id} className={`weekly-appt-cell ${idx < appointmentsForSlot.length - 1 ? 'has-margin-bottom' : ''}`}>
                                                    {appt.name}
                                                    <div className="weekly-appt-service">{appt.service}</div>
                                                    <span className={`weekly-appt-status ${appt.status === 'เสร็จสิ้น' ? 'status-done' : appt.status === 'กำลังรักษา' ? 'status-in-progress' : 'status-pending'}`}>
                                                        {appt.status}
                                                    </span>
                                                </div>
                                            ))
                                        ) : (
                                            <span className="no-appt-indicator">-</span>
                                        )}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}


// --- Monthly View Component ---
function MonthlyView() {
  const [currentDisplayDate, setCurrentDisplayDate] = useState(new Date()); // Represents the month/year currently shown
  const [selectedDateDayNum, setSelectedDateDayNum] = useState(null); // Stores the clicked day number (1-31)
  const [selectedDateAppointments, setSelectedDateAppointments] = useState([]); // Stores appointments for the selected date

  const daysOfWeek = ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'];

  // Calculate calendar properties based on currentDisplayDate
  const year = currentDisplayDate.getFullYear();
  const month = currentDisplayDate.getMonth(); // 0-indexed
  const thaiMonthName = getMonthNameThai(currentDisplayDate);
  const thaiYear = getThaiYear(currentDisplayDate);

  // Get number of days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Get the day of the week for the first day of the month (0 = Sunday, 6 = Saturday)
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // Correctly identifies the day of the week for the 1st

  // Generate an array of day numbers for the calendar grid
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    setCurrentDisplayDate(prevDate => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1);
      setSelectedDateDayNum(null); // Clear selected date when changing month
      setSelectedDateAppointments([]);
      return newDate;
    });
  };

  const handleNextMonth = () => {
    setCurrentDisplayDate(prevDate => {
      const newDate = new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1);
      setSelectedDateDayNum(null); // Clear selected date when changing month
      setSelectedDateAppointments([]);
      return newDate;
    });
  };

  const handleDayClick = (dayNum) => {
    // Format the date to match mock data key 'YYYY-MM-DD'
    const dateObj = new Date(year, month, dayNum);
    const fullDateKey = formatDateKey(dateObj);

    setSelectedDateDayNum(dayNum);
    const appointments = mockAllAppointments[fullDateKey] || [];
    setSelectedDateAppointments(appointments.sort((a, b) => a.time.localeCompare(b.time))); // Sort by time
  };

  // Effect to clear selected date details if the month changes externally (e.g., from tab switch)
  useEffect(() => {
    setSelectedDateDayNum(null);
    setSelectedDateAppointments([]);
  }, [currentDisplayDate]); // When currentDisplayDate changes, clear details

  // Get today's date for highlighting
  const today = new Date();
  const isTodayDisplayedMonth = today.getMonth() === month && today.getFullYear() === year;

  return (
    <div className="monthly-view">
      <div className="schedule-navigation">
        <span className="nav-arrow" onClick={handlePrevMonth}>{"<"}</span>
        <span className="current-period">{thaiMonthName} {thaiYear}</span>
        <span className="nav-arrow" onClick={handleNextMonth}>{">"}</span>
      </div>
      <h3 className="sub-header">{thaiMonthName} {thaiYear}</h3>
      <div className="calendar-grid">
        {daysOfWeek.map(day => <div key={day} className="calendar-day-header">{day}</div>)}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-start-${i}`} className="calendar-day empty"></div>
        ))}
        {days.map(day => {
            const dateObj = new Date(year, month, day);
            const fullDateKey = formatDateKey(dateObj);
            const dayAppointments = mockAllAppointments[fullDateKey];
            const hasAppointments = dayAppointments && dayAppointments.length > 0;
            const displayAppointments = hasAppointments ? dayAppointments.slice(0, 2) : [];
            const remainingAppointments = hasAppointments ? dayAppointments.length - displayAppointments.length : 0;

            const isCurrentDay = isTodayDisplayedMonth && day === today.getDate();

            return (
                <div
                    key={day}
                    className={`calendar-day ${isCurrentDay ? 'current-day' : ''} ${selectedDateDayNum === day ? 'selected-day' : ''} ${hasAppointments ? 'has-appointments' : ''}`}
                    onClick={() => handleDayClick(day)}
                >
                    <div className="day-number">{day}</div>
                    {hasAppointments && (
                        <div className="monthly-appts-list">
                            {displayAppointments.map(appt => (
                                <div key={appt.id} className="monthly-appt-item">
                                    <span className="monthly-appt-name">{appt.name}</span>
                                </div>
                            ))}
                            {remainingAppointments > 0 && (
                                <div className="monthly-appt-more">+ {remainingAppointments} เพิ่มเติม</div>
                            )}
                        </div>
                    )}
                </div>
            );
        })}
        {/* Fill remaining empty cells for the last week */}
        {Array.from({ length: (7 - ( (firstDayOfMonth + days.length) % 7)) % 7 }).map((_, i) => (
          <div key={`empty-end-${i}`} className="calendar-day empty"></div>
        ))}
      </div>

      {selectedDateDayNum && (
        <div className="selected-date-appointments-detail">
          <h4 className="detail-header">นัดหมายสำหรับวันที่ {selectedDateDayNum} {thaiMonthName} {thaiYear}</h4>
          {selectedDateAppointments.length > 0 ? (
            <table className="detail-table">
              <thead>
                <tr>
                  <th>เวลา</th>
                  <th>ชื่อผู้ป่วย</th>
                  <th>บริการ</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {selectedDateAppointments.map(appt => (
                  <tr key={appt.id}>
                    <td>{appt.time}</td>
                    <td>{appt.name}</td>
                    <td>{appt.service}</td>
                    <td>
                      <span className={`status-badge ${appt.status === 'เสร็จสิ้น' ? 'status-done' : appt.status === 'กำลังรักษา' ? 'status-in-progress' : 'status-pending'}`}>
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-appointments-message">ไม่มีนัดหมายสำหรับวันที่ {selectedDateDayNum} {thaiMonthName} {thaiYear}</p>
          )}
        </div>
      )}
    </div>
  );
}


function AppointmentPage() {
  const [activeTab, setActiveTab] = useState('daily'); // 'daily', 'weekly', 'monthly'

  return (
    <div className="appointment-page">
      <div className="appointment-page-header">
        <h2 className="appointment-title">ตารางนัดหมาย</h2>
        <div className="action-buttons">
            <button className="add-button">
                <span className="add-icon">+</span> เพิ่มนัดหมาย
            </button>
        </div>
      </div>

      <div className="tab-navigation">
        <button
          className={`tab-button ${activeTab === 'daily' ? 'active' : ''}`}
          onClick={() => setActiveTab('daily')}
        >
          รายวัน
        </button>
        <button
          className={`tab-button ${activeTab === 'weekly' ? 'active' : ''}`}
          onClick={() => setActiveTab('weekly')}
        >
          รายสัปดาห์
        </button>
        <button
          className={`tab-button ${activeTab === 'monthly' ? 'active' : ''}`}
          onClick={() => setActiveTab('monthly')}
        >
          รายเดือน
        </button>
      </div>

      <div className="appointment-content">
        {activeTab === 'daily' && <DailyView />}
        {activeTab === 'weekly' && <WeeklyView />}
        {activeTab === 'monthly' && <MonthlyView />}
      </div>
    </div>
  );
}

export default AppointmentPage;