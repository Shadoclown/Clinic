import React, { useState, useMemo } from 'react';
import './style/Records.css';
import { getAllMedicalRecords } from '../utils/patientData';

// --- Data ---
const medicalRecordsData = getAllMedicalRecords();

// --- Reusable Sub-Components ---

const RecordsPageHeader = () => (
    <header className="records-header">
        <div>
            <h1>เวชระเบียน</h1>
            <p>จัดการและดูประวัติเวชระเบียนผู้ป่วย</p>
        </div>
        <button className="btn-primary">+ เพิ่มเวชระเบียนใหม่</button>
    </header>
);

const RecordRow = ({ record }) => (
    <tr>
        <td>{record.hn}</td>
        <td>{record.patientName}</td>
        <td>{record.date}</td>
        <td>{record.time}</td>
        <td>{record.service}</td>
        <td>
            <span className="pill type-pill">{record.course[0]}</span>
        </td>
        <td>{`${record.course[1]}/${record.course[2]}`}</td>
        <td className="table-actions">
            <button className="action-btn view-btn">ดูรายละเอียด</button>
            <button className="action-btn edit-btn">แก้ไข</button>
        </td>
    </tr>
);

const RecordsTable = ({ records }) => (
    <div className="table-wrapper">
        <table className="records-table thai-clinic-table">
            <thead>
                <tr>
                    <th>HN</th>
                    <th>ชื่อผู้ป่วย</th>
                    <th>วันที่</th>
                    <th>เวลา</th>
                    <th>บริการ</th>
                    <th>ประเภท</th>
                    <th>จำนวนครั้ง</th>
                    <th>การดำเนินการ</th>
                </tr>
            </thead>
            <tbody>
                {records.length === 0 ? (
                    <tr>
                        <td colSpan="8" className="no-records">
                            ไม่มีข้อมูลเวชระเบียน
                        </td>
                    </tr>
                ) : (
                    records.map(record => <RecordRow key={record.id} record={record} />)
                )}
            </tbody>
        </table>
    </div>
);


// --- Main Page Component ---

const MedicalRecords = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // Memoize the filtering logic for performance optimization
    const filteredRecords = useMemo(() => {
        if (!searchTerm) {
            return medicalRecordsData;
        }
        const lowercasedTerm = searchTerm.toLowerCase();
        return medicalRecordsData.filter(record =>
            record.patientName.toLowerCase().includes(lowercasedTerm) ||
            record.hn.toLowerCase().includes(lowercasedTerm) ||
            record.service.toLowerCase().includes(lowercasedTerm)
        );
    }, [searchTerm]);

    return (
        <div className="records-page-container">
            <RecordsPageHeader />

            <main className="records-content-card">
                <div className="card-header">
                    <h2>รายการเวชระเบียน</h2>
                    <div className="search-container">
                        <span className="search-icon">🔍</span>
                        <input
                            type="text"
                            placeholder="ค้นหาชื่อ, HN, หรือบริการ..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <RecordsTable records={filteredRecords} />
            </main>
        </div>
    );
};

export default MedicalRecords;