import React, { useState } from 'react';
import TodayView from './today';
import WeeklyView from './weekly';
import MonthlyView from './monthly';
import '../style/Appointment/Appointment.css';

// Mock Data for Appointments
const appointmentsData = [
    {
        id: 'CN001',
        time: '08:30',
        patientName: 'นางสาว สมใจ ใจดี',
        phone: '081-234-5678',
        location: 'ห้องตรวจ 1',
        service: 'ตรวจสุขภาพทั่วไป',
        doctor: 'นพ.สมชาย ใจดี',
        duration: '30 นาที',
        price: '500 บาท',
        notes: 'ผู้ป่วยใหม่ มีอาการไอเรื้อรังเล็กน้อย',
        status: 'รอตรวจ'
    },
    {
        id: 'CN002',
        time: '09:00',
        patientName: 'นาย วินัย สะบาย',
        phone: '082-345-6789',
        location: 'ห้องฉีดยา',
        service: 'ฉีดวัคซีน',
        doctor: 'พว.สมหญิง ใจเย็น',
        duration: '15 นาที',
        price: '300 บาท',
        notes: 'ฉีดวัคซีนไข้หวัดใหญ่',
        status: 'เช็คอินแล้ว'
    },
    {
        id: 'CN003',
        time: '09:30',
        patientName: 'นางสมหญิง โรงเย็น',
        phone: '083-456-7890',
        location: 'ห้องตรวจ 2',
        service: 'ตรวจหู คอ จมูก',
        doctor: 'นพ.วิชาญ เก่งกาจ',
        duration: '20 นาที',
        price: '450 บาท',
        notes: 'มีอาการเจ็บคอ',
        status: 'รอตรวจ'
    },
];

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
                <button
                    className={`tab-button ${activeTab === 'today' ? 'active' : ''}`}
                    onClick={() => setActiveTab('today')}
                >
                    วันนี้
                </button>
                <button
                    className={`tab-button ${activeTab === 'week' ? 'active' : ''}`}
                    onClick={() => setActiveTab('week')}
                >
                    รายสัปดาห์
                </button>
                <button
                    className={`tab-button ${activeTab === 'month' ? 'active' : ''}`}
                    onClick={() => setActiveTab('month')}
                >
                    รายเดือน
                </button>
            </div>
            <main className="tab-content">
                {renderContent()}
            </main>
        </div>
    );
};

export default Appointment;
