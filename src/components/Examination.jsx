import React, { useState, useMemo, useCallback } from 'react';
import './style/Examination.css'; // Using the original CSS file
import { getBedData } from '../utils/patientData';

// --- Data ---
const bedData = getBedData();

// --- Reusable Components ---

const SummaryCard = ({ icon, value, label, color }) => (
    <div className="summary-card">
        <div className="summary-info">
            <span className="summary-label">{label}</span>
            <span className="summary-value">{value}</span>
        </div>
        <div className="summary-icon" style={{ backgroundColor: color }}>
            {icon}
        </div>
    </div>
);

const TimerControl = ({ initialMinutes = 0, onTimerEnd }) => {
    // This component is kept identical to the original as it was well-contained.
    const [isRunning, setIsRunning] = useState(false);
    const [minutes, setMinutes] = useState(initialMinutes);
    const [seconds, setSeconds] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState('');
    
    React.useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                } else if (minutes > 0) {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                } else {
                    setIsRunning(false);
                    if (onTimerEnd) onTimerEnd();
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRunning, minutes, seconds, onTimerEnd]);

    const startTimer = () => setIsRunning(true);
    const resetTimer = () => {
        setIsRunning(false);
        setMinutes(initialMinutes);
        setSeconds(0);
    };
    
    const handleEditStart = () => {
        if (!isRunning) {
            setIsEditing(true);
            setEditValue(`${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`);
        }
    };
    
    const handleEditDone = () => {
        setIsEditing(false);
        try {
            const [min, sec] = editValue.split(':').map(val => parseInt(val, 10));
            if (!isNaN(min) && min >= 0) setMinutes(min);
            if (!isNaN(sec) && sec >= 0 && sec < 60) setSeconds(sec);
        } catch (e) { /* Invalid format, do nothing */ }
    };

    return (
        <div className="timer-control">
            <div className="timer-display-container">
                <span className="timer-icon">⏱️</span>
                {isEditing ? (
                    <input
                        className="timer-time"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleEditDone}
                        onKeyPress={(e) => e.key === 'Enter' && handleEditDone()}
                        autoFocus
                    />
                ) : (
                    <span className="timer-time" onClick={handleEditStart}>
                        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </span>
                )}
            </div>
            <div className="timer-buttons">
                <button className="btn-timer-action" onClick={isRunning ? resetTimer : startTimer}>
                    {isRunning ? 'Reset' : 'Start'}
                </button>
            </div>
        </div>
    );
};

const BedCard = ({ bed }) => {
    const statusInfo = useMemo(() => {
        switch (bed.status) {
            case 'occupied': return { className: 'occupied', label: 'มีผู้ป่วย' };
            case 'available': return { className: 'available', label: 'พร้อมใช้งาน' };
            default: return { className: 'default', label: '' };
        }
    }, [bed.status]);

    return (
        <div className={`bed-card ${statusInfo.className}`}>
            <div className="bed-card-header">
                <h3>เตียงตรวจ {bed.id}</h3>
                <span className={`status-tag ${statusInfo.className}`}>{statusInfo.label}</span>
            </div>
            <div className="bed-card-body">
                {bed.status === 'occupied' ? (
                    <>
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
                        <TimerControl initialMinutes={parseInt(bed.patient.duration, 10) || 15} />
                    </>
                ) : (
                    <div className="empty-bed-view">
                        <span className="empty-bed-icon">🛏️</span>
                        <p>ไม่มีผู้ป่วย</p>
                    </div>
                )}
            </div>
            <div className="bed-card-footer">
                {bed.status === 'occupied' && (
                    <button className="btn btn-finish">เสร็จสิ้นการตรวจ</button>
                )}
                {bed.status === 'available' && (
                    // The inline style is removed here as it's redundant.
                    // The .btn and .btn-start classes from your CSS already handle this styling.
                    <button className="btn btn-start">
                        เริ่มตรวจผู้ป่วย
                    </button>
                )}
            </div>
        </div>
    );
};

// --- Main Dashboard Component ---

const ExaminationDashboard = () => {
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const summaryStats = useMemo(() => {
        const totalBeds = bedData.length;
        const occupiedBeds = bedData.filter(b => b.status === 'occupied').length;
        const availableBeds = totalBeds - occupiedBeds;
        const utilizationRate = totalBeds > 0 ? Math.round((occupiedBeds / totalBeds) * 100) : 0;
        return { totalBeds, occupiedBeds, availableBeds, utilizationRate };
    }, []);

    const filteredBeds = useMemo(() => {
        return bedData.filter(bed => {
            if (statusFilter !== 'all' && bed.status !== statusFilter) {
                return false;
            }
            if (searchTerm && bed.status === 'occupied' && bed.patient) {
                const patientInfo = (bed.patient.name + bed.patient.cn + bed.patient.service).toLowerCase();
                return patientInfo.includes(searchTerm.toLowerCase());
            }
            if (searchTerm && bed.status !== 'occupied') {
                return false;
            }
            return true;
        });
    }, [statusFilter, searchTerm]);

    const resetFilters = useCallback(() => {
        setStatusFilter('all');
        setSearchTerm('');
    }, []);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <div className="header-content">
                    <h1>ห้องตรวจ</h1>
                    <p>ตรวจสอบสถานะเตียงตรวจและผู้ป่วย</p>
                </div>
                <div className="header-actions">
                    <div className="search-container">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="ค้นหาผู้ป่วย..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-container">
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="status-filter"
                        >
                            <option value="all">ทั้งหมด</option>
                            <option value="occupied">มีผู้ป่วย</option>
                            <option value="available">พร้อมใช้งาน</option>
                        </select>
                    </div>
                </div>
            </header>

            <section className="summary-section">
                <SummaryCard icon="🛏️" value={summaryStats.totalBeds} label="เตียงทั้งหมด" color="rgba(3, 169, 244, 0.1)" />
                <SummaryCard icon="👤" value={summaryStats.occupiedBeds} label="มีผู้ป่วย" color="rgba(239, 83, 80, 0.1)" />
                <SummaryCard icon="✅" value={summaryStats.availableBeds} label="พร้อมใช้งาน" color="rgba(102, 187, 106, 0.1)" />
                {/* <SummaryCard icon="📊" value={`${summaryStats.utilizationRate}%`} label="อัตราการใช้งาน" color="rgba(204, 204, 204, 0.2)" /> */}
            </section>

            {filteredBeds.length > 0 ? (
                <main className="beds-grid">
                    {filteredBeds.map(bed => <BedCard key={bed.id} bed={bed} />)}
                </main>
            ) : (
                <div className="no-results">
                    <div className="empty-state">
                        <span className="empty-icon">🔍</span>
                        <h3>ไม่พบเตียงที่ค้นหา</h3>
                        <p>ลองเปลี่ยนการค้นหาหรือตัวกรอง</p>
                        <button className="btn btn-reset" onClick={resetFilters}>
                            รีเซ็ตการค้นหา
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExaminationDashboard;