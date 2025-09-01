import React, { useState } from 'react';
// No need to import CSS here as App.css handles it via @import

function AddAppointmentForm({ onClose, onSave }) {
  const [formData, setFormData] = useState({
    patientName: '',
    phoneNumber: '',
    date: '',
    time: '',
    service: '',
    notes: '',
    status: 'รอ' // Default status for new appointments
  });

  const serviceOptions = [
    { value: '', label: 'เลือกบริการ' },
    { value: 'ฝังเข็ม', label: 'ฝังเข็ม' },
    { value: 'กัวซา', label: 'กัวซา' },
    { value: 'ครอบแก้ว', label: 'ครอบแก้ว' },
    { value: 'นวดแผนไทย', label: 'นวดแผนไทย' },
    { value: 'นวดเท้า', label: 'นวดเท้า' },
    { value: 'ปรึกษาทั่วไป', label: 'ปรึกษาทั่วไป' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Appointment Data:', formData);
    // In a real application, you would send this data to a backend
    onSave(formData); // Call the onSave prop with the form data
    onClose(); // Close the form after saving
  };

  return (
    <div className="add-appointment-form-overlay">
      <div className="add-appointment-form-card">
        <div className="form-header">
          <h3>เพิ่มนัดหมายใหม่</h3>
          <button className="close-button" onClick={onClose}>✖</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="patientName">ชื่อผู้ป่วย</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              placeholder="กรอกชื่อผู้ป่วย"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phoneNumber">เบอร์โทรศัพท์</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              placeholder="0XX-XXX-XXXX (ไม่บังคับ)"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">วันที่</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="time">เวลา</label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="service">บริการ</label>
            <select
              id="service"
              name="service"
              value={formData.service}
              onChange={handleChange}
              required
            >
              {serviceOptions.map(option => (
                <option key={option.value} value={option.value} disabled={option.value === ''}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="notes">หมายเหตุ</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="3"
              placeholder="รายละเอียดเพิ่มเติม (ไม่บังคับ)"
            ></textarea>
          </div>

          {/* Status could be a hidden field or default, for simplicity keep as default 'รอ' */}
          {/* <input type="hidden" name="status" value={formData.status} /> */}

          <div className="form-actions">
            <button type="button" className="cancel-button" onClick={onClose}>ยกเลิก</button>
            <button type="submit" className="save-button">บันทึกนัดหมาย</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAppointmentForm;