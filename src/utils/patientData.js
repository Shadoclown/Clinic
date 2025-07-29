import patientData from '../data/patients.json';

// Format date from YYYY-MM-DD to DD/MM/YYYY
export const formatThaiDate = (dateStr) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${parseInt(year) + 543}`;
};

// Get all patients
export const getAllPatients = () => {
  return patientData.patients;
};

// Get clinic statistics
export const getClinicStats = () => {
  return patientData.metadata.clinicStats;
};

// Get today's appointments
export const getTodayAppointments = () => {
  const appointments = [];
  patientData.patients.forEach(patient => {
    if (patient.appointments && patient.appointments.length > 0) {
      patient.appointments.forEach(appointment => {
        if (appointment.date === '2025-01-29') { // Today for our example
          appointments.push({
            id: appointment.id,
            time: appointment.time,
            patientName: patient.personalInfo.fullName,
            phone: patient.contactInfo.phone,
            service: appointment.service,
            notes: appointment.notes,
            status: appointment.status,
            doctor: appointment.doctor
          });
        }
      });
    }
  });
  return appointments;
};

// Get appointments for a specific date
export const getAppointmentsByDate = (dateStr) => {
  const appointments = [];
  patientData.patients.forEach(patient => {
    if (patient.appointments && patient.appointments.length > 0) {
      patient.appointments.forEach(appointment => {
        if (appointment.date === dateStr) {
          appointments.push({
            id: appointment.id,
            date: appointment.date,
            time: appointment.time,
            patientName: patient.personalInfo.fullName,
            phone: patient.contactInfo.phone,
            service: appointment.service,
            notes: appointment.notes,
            status: appointment.status,
            doctor: appointment.doctor
          });
        }
      });
    }
  });
  return appointments;
};

// Get all monthly appointments
export const getMonthlyAppointments = () => {
  const appointments = [];
  patientData.patients.forEach(patient => {
    if (patient.appointments && patient.appointments.length > 0) {
      patient.appointments.forEach(appointment => {
        const apptDate = new Date(appointment.date);
        appointments.push({
          id: appointment.id,
          date: apptDate,
          time: appointment.time,
          patientName: patient.personalInfo.fullName,
          phone: patient.contactInfo.phone,
          service: appointment.service,
          doctor: appointment.doctor,
          status: appointment.status === "รอตรวจ" ? "pending" : 
                 appointment.status === "เข้าตรวจแล้ว" ? "confirmed" : "completed"
        });
      });
    }
  });
  return appointments;
};

// Get all medical records
export const getAllMedicalRecords = () => {
  const records = [];
  patientData.patients.forEach(patient => {
    if (patient.medicalRecords && patient.medicalRecords.length > 0) {
      patient.medicalRecords.forEach(record => {
        records.push({
          hn: patient.hn,
          patientName: patient.personalInfo.fullName,
          date: formatThaiDate(record.date),
          time: record.time,
          diagnosis: record.diagnosis,
          doctor: record.doctor,
          type: record.type,
          status: record.status
        });
      });
    }
  });
  return records;
};

// Get bed occupancy data
export const getBedData = () => {
  const bedData = [
    { id: 1, status: 'available' },
    { id: 2, status: 'available' },
    { id: 3, status: 'available' },
    { id: 4, status: 'cleaning' },
    { id: 5, status: 'available' },
    { id: 6, status: 'available' },
    { id: 7, status: 'maintenance' },
    { id: 8, status: 'available' },
  ];
  
  // Add patients to the first two beds
  if (patientData.patients.length > 0) {
    bedData[0] = {
      id: 1,
      status: 'occupied',
      patient: {
        name: patientData.patients[0].personalInfo.fullName,
        cn: patientData.patients[0].cn,
        phone: patientData.patients[0].contactInfo.phone,
        time: patientData.patients[0].appointments[0].time,
        duration: 30,
        service: patientData.patients[0].appointments[0].service
      }
    };
  }
  
  if (patientData.patients.length > 1) {
    bedData[2] = {
      id: 3,
      status: 'occupied',
      patient: {
        name: patientData.patients[1].personalInfo.fullName,
        cn: patientData.patients[1].cn,
        phone: patientData.patients[1].contactInfo.phone,
        time: patientData.patients[1].appointments[0].time,
        duration: 45,
        service: patientData.patients[1].appointments[0].service
      }
    };
  }
  
  return bedData;
};
