
/* =========================================
   HEALORA CLINIC
   LOCAL STORAGE MANAGEMENT
   File: storage.js
========================================= */

const HealoraStorage = (() => {

    // =====================================
    // 1. STORAGE KEYS
    // =====================================

    const KEYS = {
        USERS: "healora_users",
        PATIENTS: "healora_patients",
        DOCTORS: "healora_doctors",
        APPOINTMENTS: "healora_appointments",
        SERVICES: "healora_services",
        CURRENT_USER: "healora_current_user",
        DATA_CLEANED: "healora_demo_data_cleaned",
        DOCTOR_SCHEDULES: "healora_doctor_schedules",
        SUPPORT_REQUESTS: "healora_support_requests",
        SAMPLE_DATA_SEEDED: "healora_sample_data_seeded_v1"
    };

    // =====================================
    // 2. BASIC STORAGE FUNCTIONS
    // =====================================

    function getData(key) {
        try {
            const data = localStorage.getItem(key);

            if (!data) return [];

            const parsedData = JSON.parse(data);

            return Array.isArray(parsedData) ? parsedData : [];

        } catch (error) {
            console.error("Unable to read storage:", error);
            return [];
        }
    }

    function saveData(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;

        } catch (error) {
            console.error("Unable to save storage:", error);
            return false;
        }
    }

    function generateId(prefix = "HLR") {
        const random = Math.random().toString(36).substring(2, 9);
        return `${prefix}-${Date.now()}-${random}`;
    }

    function getCurrentDate() {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");

        return `${year}-${month}-${day}`;
    }

    // =====================================
    // 3. DEFAULT DOCTOR DATA
    // =====================================

    function getDefaultDoctors() {
        return [
            {
                id: "DOC-001",
                name: "Dr. Nur Aisyah Hassan",
                specialty: "General Practitioner",
                email: "aisyah@healora.com",
                phone: "012-3456789",
                status: "Available"
            },
            {
                id: "DOC-002",
                name: "Dr. Muhammad Amir Hakim",
                specialty: "Family Medicine",
                email: "amir@healora.com",
                phone: "012-4567890",
                status: "Available"
            },
            {
                id: "DOC-003",
                name: "Dr. Siti Hajar Abdullah",
                specialty: "Paediatric Care",
                email: "hajar@healora.com",
                phone: "012-5678901",
                status: "Available"
            },
            {
                id: "DOC-004",
                name: "Dr. Nurul Izzah Rahman",
                specialty: "Women's Health",
                email: "izzah@healora.com",
                phone: "012-6789012",
                status: "Available"
            },
            {
                id: "DOC-005",
                name: "Dr. Daniel Tan Wei Ming",
                specialty: "General Practitioner",
                email: "daniel@healora.com",
                phone: "012-7890123",
                status: "Available"
            },
            {
                id: "DOC-006",
                name: "Dr. Lim Jia Hui",
                specialty: "Cardiology",
                email: "jiahui@healora.com",
                phone: "012-8901234",
                status: "Available"
            },
            {
                id: "DOC-007",
                name: "Dr. Kavitha Raj",
                specialty: "Dermatology",
                email: "kavitha@healora.com",
                phone: "012-9012345",
                status: "Available"
            },
            {
                id: "DOC-008",
                name: "Dr. Farah Nadia Ismail",
                specialty: "Obstetrics & Gynaecology",
                email: "farah@healora.com",
                phone: "012-9123456",
                status: "Available"
            }
        ];
    }

    // =====================================
    // 4. DEFAULT CLINIC SERVICES
    // =====================================

    function getDefaultServices() {
        return [
            {
                id: "SRV-001",
                name: "General Consultation",
                description: "General medical consultation and assessment.",
                duration: 30,
                price: 50,
                doctorIds: ["DOC-001", "DOC-002", "DOC-005"],
                status: "Active"
            },
            {
                id: "SRV-002",
                name: "Health Screening",
                description: "Routine health checks and screening.",
                duration: 45,
                price: 100,
                doctorIds: ["DOC-001", "DOC-002", "DOC-005"],
                status: "Active"
            },
            {
                id: "SRV-003",
                name: "Vaccination",
                description: "Vaccination services and consultation.",
                duration: 20,
                price: 80,
                doctorIds: ["DOC-001", "DOC-002", "DOC-003"],
                status: "Active"
            },
            {
                id: "SRV-004",
                name: "Women's Health",
                description: "Women's healthcare consultation.",
                duration: 40,
                price: 120,
                doctorIds: ["DOC-004", "DOC-008"],
                status: "Active"
            },
            {
                id: "SRV-005",
                name: "Paediatric Consultation",
                description: "Medical consultation for children.",
                duration: 30,
                price: 70,
                doctorIds: ["DOC-003"],
                status: "Active"
            },
            {
                id: "SRV-006",
                name: "Cardiology Consultation",
                description: "Heart health assessment and consultation.",
                duration: 45,
                price: 150,
                doctorIds: ["DOC-006"],
                status: "Active"
            },
            {
                id: "SRV-007",
                name: "Dermatology Consultation",
                description: "Skin condition assessment and consultation.",
                duration: 30,
                price: 130,
                doctorIds: ["DOC-007"],
                status: "Active"
            },
            {
                id: "SRV-008",
                name: "Chronic Disease Management",
                description: "Management and monitoring of chronic health conditions.",
                duration: 45,
                price: 120,
                doctorIds: ["DOC-001", "DOC-002", "DOC-006"],
                status: "Active"
            },
            {
                id: "SRV-009",
                name: "Minor Injury & Wound Care",
                description: "Initial treatment for minor injuries and wound care.",
                duration: 30,
                price: 90,
                doctorIds: ["DOC-001", "DOC-002", "DOC-005"],
                status: "Active"
            }
        ];
    }

    // =====================================
    // 5. USER MANAGEMENT
    // =====================================

    function getUsers() {
        return getData(KEYS.USERS);
    }

    function findUserByEmail(email) {
        const normalizedEmail = String(email || "").trim().toLowerCase();

        return getUsers().find(user =>
            String(user.email || "").trim().toLowerCase() === normalizedEmail
        ) || null;
    }

    // =====================================
    // 6. ADMIN DEMO ACCOUNT
    // =====================================

    function ensureAdminAccount() {

        const users = getUsers();
        const adminEmail = "admin@healora.com";

        const existingAdmin = users.find(user =>
            String(user.email || "").trim().toLowerCase() === adminEmail
        );

        if (existingAdmin) {

            existingAdmin.role = "admin";
            existingAdmin.name =
                existingAdmin.name || "Healora Administrator";
            existingAdmin.email = adminEmail;
            existingAdmin.password = "Admin123!";
            existingAdmin.createdAt =
                existingAdmin.createdAt || getCurrentDate();

        } else {

            users.push({
                id: "USR-001",
                name: "Healora Administrator",
                email: adminEmail,
                password: "Admin123!",
                role: "admin",
                createdAt: getCurrentDate()
            });
        }

        const saved = saveData(KEYS.USERS, users);

        if (saved) {
            console.log("Admin Demo account is ready.");
        } else {
            console.error("Unable to create Admin Demo account.");
        }

        return saved;
    }

    // =====================================
    // 7. SAMPLE PATIENT DATA
    // =====================================

    function getSamplePatients() {

        return [
            {
                id: "PAT-DEMO-001",
                userId: "",
                name: "Aiman Hakimi",
                fullName: "Aiman Hakimi",
                email: "aiman.hakimi@example.com",
                phone: "012-1112233",
                age: 28,
                gender: "Male",
                status: "Active",
                createdAt: "2026-10-01",
                registrationDate: "2026-10-01"
            },
            {
                id: "PAT-DEMO-002",
                userId: "",
                name: "Nur Sarah Iman",
                fullName: "Nur Sarah Iman",
                email: "sarah.iman@example.com",
                phone: "013-2223344",
                age: 24,
                gender: "Female",
                status: "Active",
                createdAt: "2026-10-03",
                registrationDate: "2026-10-03"
            },
            {
                id: "PAT-DEMO-003",
                userId: "",
                name: "Daniel Lee",
                fullName: "Daniel Lee",
                email: "daniel.lee@example.com",
                phone: "014-3334455",
                age: 35,
                gender: "Male",
                status: "Active",
                createdAt: "2026-10-05",
                registrationDate: "2026-10-05"
            },
            {
                id: "PAT-DEMO-004",
                userId: "",
                name: "Siti Nur Amirah",
                fullName: "Siti Nur Amirah",
                email: "amirah@example.com",
                phone: "016-4445566",
                age: 31,
                gender: "Female",
                status: "Active",
                createdAt: "2026-10-08",
                registrationDate: "2026-10-08"
            },
            {
                id: "PAT-DEMO-005",
                userId: "",
                name: "Muhammad Firdaus",
                fullName: "Muhammad Firdaus",
                email: "firdaus@example.com",
                phone: "017-5556677",
                age: 42,
                gender: "Male",
                status: "Active",
                createdAt: "2026-10-10",
                registrationDate: "2026-10-10"
            },
            {
                id: "PAT-DEMO-006",
                userId: "",
                name: "Priya Nair",
                fullName: "Priya Nair",
                email: "priya.nair@example.com",
                phone: "018-6667788",
                age: 29,
                gender: "Female",
                status: "Active",
                createdAt: "2026-10-12",
                registrationDate: "2026-10-12"
            },
            {
                id: "PAT-DEMO-007",
                userId: "",
                name: "Amirul Danish",
                fullName: "Amirul Danish",
                email: "amirul.danish@example.com",
                phone: "019-7778899",
                age: 26,
                gender: "Male",
                status: "Active",
                createdAt: "2026-10-15",
                registrationDate: "2026-10-15"
            },
            {
                id: "PAT-DEMO-008",
                userId: "",
                name: "Lim Mei Xin",
                fullName: "Lim Mei Xin",
                email: "meixin@example.com",
                phone: "011-8889900",
                age: 38,
                gender: "Female",
                status: "Active",
                createdAt: "2026-10-18",
                registrationDate: "2026-10-18"
            },
            {
                id: "PAT-DEMO-009",
                userId: "",
                name: "Farhan Azmi",
                fullName: "Farhan Azmi",
                email: "farhan.azmi@example.com",
                phone: "012-9990011",
                age: 33,
                gender: "Male",
                status: "Active",
                createdAt: "2026-10-20",
                registrationDate: "2026-10-20"
            },
            {
                id: "PAT-DEMO-010",
                userId: "",
                name: "Nurul Huda",
                fullName: "Nurul Huda",
                email: "nurul.huda@example.com",
                phone: "013-1011121",
                age: 27,
                gender: "Female",
                status: "Active",
                createdAt: "2026-10-22",
                registrationDate: "2026-10-22"
            }
        ];
    }

    // =====================================
    // 8. SAMPLE APPOINTMENT DATA
    // =====================================

    function getSampleAppointments() {

        return [
            {
                id: "APT-DEMO-001",
                appointmentId: "APT-DEMO-001",
                patientId: "PAT-DEMO-001",
                userId: "",
                patientName: "Aiman Hakimi",
                patientEmail: "aiman.hakimi@example.com",
                gender: "Male",
                service: "General Consultation",
                serviceName: "General Consultation",
                doctorId: "DOC-001",
                doctorName: "Dr. Nur Aisyah Hassan",
                doctor: "Dr. Nur Aisyah Hassan",
                date: "2026-11-20",
                appointmentDate: "2026-11-20",
                time: "09:00 AM",
                appointmentTime: "09:00 AM",
                slot: "09:00 AM",
                reason: "Fever or Flu Symptoms",
                visitReason: "Fever or Flu Symptoms",
                notes: "Experiencing mild fever and flu symptoms.",
                status: "Pending",
                createdAt: "2026-11-17",
                bookingDate: "2026-11-17"
            },
            {
                id: "APT-DEMO-002",
                appointmentId: "APT-DEMO-002",
                patientId: "PAT-DEMO-002",
                userId: "",
                patientName: "Nur Sarah Iman",
                patientEmail: "sarah.iman@example.com",
                gender: "Female",
                service: "Women's Health",
                serviceName: "Women's Health",
                doctorId: "DOC-004",
                doctorName: "Dr. Nurul Izzah Rahman",
                doctor: "Dr. Nurul Izzah Rahman",
                date: "2026-11-20",
                appointmentDate: "2026-11-20",
                time: "10:00 AM",
                appointmentTime: "10:00 AM",
                slot: "10:00 AM",
                reason: "Follow-up Consultation",
                visitReason: "Follow-up Consultation",
                notes: "Routine follow-up visit.",
                status: "Confirmed",
                createdAt: "2026-11-16",
                bookingDate: "2026-11-16"
            },
            {
                id: "APT-DEMO-003",
                appointmentId: "APT-DEMO-003",
                patientId: "PAT-DEMO-003",
                userId: "",
                patientName: "Daniel Lee",
                patientEmail: "daniel.lee@example.com",
                gender: "Male",
                service: "Health Screening",
                serviceName: "Health Screening",
                doctorId: "DOC-005",
                doctorName: "Dr. Daniel Tan Wei Ming",
                doctor: "Dr. Daniel Tan Wei Ming",
                date: "2026-11-21",
                appointmentDate: "2026-11-21",
                time: "11:00 AM",
                appointmentTime: "11:00 AM",
                slot: "11:00 AM",
                reason: "General Check-up",
                visitReason: "General Check-up",
                notes: "Annual health screening.",
                status: "Pending",
                createdAt: "2026-11-18",
                bookingDate: "2026-11-18"
            },
            {
                id: "APT-DEMO-004",
                appointmentId: "APT-DEMO-004",
                patientId: "PAT-DEMO-004",
                userId: "",
                patientName: "Siti Nur Amirah",
                patientEmail: "amirah@example.com",
                gender: "Female",
                service: "General Consultation",
                serviceName: "General Consultation",
                doctorId: "DOC-002",
                doctorName: "Dr. Muhammad Amir Hakim",
                doctor: "Dr. Muhammad Amir Hakim",
                date: "2026-11-21",
                appointmentDate: "2026-11-21",
                time: "02:00 PM",
                appointmentTime: "02:00 PM",
                slot: "02:00 PM",
                reason: "Headache or Migraine",
                visitReason: "Headache or Migraine",
                notes: "Recurring headache for several days.",
                status: "Confirmed",
                createdAt: "2026-11-17",
                bookingDate: "2026-11-17"
            },
            {
                id: "APT-DEMO-005",
                appointmentId: "APT-DEMO-005",
                patientId: "PAT-DEMO-005",
                userId: "",
                patientName: "Muhammad Firdaus",
                patientEmail: "firdaus@example.com",
                gender: "Male",
                service: "Cardiology Consultation",
                serviceName: "Cardiology Consultation",
                doctorId: "DOC-006",
                doctorName: "Dr. Lim Jia Hui",
                doctor: "Dr. Lim Jia Hui",
                date: "2026-11-23",
                appointmentDate: "2026-11-23",
                time: "09:30 AM",
                appointmentTime: "09:30 AM",
                slot: "09:30 AM",
                reason: "Follow-up Consultation",
                visitReason: "Follow-up Consultation",
                notes: "Follow-up for heart health assessment.",
                status: "Confirmed",
                createdAt: "2026-11-18",
                bookingDate: "2026-11-18"
            },
            {
                id: "APT-DEMO-006",
                appointmentId: "APT-DEMO-006",
                patientId: "PAT-DEMO-006",
                userId: "",
                patientName: "Priya Nair",
                patientEmail: "priya.nair@example.com",
                gender: "Female",
                service: "Dermatology Consultation",
                serviceName: "Dermatology Consultation",
                doctorId: "DOC-007",
                doctorName: "Dr. Kavitha Raj",
                doctor: "Dr. Kavitha Raj",
                date: "2026-11-23",
                appointmentDate: "2026-11-23",
                time: "10:30 AM",
                appointmentTime: "10:30 AM",
                slot: "10:30 AM",
                reason: "Skin Problems",
                visitReason: "Skin Problems",
                notes: "Skin irritation and rash assessment.",
                status: "Pending",
                createdAt: "2026-11-18",
                bookingDate: "2026-11-18"
            },
            {
                id: "APT-DEMO-007",
                appointmentId: "APT-DEMO-007",
                patientId: "PAT-DEMO-007",
                userId: "",
                patientName: "Amirul Danish",
                patientEmail: "amirul.danish@example.com",
                gender: "Male",
                service: "General Consultation",
                serviceName: "General Consultation",
                doctorId: "DOC-001",
                doctorName: "Dr. Nur Aisyah Hassan",
                doctor: "Dr. Nur Aisyah Hassan",
                date: "2026-11-04",
                appointmentDate: "2026-11-04",
                time: "10:00 AM",
                appointmentTime: "10:00 AM",
                slot: "10:00 AM",
                reason: "Cough or Sore Throat",
                visitReason: "Cough or Sore Throat",
                notes: "Consultation for cough and sore throat.",
                status: "Completed",
                createdAt: "2026-11-02",
                bookingDate: "2026-11-02"
            },
            {
                id: "APT-DEMO-008",
                appointmentId: "APT-DEMO-008",
                patientId: "PAT-DEMO-008",
                userId: "",
                patientName: "Lim Mei Xin",
                patientEmail: "meixin@example.com",
                gender: "Female",
                service: "Paediatric Consultation",
                serviceName: "Paediatric Consultation",
                doctorId: "DOC-003",
                doctorName: "Dr. Siti Hajar Abdullah",
                doctor: "Dr. Siti Hajar Abdullah",
                date: "2026-11-07",
                appointmentDate: "2026-11-07",
                time: "11:30 AM",
                appointmentTime: "11:30 AM",
                slot: "11:30 AM",
                reason: "General Check-up",
                visitReason: "General Check-up",
                notes: "Routine child health consultation.",
                status: "Completed",
                createdAt: "2026-11-05",
                bookingDate: "2026-11-05"
            },
            {
                id: "APT-DEMO-009",
                appointmentId: "APT-DEMO-009",
                patientId: "PAT-DEMO-009",
                userId: "",
                patientName: "Farhan Azmi",
                patientEmail: "farhan.azmi@example.com",
                gender: "Male",
                service: "General Consultation",
                serviceName: "General Consultation",
                doctorId: "DOC-002",
                doctorName: "Dr. Muhammad Amir Hakim",
                doctor: "Dr. Muhammad Amir Hakim",
                date: "2026-11-10",
                appointmentDate: "2026-11-10",
                time: "01:00 PM",
                appointmentTime: "01:00 PM",
                slot: "01:00 PM",
                reason: "Stomach Pain",
                visitReason: "Stomach Pain",
                notes: "Consultation for stomach discomfort.",
                status: "Completed",
                createdAt: "2026-11-08",
                bookingDate: "2026-11-08"
            },
            {
                id: "APT-DEMO-010",
                appointmentId: "APT-DEMO-010",
                patientId: "PAT-DEMO-010",
                userId: "",
                patientName: "Nurul Huda",
                patientEmail: "nurul.huda@example.com",
                gender: "Female",
                service: "Women's Health",
                serviceName: "Women's Health",
                doctorId: "DOC-008",
                doctorName: "Dr. Farah Nadia Ismail",
                doctor: "Dr. Farah Nadia Ismail",
                date: "2026-11-12",
                appointmentDate: "2026-11-12",
                time: "02:30 PM",
                appointmentTime: "02:30 PM",
                slot: "02:30 PM",
                reason: "Follow-up Consultation",
                visitReason: "Follow-up Consultation",
                notes: "Follow-up women's health consultation.",
                status: "Completed",
                createdAt: "2026-11-09",
                bookingDate: "2026-11-09"
            },
            {
                id: "APT-DEMO-011",
                appointmentId: "APT-DEMO-011",
                patientId: "PAT-DEMO-001",
                userId: "",
                patientName: "Aiman Hakimi",
                patientEmail: "aiman.hakimi@example.com",
                gender: "Male",
                service: "Vaccination",
                serviceName: "Vaccination",
                doctorId: "DOC-003",
                doctorName: "Dr. Siti Hajar Abdullah",
                doctor: "Dr. Siti Hajar Abdullah",
                date: "2026-11-14",
                appointmentDate: "2026-11-14",
                time: "09:00 AM",
                appointmentTime: "09:00 AM",
                slot: "09:00 AM",
                reason: "Other",
                visitReason: "Other",
                notes: "Appointment cancelled by patient.",
                status: "Cancelled",
                createdAt: "2026-11-11",
                bookingDate: "2026-11-11"
            },
            {
                id: "APT-DEMO-012",
                appointmentId: "APT-DEMO-012",
                patientId: "PAT-DEMO-005",
                userId: "",
                patientName: "Muhammad Firdaus",
                patientEmail: "firdaus@example.com",
                gender: "Male",
                service: "Health Screening",
                serviceName: "Health Screening",
                doctorId: "DOC-005",
                doctorName: "Dr. Daniel Tan Wei Ming",
                doctor: "Dr. Daniel Tan Wei Ming",
                date: "2026-11-17",
                appointmentDate: "2026-11-17",
                time: "03:00 PM",
                appointmentTime: "03:00 PM",
                slot: "03:00 PM",
                reason: "Medication Review",
                visitReason: "Medication Review",
                notes: "Appointment cancelled due to schedule change.",
                status: "Cancelled",
                createdAt: "2026-11-14",
                bookingDate: "2026-11-14"
            }
        ];
    }

    // =====================================
    // 9. SAMPLE DOCTOR SCHEDULES
    // =====================================

    function getSampleDoctorSchedules() {

        return [
            {
                id: "SCH-DEMO-001",
                doctorId: "DOC-001",
                day: "Monday",
                startTime: "09:00",
                endTime: "13:00",
                room: "Room 1",
                status: "Active",
                createdAt: "2026-10-01",
                updatedAt: "2026-10-01"
            },
            {
                id: "SCH-DEMO-002",
                doctorId: "DOC-002",
                day: "Monday",
                startTime: "13:00",
                endTime: "16:30",
                room: "Room 2",
                status: "Active",
                createdAt: "2026-10-01",
                updatedAt: "2026-10-01"
            },
            {
                id: "SCH-DEMO-003",
                doctorId: "DOC-003",
                day: "Tuesday",
                startTime: "09:00",
                endTime: "13:00",
                room: "Room 3",
                status: "Active",
                createdAt: "2026-10-01",
                updatedAt: "2026-10-01"
            },
            {
                id: "SCH-DEMO-004",
                doctorId: "DOC-004",
                day: "Tuesday",
                startTime: "13:00",
                endTime: "16:30",
                room: "Room 4",
                status: "Active",
                createdAt: "2026-10-01",
                updatedAt: "2026-10-01"
            },
            {
                id: "SCH-DEMO-005",
                doctorId: "DOC-005",
                day: "Wednesday",
                startTime: "09:00",
                endTime: "13:00",
                room: "Room 1",
                status: "Active",
                createdAt: "2026-10-01",
                updatedAt: "2026-10-01"
            },
            {
                id: "SCH-DEMO-006",
                doctorId: "DOC-006",
                day: "Thursday",
                startTime: "09:00",
                endTime: "13:00",
                room: "Room 2",
                status: "Active",
                createdAt: "2026-10-01",
                updatedAt: "2026-10-01"
            },
            {
                id: "SCH-DEMO-007",
                doctorId: "DOC-007",
                day: "Friday",
                startTime: "09:00",
                endTime: "13:00",
                room: "Room 3",
                status: "Active",
                createdAt: "2026-10-01",
                updatedAt: "2026-10-01"
            },
            {
                id: "SCH-DEMO-008",
                doctorId: "DOC-008",
                day: "Friday",
                startTime: "13:00",
                endTime: "16:30",
                room: "Room 4",
                status: "Active",
                createdAt: "2026-10-01",
                updatedAt: "2026-10-01"
            }
        ];
    }

    // =====================================
    // 10. SAMPLE SUPPORT REQUESTS
    // =====================================

    function getSampleSupportRequests() {

        return [
            {
                id: "SUP-DEMO-001",
                patientId: "PAT-DEMO-001",
                patientName: "Aiman Hakimi",
                patientEmail: "aiman.hakimi@example.com",
                category: "Appointment",
                subject: "Appointment Confirmation",
                message: "I would like to check the confirmation status of my upcoming appointment.",
                status: "Resolved",
                submittedAt: "2026-11-15T09:30:00"
            },
            {
                id: "SUP-DEMO-002",
                patientId: "PAT-DEMO-002",
                patientName: "Nur Sarah Iman",
                patientEmail: "sarah.iman@example.com",
                category: "Account",
                subject: "Update Contact Information",
                message: "I need assistance updating my contact information in the patient profile.",
                status: "In Progress",
                submittedAt: "2026-11-16T11:15:00"
            },
            {
                id: "SUP-DEMO-003",
                patientId: "PAT-DEMO-003",
                patientName: "Daniel Lee",
                patientEmail: "daniel.lee@example.com",
                category: "General Enquiry",
                subject: "Clinic Operating Hours",
                message: "May I confirm the clinic operating hours during public holidays?",
                status: "Open",
                submittedAt: "2026-11-18T14:20:00"
            }
        ];
    }

    // =====================================
    // 11. SAFE SAMPLE DATA SEEDING
    // =====================================

    function addMissingRecords(storageKey, sampleRecords) {

        const existingRecords = getData(storageKey);
        const existingIds = new Set(
            existingRecords.map(record => String(record.id))
        );

        let hasChanges = false;

        sampleRecords.forEach(sampleRecord => {

            if (!existingIds.has(String(sampleRecord.id))) {
                existingRecords.push(sampleRecord);
                existingIds.add(String(sampleRecord.id));
                hasChanges = true;
            }
        });

        if (hasChanges) {
            return saveData(storageKey, existingRecords);
        }

        return true;
    }

    function seedSampleData() {

        // Do not seed the same sample data repeatedly.
        if (localStorage.getItem(KEYS.SAMPLE_DATA_SEEDED) === "true") {
            return;
        }

        const patientsSaved = addMissingRecords(
            KEYS.PATIENTS,
            getSamplePatients()
        );

        const appointmentsSaved = addMissingRecords(
            KEYS.APPOINTMENTS,
            getSampleAppointments()
        );

        const schedulesSaved = addMissingRecords(
            KEYS.DOCTOR_SCHEDULES,
            getSampleDoctorSchedules()
        );

        const supportSaved = addMissingRecords(
            KEYS.SUPPORT_REQUESTS,
            getSampleSupportRequests()
        );

        if (
            patientsSaved &&
            appointmentsSaved &&
            schedulesSaved &&
            supportSaved
        ) {
            localStorage.setItem(KEYS.SAMPLE_DATA_SEEDED, "true");
            console.log("Healora sample data has been added successfully.");
        } else {
            console.error("Some sample data could not be saved.");
        }
    }

    // =====================================
    // 12. INITIAL DATA
    // =====================================

    function initializeData() {

        // Ensure Admin Demo account exists.
        ensureAdminAccount();

        // Add default doctors without removing extra doctors.
        const defaultDoctors = getDefaultDoctors();
        const existingDoctors = getData(KEYS.DOCTORS);

        const updatedDoctors = [...existingDoctors];

        defaultDoctors.forEach(defaultDoctor => {

            const index = updatedDoctors.findIndex(
                doctor => doctor.id === defaultDoctor.id
            );

            if (index === -1) {
                updatedDoctors.push(defaultDoctor);
            } else {
                // Keep existing doctor details and admin changes.
                updatedDoctors[index] = {
                    ...defaultDoctor,
                    ...updatedDoctors[index]
                };
            }
        });

        saveData(KEYS.DOCTORS, updatedDoctors);

        // Add default services without removing admin-created services.
        const defaultServices = getDefaultServices();
        const existingServices = getData(KEYS.SERVICES);

        const updatedServices = [...existingServices];

        defaultServices.forEach(defaultService => {

            const index = updatedServices.findIndex(
                service => service.id === defaultService.id
            );

            if (index === -1) {
                updatedServices.push(defaultService);
            } else {
                // Keep existing service details and admin changes.
                updatedServices[index] = {
                    ...defaultService,
                    ...updatedServices[index]
                };
            }
        });

        saveData(KEYS.SERVICES, updatedServices);

        // Add sample records safely.
        // Existing patient and appointment records are NOT cleared.
        seedSampleData();

        console.log("Healora Clinic initialized successfully.");
    }

    // =====================================
    // 13. USER REGISTRATION
    // =====================================

    function registerUser(userData) {

        const users = getUsers();

        const name = String(
            userData.name || userData.fullName || ""
        ).trim();

        const email = String(
            userData.email || ""
        ).trim().toLowerCase();

        if (!name || !email || !userData.password) {
            return {
                success: false,
                message: "Please complete all required registration fields."
            };
        }

        const existingUser = findUserByEmail(email);

        if (existingUser) {
            return {
                success: false,
                message: "This email is already registered."
            };
        }

        const newUser = {
            id: generateId("USR"),
            name,
            email,
            password: userData.password,
            role: "patient",
            phone: userData.phone || "",
            createdAt: getCurrentDate()
        };

        users.push(newUser);

        if (!saveData(KEYS.USERS, users)) {
            return {
                success: false,
                message: "Unable to create account."
            };
        }

        const patientSaved = addPatient({
            userId: newUser.id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            status: "Active"
        });

        if (!patientSaved) {

            const updatedUsers = getUsers().filter(
                user => user.id !== newUser.id
            );

            saveData(KEYS.USERS, updatedUsers);

            return {
                success: false,
                message: "Unable to create patient record."
            };
        }

        return {
            success: true,
            message: "Account registered successfully.",
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        };
    }

    // =====================================
    // 14. LOGIN AND SESSION MANAGEMENT
    // =====================================

    function login(email, password) {

        const user = findUserByEmail(email);

        if (!user || user.password !== password) {
            return {
                success: false,
                message: "Invalid email or password."
            };
        }

        const sessionUser = {
            id: user.id,
            name: user.name || user.fullName || user.username || "Patient",
            fullName: user.name || user.fullName || user.username || "Patient",
            email: user.email,
            role: user.role,
            phone: user.phone || ""
        };

        try {

            sessionStorage.setItem(
                KEYS.CURRENT_USER,
                JSON.stringify(sessionUser)
            );

        } catch (error) {

            console.error("Unable to save login session:", error);

            return {
                success: false,
                message: "Unable to create login session."
            };
        }

        return {
            success: true,
            message: "Login successful.",
            user: sessionUser
        };
    }

    function getCurrentUser() {

        try {

            const currentUser = sessionStorage.getItem(KEYS.CURRENT_USER);

            if (!currentUser) {
                return null;
            }

            const user = JSON.parse(currentUser);

            if (!user || !user.id) {
                return null;
            }

            const name =
                user.name ||
                user.fullName ||
                user.username ||
                "Patient";

            return {
                ...user,
                name,
                fullName: name
            };

        } catch (error) {

            console.error("Unable to read login session:", error);
            return null;
        }
    }

    function logout() {
        sessionStorage.removeItem(KEYS.CURRENT_USER);
    }

    // =====================================
    // 15. PATIENT MANAGEMENT
    // =====================================

    function getPatients() {
        return getData(KEYS.PATIENTS);
    }

    function addPatient(patientData) {

        const patients = getPatients();

        const newPatient = {
            ...patientData,
            id: generateId("PAT"),
            userId: patientData.userId || "",
            name: patientData.name || patientData.fullName || "",
            email: patientData.email || "",
            phone: patientData.phone || "",
            status: patientData.status || "Active",
            createdAt: getCurrentDate()
        };

        patients.push(newPatient);

        return saveData(KEYS.PATIENTS, patients);
    }

    function updatePatient(id, updatedData) {

        const patients = getPatients();

        const index = patients.findIndex(
            patient => patient.id === id
        );

        if (index === -1) return false;

        patients[index] = {
            ...patients[index],
            ...updatedData
        };

        return saveData(KEYS.PATIENTS, patients);
    }

    function deletePatient(id) {

        const patients = getPatients().filter(
            patient => patient.id !== id
        );

        return saveData(KEYS.PATIENTS, patients);
    }

    // =====================================
    // 16. DOCTOR MANAGEMENT
    // =====================================

    function getDoctors() {
        return getData(KEYS.DOCTORS);
    }

    function addDoctor(doctorData) {

        const doctors = getDoctors();

        doctors.push({
            id: generateId("DOC"),
            ...doctorData
        });

        return saveData(KEYS.DOCTORS, doctors);
    }

    function updateDoctor(id, updatedData) {

        const doctors = getDoctors();

        const index = doctors.findIndex(
            doctor => doctor.id === id
        );

        if (index === -1) return false;

        doctors[index] = {
            ...doctors[index],
            ...updatedData
        };

        return saveData(KEYS.DOCTORS, doctors);
    }

    function deleteDoctor(id) {

        const doctors = getDoctors().filter(
            doctor => doctor.id !== id
        );

        return saveData(KEYS.DOCTORS, doctors);
    }

    // =====================================
    // 17. CLINIC SERVICES
    // =====================================

    function getServices() {
        return getData(KEYS.SERVICES);
    }

    function addService(serviceData) {

        const services = getServices();

        services.push({
            id: generateId("SRV"),
            ...serviceData
        });

        return saveData(KEYS.SERVICES, services);
    }

    function updateService(id, updatedData) {

        const services = getServices();

        const index = services.findIndex(
            service => service.id === id
        );

        if (index === -1) return false;

        services[index] = {
            ...services[index],
            ...updatedData
        };

        return saveData(KEYS.SERVICES, services);
    }

    // =====================================
    // 18. APPOINTMENT MANAGEMENT
    // =====================================

    function getAppointments() {
        return getData(KEYS.APPOINTMENTS);
    }

    function addAppointment(appointmentData) {

        const appointments = getAppointments();

        const newAppointment = {
            id: generateId("APT"),
            patientId: appointmentData.patientId || "",
            patientName: appointmentData.patientName || "",
            patientEmail: appointmentData.patientEmail || "",
            gender: appointmentData.gender || "",
            doctorId: appointmentData.doctorId || "",
            doctorName: appointmentData.doctorName || "",
            service: appointmentData.service || "",
            date: appointmentData.date || "",
            time: appointmentData.time || "",
            reason: appointmentData.reason || "",
            notes: appointmentData.notes || "",
            status: "Pending",
            createdAt: getCurrentDate()
        };

        appointments.push(newAppointment);

        if (!saveData(KEYS.APPOINTMENTS, appointments)) {
            return false;
        }

        return newAppointment;
    }

    function updateAppointment(id, updatedData) {

        const appointments = getAppointments();

        const index = appointments.findIndex(
            appointment => appointment.id === id
        );

        if (index === -1) return false;

        appointments[index] = {
            ...appointments[index],
            ...updatedData
        };

        return saveData(KEYS.APPOINTMENTS, appointments);
    }

    function deleteAppointment(id) {

        const appointments = getAppointments().filter(
            appointment => appointment.id !== id
        );

        return saveData(KEYS.APPOINTMENTS, appointments);
    }

    // =====================================
    // 19. DASHBOARD STATISTICS
    // =====================================

    function getStatistics() {

        const patients = getPatients();
        const doctors = getDoctors();
        const appointments = getAppointments();

        return {
            totalPatients: patients.length,
            totalDoctors: doctors.length,
            totalAppointments: appointments.length,

            pendingAppointments: appointments.filter(
                appointment => appointment.status === "Pending"
            ).length,

            confirmedAppointments: appointments.filter(
                appointment => appointment.status === "Confirmed"
            ).length,

            completedAppointments: appointments.filter(
                appointment => appointment.status === "Completed"
            ).length,

            cancelledAppointments: appointments.filter(
                appointment =>
                    appointment.status === "Cancelled" ||
                    appointment.status === "Canceled"
            ).length
        };
    }

    // =====================================
    // 20. INITIALIZE SYSTEM
    // =====================================

    initializeData();

    // =====================================
    // 21. PUBLIC FUNCTIONS
    // =====================================

    return {

        initializeData,

        getUsers,
        findUserByEmail,
        registerUser,

        login,
        getCurrentUser,
        logout,

        getPatients,
        addPatient,
        updatePatient,
        deletePatient,

        getDoctors,
        addDoctor,
        updateDoctor,
        deleteDoctor,

        getServices,
        addService,
        updateService,

        getAppointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,

        getStatistics
    };

})();

// Make storage functions available globally
window.HealoraStorage = HealoraStorage;
