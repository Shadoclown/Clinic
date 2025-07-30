import React, { useState } from 'react';
import TodayView from './Today';
import WeeklyView from './Weekly';
import MonthlyView from './Monthly';
import '../style/Appointment/Appointment.css';
import { getTodayAppointments } from '../../utils/patientData';

// A simple header component for reusability
const PageHeader = ({ title, subtitle }) => (
    <header className="page-header">
        <h1>{title}</h1>
        <p>{subtitle}</p>
    </header>
);

// Configuration for the different views/tabs
const tabConfig = [
    { id: 'today', label: 'วันนี้', Component: TodayView },
    { id: 'week', label: 'รายสัปดาห์', Component: WeeklyView },
    { id: 'month', label: 'รายเดือน', Component: MonthlyView }
];

const Appointment = () => {
    const [activeTab, setActiveTab] = useState('today');

    // Fetch data inside the component
    const appointmentsData = getTodayAppointments();

    // Find the component to render based on the active tab
    const ActiveComponent = tabConfig.find(tab => tab.id === activeTab)?.Component;

    return (
        <div className="appointment-page">
            <PageHeader title="ตารางนัดหมาย" subtitle="จัดการและดูตารางนัดหมายผู้ป่วย" />

            {/* Tab Navigation */}
            <div className="tabs-container">
                {tabConfig.map(tab => (
                    <button
                        key={tab.id}
                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab.id)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Content Area */}
            <main className="tab-content">
                {ActiveComponent && (
                    <ActiveComponent appointments={appointmentsData} />
                )}
            </main>
        </div>
    );
};

export default Appointment;