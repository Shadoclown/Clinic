import React from 'react';
import './style/Examination.css';

// --- Mock Data ---
const bedData = [
    { 
        id: 1, 
        status: 'occupied', 
        patient: { name: 'นางสาว สุดา มาลัย', cn: 'CN001', phone: '081-234-5678', time: '09:30', duration: 30, service: 'ตรวจสุขภาพทั่วไป' } 
    },
    { id: 2, status: 'available' },
    { 
        id: 3, 
        status: 'occupied', 
        patient: { name: 'นาย วิชัย ใจดี', cn: 'CN002', phone: '082-345-6789', time: '10:15', duration: 45, service: 'ตรวจหัวใจ' } 
    },
    { id: 4, status: 'cleaning' },
    { id: 5, status: 'available' },
    { 
        id: 6, 
        status: 'occupied', 
        patient: { name: 'นางสาว มาลี สวยงาม', cn: 'CN003', phone: '083-456-7890', time: '11:00', duration: 20, service: 'ตรวจเลือด' } 
    },
    { id: 7, status: 'maintenance' },
    { id: 8, status: 'available' },
];

const totalBeds = bedData.length;
const occupiedBeds = bedData.filter(b => b.status === 'occupied').length;
const availableBeds = bedData.filter(b => b.status === 'available').length;
const utilizationRate = Math.round((occupiedBeds / totalBeds) * 100);

// --- Reusable Components ---

const SummaryCard = ({ icon, value, label, color }) => (
    <div className="summary-card">
        <div className="summary-info">
            <span className="summary-value">{value}</span>
            <span className="summary-label">{label}</span>
        </div>
        <div className="summary-icon" style={{ backgroundColor: color }}>
            {icon}
        </div>
    </div>
);

const BedCard = ({ bed }) => {
    const getStatusInfo = () => {
        switch (bed.status) {
            case 'occupied': return { className: 'occupied', label: 'มีผู้ป่วย' };
            case 'available': return { className: 'available', label: 'พร้อมใช้งาน' };
            case 'cleaning': return { className: 'cleaning', label: 'กำลังทำความสะอาด' };
            case 'maintenance': return { className: 'maintenance', label: 'ซ่อมบำรุง' };
            default: return { className: 'default', label: '' };
        }
    };

    const statusInfo = getStatusInfo();

    return (
        <div className={`bed-card ${statusInfo.className}`}>
            <div className="bed-card-header">
                <h3>เตียงตรวจ {bed.id}</h3>
                <span className={`status-tag ${statusInfo.className}`}>{statusInfo.label}</span>
            </div>
            <div className="bed-card-body">
                {bed.status === 'occupied' ? (
                    <div className="patient-details">
                        <p><span className="detail-icon">👤</span> {bed.patient.name}</p>
                        <p className="cn-text">CN: {bed.patient.cn}</p>
                        <p><span className="detail-icon">📞</span> {bed.patient.phone}</p>
                        <p><span className="detail-icon">🕒</span> {bed.patient.time} ({bed.patient.duration} นาที)</p>
                        <div className="service-info">
                            <p className="service-label">บริการ</p>
                            <p className="service-name">{bed.patient.service}</p>
                        </div>
                    </div>
                ) : (
                    <div className="empty-bed-view">
                        <span className="empty-bed-icon">🛏️</span>
                        <p>ไม่มีผู้ป่วย</p>
                    </div>
                )}
            </div>
            <div className="bed-card-footer">
                {bed.status === 'occupied' && <button className="btn btn-finish">เสร็จสิ้นการตรวจ</button>}
                {bed.status === 'available' && <button className="btn btn-start">เริ่มตรวจผู้ป่วย</button>}
                {bed.status === 'cleaning' && <button className="btn btn-finish-cleaning">ทำความสะอาดเสร็จ</button>}
                {bed.status === 'maintenance' && <button className="btn btn-finish-maintenance">ซ่อมบำรุงเสร็จ</button>}
            </div>
        </div>
    );
};


// --- Main Dashboard Component ---

const ExaminationDashboard = () => {
    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>ห้องตรวจ</h1>
                <p>ตรวจสอบสถานะเตียงตรวจและผู้ป่วย</p>
            </header>

            <section className="summary-section">
                <SummaryCard icon="🛏️" value={totalBeds} label="เตียงทั้งหมด" color="rgba(3, 169, 244, 0.1)" />
                <SummaryCard icon="👤" value={occupiedBeds} label="มีผู้ป่วย" color="rgba(239, 83, 80, 0.1)" />
                <SummaryCard icon="✅" value={availableBeds} label="พร้อมใช้งาน" color="rgba(102, 187, 106, 0.1)" />
                <SummaryCard icon="📊" value={`${utilizationRate}%`} label="อัตราการใช้งาน" color="rgba(204, 204, 204, 0.2)" />
            </section>

            <main className="beds-grid">
                {bedData.map(bed => <BedCard key={bed.id} bed={bed} />)}
            </main>
        </div>
    );
};

export default ExaminationDashboard;