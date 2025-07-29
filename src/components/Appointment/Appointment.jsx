import React, { useState } from 'react';
import TodayView from './Today';
import WeeklyView from './Weekly';
import MonthlyView from './Monthly';
import '../style/Appointment/Appointment.css';
import { getTodayAppointments } from '../../utils/patientData';

// Get appointment data from our utility
const appointmentsData = getTodayAppointments();

const Appointment = () => {
    const [activeTab, setActiveTab] = useState('today');

    const renderContent = () => {
        switch (activeTab) {
            case 'week':
                return <WeeklyView />;
            case 'month':
                return <MonthlyView />;
            case 'today':
            default:
                return <TodayView appointments={appointmentsData} />;
        }
    };

    return (
        <div className="appointment-page">
            <header className="page-header">
                <h1>ตารางนัดหมาย</h1>
                <p>จัดการและดูตารางนัดหมายผู้ป่วย</p>
            </header>
            <div className="tabs-container">
                <span
                    className={`tab-button ${activeTab === 'today' ? 'active' : ''}`}
                    onClick={() => setActiveTab('today')}
                >
                    วันนี้
                </span>
                <span
                    className={`tab-button ${activeTab === 'week' ? 'active' : ''}`}
                    onClick={() => setActiveTab('week')}
                >
                    รายสัปดาห์
                </span>
                <span
                    className={`tab-button ${activeTab === 'month' ? 'active' : ''}`}
                    onClick={() => setActiveTab('month')}
                >
                    รายเดือน
                </span>
            </div>
            <main className="tab-content">
                {renderContent()}
            </main>
        </div>
    );
};

export default Appointment;
