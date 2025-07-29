import React from 'react';
import './style/Records.css';
import { getAllMedicalRecords } from '../utils/patientData';

// Get medical records data from our utility
const medicalRecordsData = getAllMedicalRecords();

// --- Reusable Components ---

const StatusPill = ({ status }) => {
    const getStatusClass = () => {
        switch (status) {
            case 'เสร็จสิ้น': return 'status-completed';
            case 'กำลังดำเนินการ': return 'status-inprogress';
            case 'รอดำเนินการ': return 'status-pending';
            default: return '';
        }
    };
    return <span className={`pill ${getStatusClass()}`}>{status}</span>;
};

const TypePill = ({ type }) => (
    <span className="pill type-pill">{type}</span>
);

// --- Main Page Component ---

const MedicalRecords = () => {
    const [searchTerm, setSearchTerm] = React.useState('');

    const filteredRecords = medicalRecordsData.filter(record =>
        record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.hn.toLowerCase().includes(searchTerm.toLowerCase()) ||
        record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="records-page-container">
            <header className="records-header">
                <div>
                    <h1>เวชระเบียน</h1>
                    <p>จัดการและดูประวัติเวชระเบียนผู้ป่วย</p>
                </div>
                <button className="btn-primary">
                    + เพิ่มเวชระเบียนใหม่
                </button>
            </header>

            <main className="records-content-card">
                <div className="card-header">
                    <h2>รายการเวชระเบียน</h2>
                    <div className="search-container">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="ค้นหาชื่อ, HN, หรือการวินิจฉัย..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="records-table thai-clinic-table">
                        <thead>
                            <tr>
                                <th>HN</th>
                                <th>ชื่อผู้ป่วย</th>
                                <th>วันที่</th>
                                <th>เวลา</th>
                                <th>การวินิจฉัย</th>
                                <th>แพทย์</th>
                                <th>ประเภท</th>
                                <th>สถานะ</th>
                                <th>การดำเนินการ</th>
                                <th>ยกเลิก</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.length === 0 ? (
                                <tr>
                                    <td colSpan="10" className="no-records">
                                        ไม่มีข้อมูลเวชระเบียน
                                    </td>
                                </tr>
                            ) : (
                                filteredRecords.map((record, index) => (
                                    <tr key={index}>
                                        <td>{record.hn}</td>
                                        <td>{record.patientName}</td>
                                        <td>{record.date}</td>
                                        <td>{record.time}</td>
                                        <td>{record.diagnosis}</td>
                                        <td>{record.doctor}</td>
                                        <td><span className="pill type-pill">{record.type}</span></td>
                                        <td><span className={`status-pill status-${record.status === 'เสร็จสิ้น' ? 'completed' : 
                                                record.status === 'กำลังดำเนินการ' ? 'inprogress' : 'pending'}`}>
                                                {record.status}
                                            </span>
                                        </td>
                                        <td className="table-actions">
                                            <button className="action-btn view-btn">ดูรายละเอียด</button>
                                            <button className="action-btn edit-btn">แก้ไข</button>
                                        </td>
                                        <td className='cancel-action'>
                                            <button className="action-btn cancel-btn">ยกเลิก</button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default MedicalRecords;