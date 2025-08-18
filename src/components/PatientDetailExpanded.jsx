import React from 'react';
import './style/PatientDetails.css';

const PatientDetailExpanded = ({ patient }) => {
  if (!patient || !patient.details) {
    return <div className="patient-detail-container">ไม่พบข้อมูลผู้ป่วย</div>;
  }

  const { details } = patient;

  return (
    <div className="patient-detail-container">
      <div className="detail-grid">
        {/* Personal Information */}
        <div className="detail-section">
          <h4>ข้อมูลส่วนบุคคล</h4>
          <div className="detail-row">
            <div className="detail-label">รหัสประจำตัว</div>
            <div className="detail-value">{patient.id}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">ชื่อ-นามสกุล</div>
            <div className="detail-value">{details.name}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">อายุ</div>
            <div className="detail-value">{details.age} ปี</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">เพศ</div>
            <div className="detail-value">{details.gender || '-'}</div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="detail-section">
          <h4>ข้อมูลการติดต่อ</h4>
          <div className="detail-row">
            <div className="detail-label">โทรศัพท์</div>
            <div className="detail-value">{details.contact?.phone || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">อีเมล</div>
            <div className="detail-value">{details.contact?.email || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">ที่อยู่</div>
            <div className="detail-value">{details.contact?.address || '-'}</div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="detail-section">
          <h4>ข้อมูลทางการแพทย์</h4>
          <div className="detail-row">
            <div className="detail-label">กรุ๊ปเลือด</div>
            <div className="detail-value">{details.medical?.blood_type || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">ส่วนสูง/น้ำหนัก</div>
            <div className="detail-value">
              {details.medical?.height ? `${details.medical.height} ซม.` : '-'} / 
              {details.medical?.weight ? ` ${details.medical.weight} กก.` : '-'}
            </div>
          </div>
          <div className="detail-row">
            <div className="detail-label">ความดันโลหิต</div>
            <div className="detail-value">{details.medical?.blood_pressure || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">การแพ้ยา/อาหาร</div>
            <div className="detail-value">
              {details.medical?.allergies && details.medical.allergies.length > 0 
                ? details.medical.allergies.join(', ')
                : 'ไม่มี'}
            </div>
          </div>
          <div className="detail-row">
            <div className="detail-label">โรคประจำตัว</div>
            <div className="detail-value">
              {details.medical?.chronic_conditions && details.medical.chronic_conditions.length > 0 
                ? details.medical.chronic_conditions.join(', ')
                : 'ไม่มี'}
            </div>
          </div>
        </div>

        {/* Appointment Information */}
        <div className="detail-section">
          <h4>ข้อมูลการนัดหมาย</h4>
          <div className="detail-row">
            <div className="detail-label">วันที่นัด</div>
            <div className="detail-value">{details.date}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">เวลานัด</div>
            <div className="detail-value">{details.time}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">บริการ</div>
            <div className="detail-value">{details.service}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">คอร์ส</div>
            <div className="detail-value">
              {details.course[0]} (ครั้งที่ {details.course[1]}/{details.course[2]})
            </div>
          </div>
          <div className="detail-row">
            <div className="detail-label">นัดครั้งถัดไป</div>
            <div className="detail-value">{details.next_appointment || '-'}</div>
          </div>
          <div className="detail-row">
            <div className="detail-label">หมายเหตุ</div>
            <div className="detail-value">{details.comment || '-'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default PatientDetailExpanded;
