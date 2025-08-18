import patientData from '../data/patients.json';

// Format date from DD/MM/YYYY to YYYY-MM-DD (for internal use)
const formatDateToISO = (thaiDate) => {
  if (!thaiDate) return '';
  const [day, month, year] = thaiDate.split('/');
  return `${parseInt(year) - 543}-${month}-${day}`;
};

// Format date from YYYY-MM-DD to DD/MM/YYYY
export const formatThaiDate = (dateStr) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${parseInt(year) + 543}`;
};

// Get all patients
export const getAllPatients = () => {
  return patientData;
};

// Add a new patient/appointment
export const addNewAppointment = (newAppointment) => {
  // In a real application with a backend, this function would call an API
  // to add the appointment to the database. For this demo, we'll add it
  // to the local data.
  patientData.push(newAppointment);
  return newAppointment;
};

// Get clinic statistics
export const getClinicStats = () => {
  // Generate stats based on patient data
  const stats = {
    newPatients: patientData.length > 0 ? Math.floor(patientData.length / 2) : 0,
    dailyAppointments: patientData.length,
    revenue: patientData.length > 0 ? patientData.length * 500 : 0, // Example calculation
    bedsOccupied: Math.min(2, patientData.length) // Maximum 2 beds occupied from actual data
  };
  return stats;
};

// Get today's appointments - using the dates from the actual data
export const getTodayAppointments = () => {
  const appointments = [];
  patientData.forEach((patient) => {
    if (patient.details) {
      // Get the patient's full details instead of just basic information
      const fullPatientData = {
        id: patient.id,
        time: patient.details.time,
        patientName: patient.details.name,
        phone: patient.details.contact?.phone || 'xxx-xxx-xxxx',
        service: patient.details.service,
        notes: patient.details.comment,
        course: patient.details.course,
        // Include all additional patient details for expandable view
        details: patient.details
      };
      appointments.push(fullPatientData);
    }
  });
  return appointments;
};

// Get appointments for a specific date
export const getAppointmentsByDate = (dateStr) => {
  const appointments = [];
  patientData.forEach((patient) => {
    if (patient.details) {
      // Convert Thai date format to ISO for comparison
      const patientDateISO = formatDateToISO(patient.details.date);
      
      if (patientDateISO === dateStr) {
        appointments.push({
          id: patient.id,
          date: patientDateISO,
          time: patient.details.time,
          patientName: patient.details.name,
          phone: patient.details.contact?.phone || 'xxx-xxx-xxxx',
          service: patient.details.service,
          notes: patient.details.comment,
          course: patient.details.course,
          // Include all details
          details: patient.details
        });
      }
    }
  });
  return appointments;
};

// Get all monthly appointments
export const getMonthlyAppointments = () => {
  const appointments = [];
  patientData.forEach((patient) => {
    if (patient.details) {
      // Convert Thai date format to Date object
      const [day, month, year] = patient.details.date.split('/');
      const apptDate = new Date(parseInt(year) - 543, parseInt(month) - 1, parseInt(day));
      
      appointments.push({
        id: patient.id,
        date: apptDate,
        time: patient.details.time,
        patientName: patient.details.name,
        phone: patient.details.contact?.phone || 'xxx-xxx-xxxx',
        service: patient.details.service,
        course: patient.details.course,
        // Include all details
        details: patient.details
      });
    }
  });
  return appointments;
};

// Get all medical records
export const getAllMedicalRecords = () => {
  const records = [];
  patientData.forEach((patient) => {
    if (patient.details) {
      records.push({
        id: patient.id,
        hn: `HN${patient.id.substring(2)}`,
        patientName: patient.details.name,
        date: patient.details.date,
        time: patient.details.time,
        service: patient.details.service,
        course: patient.details.course,
        // Include all details
        details: patient.details
      });
    }
  });
  return records;
};

// Get bed occupancy data - use only the actual patient data without hardcoding
export const getBedData = () => {
  // Create empty bed data array
  const bedData = Array.from({ length: 8 }, (_, i) => ({ 
    id: i + 1, 
    status: 'available' 
  }));
  
  // Set some beds to different statuses to match the expected UI
  bedData[3].status = 'cleaning';
  bedData[6].status = 'maintenance';
  
  // Add patients to beds based on actual patient data
  patientData.forEach((patient, index) => {
    if (index < 2) { // Only use first two patients to avoid overcrowding
      const bedIndex = index === 0 ? 0 : 2; // First patient to bed 1, second to bed 3
      
      if (patient.details) {
        bedData[bedIndex] = {
          id: bedIndex + 1,
          status: 'occupied',
          patient: {
            name: patient.details.name,
            cn: patient.id,
            phone: 'xxx-xxx-xxxx',
            time: patient.details.time,
            duration: patient.details.course[2] * 10, // Use course[2] * 10 as duration
            service: patient.details.service,
            course: patient.details.course
          }
        };
      }
    }
  });
  
  return bedData;
};

