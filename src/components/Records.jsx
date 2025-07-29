import React from 'react';
import './style/Records.css';

// --- Mock Data for the Table ---
const medicalRecordsData = [
    {
        hn: 'HN001234',
        patientName: 'นางสาว สมศรี ใจดี',
        date: '29/1/2567',
        time: '09:30',
        diagnosis: 'หวัด ไข้',
        doctor: 'นพ.สมชาย แพทย์ดี',
        type: 'ตรวจรักษา',
        status: 'เสร็จสิ้น',
    },
    {
        hn: 'HN001235',
        patientName: 'นาย วิชัย สุขสบาย',
        date: '29/1/2567',
        time: '10:15',
        diagnosis: 'ความดันโลหิตสูง',
        doctor: 'นพ.สุรชัย หัตถกรรม',
        type: 'ติดตาม',
        status: 'กำลังดำเนินการ',
    },
    {
        hn: 'HN001236',
        patientName: 'นางมาลี ดอกไม้',
        date: '29/1/2567',
        time: '11:00',
        diagnosis: 'เบาหวาน',
        doctor: 'นพ.สมชาย แพทย์ดี',
        type: 'ปรึกษา',
        status: 'รอดำเนินการ',
    },
    {
        hn: 'HN001237',
        patientName: 'นาย ประยุทธ สีเทา',
        date: '28/1/2567',
        time: '14:30',
        diagnosis: 'ปวดหลัง',
        doctor: 'นพ.วิชัย กระดูกดี',
        type: 'ตรวจรักษา',
        status: 'เสร็จสิ้น',
    },
];

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

const ActionButtons = () => (
    <div className="action-buttons">
        <div className="button-group">
            <button className="action-btn view-btn">ดูรายละเอียด</button>
            <button className="action-btn edit-btn">แก้ไข</button>
        </div>
        <button className="action-btn delete-btn">ลบ</button>
    </div>
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
                    <table className="records-table">
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
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRecords.map((record) => (
                                <tr key={record.hn}>
                                    <td>{record.hn}</td>
                                    <td>{record.patientName}</td>
                                    <td>{record.date}</td>
                                    <td>{record.time}</td>
                                    <td>{record.diagnosis}</td>
                                    <td>{record.doctor}</td>
                                    <td><TypePill type={record.type} /></td>
                                    <td><StatusPill status={record.status} /></td>
                                    <td><ActionButtons /></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default MedicalRecords;