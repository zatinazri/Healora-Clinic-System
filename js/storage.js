function getInitialAppointments() {

    const records = [

        // JULY 2026 - 2 APPOINTMENTS
        ["2026-07-08", "09:00 AM", 1, "General Consultation", "DOC-001", "Fever or Flu Symptoms", "Completed"],
        ["2026-07-16", "10:30 AM", 2, "Women's Health", "DOC-004", "Follow-up Consultation", "Completed"],

        // AUGUST 2026 - 3 APPOINTMENTS
        ["2026-08-04", "09:30 AM", 3, "General Consultation", "DOC-002", "Headache or Migraine", "Completed"],
        ["2026-08-11", "11:00 AM", 4, "Cardiology Consultation", "DOC-006", "Follow-up Consultation", "Completed"],
        ["2026-08-19", "01:00 PM", 5, "Dermatology Consultation", "DOC-007", "Skin Problems", "Completed"],

        // SEPTEMBER 2026 - 3 APPOINTMENTS
        ["2026-09-03", "09:00 AM", 6, "General Consultation", "DOC-001", "Stomach Pain", "Completed"],
        ["2026-09-09", "10:30 AM", 7, "Women's Health", "DOC-008", "Follow-up Consultation", "Completed"],
        ["2026-09-15", "11:00 AM", 8, "Health Screening", "DOC-005", "General Check-up", "Completed"],

        // OCTOBER 2026 - 3 APPOINTMENTS
        ["2026-10-03", "09:00 AM", 9, "Cardiology Consultation", "DOC-006", "Follow-up Consultation", "Completed"],
        ["2026-10-09", "10:00 AM", 10, "Dermatology Consultation", "DOC-007", "Skin Problems", "Completed"],
        ["2026-10-15", "11:30 AM", 11, "General Consultation", "DOC-001", "Fever or Flu Symptoms", "Completed"],

        // NOVEMBER 2026 - 4 APPOINTMENTS
        ["2026-11-04", "10:00 AM", 12, "General Consultation", "DOC-001", "Fever or Flu Symptoms", "Completed"],
        ["2026-11-07", "11:30 AM", 13, "Paediatric Consultation", "DOC-003", "General Check-up", "Completed"],
        ["2026-11-12", "01:00 PM", 14, "General Consultation", "DOC-002", "Stomach Pain", "Cancelled"],
        ["2026-11-25", "09:30 AM", 15, "General Consultation", "DOC-002", "Cough or Sore Throat", "Confirmed"],

        // DECEMBER 2026 - 5 APPOINTMENTS
        ["2026-12-02", "09:00 AM", 16, "General Consultation", "DOC-001", "Fever or Flu Symptoms", "Confirmed"],
        ["2026-12-08", "10:00 AM", 17, "Women's Health", "DOC-004", "Follow-up Consultation", "Confirmed"],
        ["2026-12-14", "11:00 AM", 18, "Cardiology Consultation", "DOC-006", "Follow-up Consultation", "Pending"],
        ["2026-12-20", "02:00 PM", 19, "Dermatology Consultation", "DOC-007", "Skin Problems", "Confirmed"],
        ["2026-12-28", "09:30 AM", 20, "Health Screening", "DOC-005", "General Check-up", "Pending"]
    ];

    const patients = getInitialPatients();
    const doctors = getDefaultDoctors();

    return records.map((record, index) => {

        const [
            date, time, patientNumber, service,
            doctorId, reason, status
        ] = record;

        const patient = patients[patientNumber - 1];

        const doctor = doctors.find(
            item => item.id === doctorId
        );

        const year = date.substring(0, 4);

        const appointmentId =
            `HLR-APT-${year}-${String(index + 1).padStart(3, "0")}`;

        return {
            id: appointmentId,
            appointmentId,
            patientId: patient.id,
            userId: "",
            patientName: patient.name,
            patientEmail: patient.email,
            gender: patient.gender,
            service,
            serviceName: service,
            doctorId,
            doctorName: doctor.name,
            doctor: doctor.name,
            date,
            appointmentDate: date,
            time,
            appointmentTime: time,
            slot: time,
            reason,
            visitReason: reason,
            notes: "Appointment recorded in Healora Clinic system.",
            status,
            createdAt: date,
            bookingDate: date
        };
    });
}
