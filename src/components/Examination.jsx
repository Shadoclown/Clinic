import React, { useState } from 'react';
import './style/Examination.css';
import { getBedData } from '../utils/patientData';

// Get bed data from our utility
const bedData = getBedData();

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

const TimerControl = ({ initialMinutes = 0, onTimerEnd }) => {
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
            setEditValue(`${minutes}:${String(seconds).padStart(2, '0')}`);
        }
    };
    
    const handleEditDone = () => {
        setIsEditing(false);
        try {
            const [min, sec] = editValue.split(':').map(val => parseInt(val, 10));
            if (!isNaN(min) && min >= 0) {
                setMinutes(min);
            }
            if (!isNaN(sec) && sec >= 0 && sec < 60) {
                setSeconds(sec);
            }
        } catch (e) {
            // Invalid format, keep current values
        }
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
                    <span 
                        className="timer-time" 
                        onClick={handleEditStart}
                    >
                        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                    </span>
                )}
            </div>
            <div className="timer-buttons">
                <button 
                    className="btn-timer-action" 
                    onClick={isRunning ? resetTimer : startTimer}
                >
                    {isRunning ? 'Reset' : 'Start'}
                </button>
            </div>
        </div>
    );
};

const BedCard = ({ bed }) => {
    const getStatusInfo = () => {
        switch (bed.status) {
            case 'occupied': return { className: 'occupied', label: 'มีผู้ป่วย' };
            case 'available': return { className: 'available', label: 'พร้อมใช้งาน' };
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
                        <TimerControl initialMinutes={parseInt(bed.patient.duration) || 15} />
                    </>
                ) : (
                    <>
                        <div className="empty-bed-view">
                            <span className="empty-bed-icon">🛏️</span>
                            <p>ไม่มีผู้ป่วย</p>
                        </div>
                        {/* Timer removed for available beds */}
                    </>
                )}
            </div>
            <div className="bed-card-footer">
                {bed.status === 'occupied' && (
                    <>
                        <button className="btn btn-finish">เสร็จสิ้นการตรวจ</button>
                    </>
                )}
                {bed.status === 'available' && (
                    <button className="btn btn-start" style={{ display: 'block', width: '100%', padding: '10px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
                        เริ่มตรวจผู้ป่วย
                    </button>
                )}
            </div>
        </div>
    );
};

// --- Main Dashboard Component ---

const ExaminationDashboard = () => {
    const totalBeds = bedData.length;
    const occupiedBeds = bedData.filter(b => b.status === 'occupied').length;
    const availableBeds = bedData.filter(b => b.status === 'available').length;
    const utilizationRate = Math.round((occupiedBeds / totalBeds) * 100);
    
    const [statusFilter, setStatusFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredBeds = bedData.filter(bed => {
        // Filter by status
        if (statusFilter !== 'all' && bed.status !== statusFilter) {
            return false;
        }
        
        // Filter by search term (only for occupied beds with patient info)
        if (searchTerm && bed.status === 'occupied') {
            const patientInfo = bed.patient ? 
                bed.patient.name + bed.patient.cn + bed.patient.service : '';
            return patientInfo.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchTerm) {
            // If there's a search term but bed is not occupied, don't show it
            return false;
        }
        
        return true;
    });

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
                <SummaryCard icon="🛏️" value={totalBeds} label="เตียงทั้งหมด" color="rgba(3, 169, 244, 0.1)" />
                <SummaryCard icon="👤" value={occupiedBeds} label="มีผู้ป่วย" color="rgba(239, 83, 80, 0.1)" />
                <SummaryCard icon="✅" value={availableBeds} label="พร้อมใช้งาน" color="rgba(102, 187, 106, 0.1)" />
                <SummaryCard icon="📊" value={`${utilizationRate}%`} label="อัตราการใช้งาน" color="rgba(204, 204, 204, 0.2)" />
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
                        <button 
                            className="btn btn-reset"
                            onClick={() => { setStatusFilter('all'); setSearchTerm(''); }}
                        >
                            รีเซ็ตการค้นหา
                        </button>
                    </div>
                </div>
            )}
            
            <footer className="dashboard-footer">
                <div className="quick-actions">
                    <button className="btn btn-secondary">ตั้งค่าเตียง</button>
                    <button className="btn btn-secondary">รายงาน</button>
                    <button className="btn btn-primary">+ เพิ่มเตียงใหม่</button>
                </div>
            </footer>
        </div>
    );
};

export default ExaminationDashboard;