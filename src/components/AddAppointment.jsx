import React, { useState } from 'react';
import './style/AddAppointment.css';

function AddAppointment({ isOpen, onClose, onSave }) {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        courseType: 'ทันตกรรม', // Default value
        currentCourseCount: 1,
        totalCourseCount: 1,
        date: formatDateForInput(new Date()),
        time: '',
        service: '',
        comment: ''
    });
    const [errors, setErrors] = useState({});

    // Format date as YYYY-MM-DD for date input
    function formatDateForInput(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    // Convert from YYYY-MM-DD to DD/MM/(YYYY+543) Thai format
    function formatDateToThai(isoDate) {
        const [year, month, day] = isoDate.split('-');
        const thaiYear = parseInt(year) + 543;
        return `${day}/${month}/${thaiYear}`;
    }

    const courseTypes = [
        'ไม่มี',
        'ทันตกรรม',
        'ตรวจสุขภาพ',
        'กายภาพบำบัด',
        'นวดแผนไทย',
        'หัตถการ',
        'เวชสำอาง'
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
        // Clear error when field is edited
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'กรุณากรอกชื่อผู้ป่วย';
        if (!formData.age.trim()) newErrors.age = 'กรุณากรอกอายุ';
        if (!formData.date) newErrors.date = 'กรุณาเลือกวันที่';
        if (!formData.time.trim()) newErrors.time = 'กรุณากรอกเวลา';
        if (!formData.service.trim()) newErrors.service = 'กรุณากรอกบริการ';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            // Format the data to match patients.json structure
            const newAppointment = {
                id: `PT${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`, // Generate random ID
                details: {
                    name: formData.name,
                    age: formData.age,
                    course: [
                        formData.courseType,
                        parseInt(formData.currentCourseCount),
                        parseInt(formData.totalCourseCount)
                    ],
                    date: formatDateToThai(formData.date),
                    time: formData.time,
                    service: formData.service,
                    comment: formData.comment
                }
            };
            
            onSave(newAppointment);
            
            // Reset form
            setFormData({
                name: '',
                age: '',
                courseType: 'ทันตกรรม',
                currentCourseCount: 1,
                totalCourseCount: 1,
                date: formatDateForInput(new Date()),
                time: '',
                service: '',
                comment: ''
            });
            
            // Close modal
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <div className="modal-header">
                    <h2>เพิ่มนัดหมายใหม่</h2>
                    <button className="modal-close" onClick={onClose}>&times;</button>
                </div>
                <form onSubmit={handleSubmit} className="appointment-form">
                    <div className="form-group">
                        <label htmlFor="name">ชื่อผู้ป่วย <span className="required">*</span></label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="กรอกชื่อ-นามสกุล"
                            className={errors.name ? 'error' : ''}
                        />
                        {errors.name && <span className="error-message">{errors.name}</span>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="age">อายุ <span className="required">*</span></label>
                        <input
                            type="number"
                            id="age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            min="0"
                            max="120"
                            placeholder="กรอกอายุ"
                            className={errors.age ? 'error' : ''}
                        />
                        {errors.age && <span className="error-message">{errors.age}</span>}
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="date">วันที่นัด <span className="required">*</span></label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                className={errors.date ? 'error' : ''}
                            />
                            {errors.date && <span className="error-message">{errors.date}</span>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="time">เวลา <span className="required">*</span></label>
                            <input
                                type="time"
                                id="time"
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                className={errors.time ? 'error' : ''}
                            />
                            {errors.time && <span className="error-message">{errors.time}</span>}
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="service">บริการ <span className="required">*</span></label>
                        <input
                            type="text"
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            placeholder="กรอกบริการที่นัดหมาย"
                            className={errors.service ? 'error' : ''}
                        />
                        {errors.service && <span className="error-message">{errors.service}</span>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="courseType">ประเภทคอร์ส</label>
                        <select 
                            id="courseType" 
                            name="courseType" 
                            value={formData.courseType}
                            onChange={handleChange}
                        >
                            {courseTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="currentCourseCount">ครั้งที่</label>
                            <input
                                type="number"
                                id="currentCourseCount"
                                name="currentCourseCount"
                                value={formData.currentCourseCount}
                                onChange={handleChange}
                                min="1"
                            />
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="totalCourseCount">จำนวนครั้งทั้งหมด</label>
                            <input
                                type="number"
                                id="totalCourseCount"
                                name="totalCourseCount"
                                value={formData.totalCourseCount}
                                onChange={handleChange}
                                min="1"
                            />
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="comment">หมายเหตุ</label>
                        <textarea
                            id="comment"
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                            placeholder="หมายเหตุหรือรายละเอียดเพิ่มเติม"
                            rows="3"
                        ></textarea>
                    </div>
                    
                    <div className="form-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>ยกเลิก</button>
                        <button type="submit" className="btn-submit">บันทึกนัดหมาย</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddAppointment;