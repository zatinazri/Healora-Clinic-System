
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
        DOCTOR_SCHEDULES: "healora_doctor_schedules",
        SUPPORT_REQUESTS: "healora_support_requests",
        DATA_VERSION: "healora_initial_data_version"
    };

    const DATA_VERSION = "4";

    // =====================================
    // 2. BASIC STORAGE FUNCTIONS
    // =====================================

    function getData(key) {
        try {
            const data = localStorage.getItem(key);

            if (!data) return [];

            const parsed = JSON.parse(data);

            return Array.isArray(parsed) ? parsed : [];

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
        const random = Math.random()
            .toString(36)
            .substring(2, 9);

        return `${prefix}-${Date.now()}-${random}`;
    }

    function getCurrentDate() {
        const date = new Date();

        return [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0")
        ].join("-");
    }

    // =====================================
    // 3. DEFAULT DOCTORS
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
    // 5. PATIENT RECORDS
    // TOTAL: 30 PATIENTS
    // =====================================

    function getInitialPatients() {
        return [
            {
                id: "PAT-001",
                userId: "",
                name: "Aiman Hakimi",
                fullName: "Aiman Hakimi",
                email: "aiman.hakimi88@gmail.com",
                phone: "012-1112233",
                age: 28,
                gender: "Male",
                status: "Active",
                createdAt: "2026-07-01",
                registrationDate: "2026-07-01"
            },
            {
                id: "PAT-002",
                userId: "",
                name: "Nur Sarah Iman",
                fullName: "Nur Sarah Iman",
                email: "sarah.iman24@gmail.com",
                phone: "013-2223344",
                age: 24,
                gender: "Female",
                status: "Active",
                createdAt: "2026-07-05",
                registrationDate: "2026-07-05"
            },
            {
                id: "PAT-003",
                userId: "",
                name: "Daniel Lee",
                fullName: "Daniel Lee",
                email: "daniel.lee88@gmail.com",
                phone: "014-3334455",
                age: 35,
                gender: "Male",
                status: "Active",
                createdAt: "2026-07-10",
                registrationDate: "2026-07-10"
            },
            {
                id: "PAT-004",
                userId: "",
                name: "Siti Nur Amirah",
                fullName: "Siti Nur Amirah",
                email: "amirah.siti@gmail.com",
                phone: "016-4445566",
                age: 31,
                gender: "Female",
                status: "Active",
                createdAt: "2026-08-01",
                registrationDate: "2026-08-01"
            },
            {
                id: "PAT-005",
                userId: "",
                name: "Muhammad Firdaus",
                fullName: "Muhammad Firdaus",
                email: "firdaus.m92@gmail.com",
                phone: "017-5556677",
                age: 42,
                gender: "Male",
                status: "Active",
                createdAt: "2026-08-05",
                registrationDate: "2026-08-05"
            },
            {
                id: "PAT-006",
                userId: "",
                name: "Priya Nair",
                fullName: "Priya Nair",
                email: "priyanair29@gmail.com",
                phone: "018-6667788",
                age: 29,
                gender: "Female",
                status: "Active",
                createdAt: "2026-08-10",
                registrationDate: "2026-08-10"
            },
            {
                id: "PAT-007",
                userId: "",
                name: "Amirul Danish",
                fullName: "Amirul Danish",
                email: "amirul.danish@gmail.com",
                phone: "019-7778899",
                age: 26,
                gender: "Male",
                status: "Active",
                createdAt: "2026-08-15",
                registrationDate: "2026-08-15"
            },
            {
                id: "PAT-008",
                userId: "",
                name: "Lim Mei Xin",
                fullName: "Lim Mei Xin",
                email: "meixin.lim@gmail.com",
                phone: "011-8889900",
                age: 38,
                gender: "Female",
                status: "Active",
                createdAt: "2026-09-01",
                registrationDate: "2026-09-01"
            },
            {
                id: "PAT-009",
                userId: "",
                name: "Farhan Azmi",
                fullName: "Farhan Azmi",
                email: "farhan.azmi@gmail.com",
                phone: "012-9990011",
                age: 33,
                gender: "Male",
                status: "Active",
                createdAt: "2026-09-05",
                registrationDate: "2026-09-05"
            },
            {
                id: "PAT-010",
                userId: "",
                name: "Nurul Huda",
                fullName: "Nurul Huda",
                email: "nurul.huda27@gmail.com",
                phone: "013-1011121",
                age: 27,
                gender: "Female",
                status: "Active",
                createdAt: "2026-09-10",
                registrationDate: "2026-09-10"
            },
            {
                id: "PAT-011",
                userId: "",
                name: "Muhammad Danish",
                fullName: "Muhammad Danish",
                email: "danish.muhammad@gmail.com",
                phone: "014-1213141",
                age: 30,
                gender: "Male",
                status: "Active",
                createdAt: "2026-09-15",
                registrationDate: "2026-09-15"
            },
            {
                id: "PAT-012",
                userId: "",
                name: "Alya Sofea",
                fullName: "Alya Sofea",
                email: "alya.sofea26@gmail.com",
                phone: "016-1516171",
                age: 26,
                gender: "Female",
                status: "Active",
                createdAt: "2026-10-01",
                registrationDate: "2026-10-01"
            },
            {
                id: "PAT-013",
                userId: "",
                name: "Jason Wong",
                fullName: "Jason Wong",
                email: "jason.wong90@gmail.com",
                phone: "017-1819202",
                age: 36,
                gender: "Male",
                status: "Active",
                createdAt: "2026-10-04",
                registrationDate: "2026-10-04"
            },
            {
                id: "PAT-014",
                userId: "",
                name: "Nur Fatimah",
                fullName: "Nur Fatimah",
                email: "fatimah.nur@gmail.com",
                phone: "018-2122232",
                age: 32,
                gender: "Female",
                status: "Active",
                createdAt: "2026-10-08",
                registrationDate: "2026-10-08"
            },
            {
                id: "PAT-015",
                userId: "",
                name: "Arif Hakim",
                fullName: "Arif Hakim",
                email: "arif.hakim95@gmail.com",
                phone: "019-2425262",
                age: 31,
                gender: "Male",
                status: "Active",
                createdAt: "2026-10-12",
                registrationDate: "2026-10-12"
            },
            {
                id: "PAT-016",
                userId: "",
                name: "Kavitha Devi",
                fullName: "Kavitha Devi",
                email: "kavitha.devi@gmail.com",
                phone: "011-2728293",
                age: 34,
                gender: "Female",
                status: "Active",
                createdAt: "2026-10-15",
                registrationDate: "2026-10-15"
            },
            {
                id: "PAT-017",
                userId: "",
                name: "Syafiq Rahman",
                fullName: "Syafiq Rahman",
                email: "syafiq.rahman@gmail.com",
                phone: "012-3031323",
                age: 29,
                gender: "Male",
                status: "Active",
                createdAt: "2026-10-18",
                registrationDate: "2026-10-18"
            },
            {
                id: "PAT-018",
                userId: "",
                name: "Chloe Tan",
                fullName: "Chloe Tan",
                email: "chloe.tan94@gmail.com",
                phone: "013-3334353",
                age: 32,
                gender: "Female",
                status: "Active",
                createdAt: "2026-10-20",
                registrationDate: "2026-10-20"
            },
            {
                id: "PAT-019",
                userId: "",
                name: "Haziq Iskandar",
                fullName: "Haziq Iskandar",
                email: "haziq.iskandar@gmail.com",
                phone: "014-3637383",
                age: 27,
                gender: "Male",
                status: "Active",
                createdAt: "2026-10-23",
                registrationDate: "2026-10-23"
            },
            {
                id: "PAT-020",
                userId: "",
                name: "Puteri Balqis",
                fullName: "Puteri Balqis",
                email: "puteri.balqis@gmail.com",
                phone: "016-3940414",
                age: 25,
                gender: "Female",
                status: "Active",
                createdAt: "2026-10-25",
                registrationDate: "2026-10-25"
            },
            {
                id: "PAT-021",
                userId: "",
                name: "Adam Firash",
                fullName: "Adam Firash",
                email: "adam.firash@gmail.com",
                phone: "017-4243444",
                age: 30,
                gender: "Male",
                status: "Active",
                createdAt: "2026-10-27",
                registrationDate: "2026-10-27"
            },
            {
                id: "PAT-022",
                userId: "",
                name: "Nadia Maisarah",
                fullName: "Nadia Maisarah",
                email: "nadia.maisarah@gmail.com",
                phone: "018-4546474",
                age: 28,
                gender: "Female",
                status: "Active",
                createdAt: "2026-10-29",
                registrationDate: "2026-10-29"
            },
            {
                id: "PAT-023",
                userId: "",
                name: "Tan Wei Jian",
                fullName: "Tan Wei Jian",
                email: "wei.jian.tan@gmail.com",
                phone: "019-4849505",
                age: 39,
                gender: "Male",
                status: "Active",
                createdAt: "2026-11-01",
                registrationDate: "2026-11-01"
            },
            {
                id: "PAT-024",
                userId: "",
                name: "Aisyah Humaira",
                fullName: "Aisyah Humaira",
                email: "aisyah.humaira@gmail.com",
                phone: "011-5152535",
                age: 23,
                gender: "Female",
                status: "Active",
                createdAt: "2026-11-03",
                registrationDate: "2026-11-03"
            },
            {
                id: "PAT-025",
                userId: "",
                name: "Ravi Kumar",
                fullName: "Ravi Kumar",
                email: "ravi.kumar91@gmail.com",
                phone: "012-5455565",
                age: 35,
                gender: "Male",
                status: "Active",
                createdAt: "2026-11-05",
                registrationDate: "2026-11-05"
            },
            {
                id: "PAT-026",
                userId: "",
                name: "Hannah Lee",
                fullName: "Hannah Lee",
                email: "hannah.lee@gmail.com",
                phone: "013-5758595",
                age: 27,
                gender: "Female",
                status: "Active",
                createdAt: "2026-11-07",
                registrationDate: "2026-11-07"
            },
            {
                id: "PAT-027",
                userId: "",
                name: "Faris Zulkifli",
                fullName: "Faris Zulkifli",
                email: "faris.zulkifli@gmail.com",
                phone: "014-6061626",
                age: 33,
                gender: "Male",
                status: "Active",
                createdAt: "2026-11-09",
                registrationDate: "2026-11-09"
            },
            {
                id: "PAT-028",
                userId: "",
                name: "Sofea Natasha",
                fullName: "Sofea Natasha",
                email: "sofea.natasha@gmail.com",
                phone: "016-6364656",
                age: 26,
                gender: "Female",
                status: "Active",
                createdAt: "2026-11-11",
                registrationDate: "2026-11-11"
            },
            {
                id: "PAT-029",
                userId: "",
                name: "Marcus Lim",
                fullName: "Marcus Lim",
                email: "marcus.lim@gmail.com",
                phone: "017-6667686",
                age: 41,
                gender: "Male",
                status: "Active",
                createdAt: "2026-11-13",
                registrationDate: "2026-11-13"
            },
            {
                id: "PAT-030",
                userId: "",
                name: "Nur Iman Syuhada",
                fullName: "Nur Iman Syuhada",
                email: "iman.syuhada@gmail.com",
                phone: "018-6970717",
                age: 29,
                gender: "Female",
                status: "Active",
                createdAt: "2026-11-15",
                registrationDate: "2026-11-15"
            }
        ];
    }

    // =====================================
    // 6. APPOINTMENT RECORDS
    // TOTAL: 30 APPOINTMENTS
    // JULY 2026 - JANUARY 2027
    // =====================================

    function getInitialAppointments() {

        const records = [

            // JULY 2026 - 3 APPOINTMENTS

            ["2026-07-08", "09:00 AM", 1, "General Consultation", "DOC-001", "Fever or Flu Symptoms", "Completed"],
            ["2026-07-16", "10:30 AM", 2, "Women's Health", "DOC-004", "Follow-up Consultation", "Completed"],
            ["2026-07-25", "02:00 PM", 3, "Health Screening", "DOC-005", "General Check-up", "Cancelled"],

            // AUGUST 2026 - 4 APPOINTMENTS

            ["2026-08-04", "09:30 AM", 4, "General Consultation", "DOC-002", "Headache or Migraine", "Completed"],
            ["2026-08-11", "11:00 AM", 5, "Cardiology Consultation", "DOC-006", "Follow-up Consultation", "Completed"],
            ["2026-08-19", "01:00 PM", 6, "Dermatology Consultation", "DOC-007", "Skin Problems", "Completed"],
            ["2026-08-27", "10:00 AM", 7, "Vaccination", "DOC-003", "Other", "Cancelled"],

            // SEPTEMBER 2026 - 4 APPOINTMENTS

            ["2026-09-03", "09:00 AM", 8, "General Consultation", "DOC-001", "Stomach Pain", "Completed"],
            ["2026-09-09", "10:30 AM", 9, "Women's Health", "DOC-008", "Follow-up Consultation", "Completed"],
            ["2026-09-15", "11:00 AM", 10, "Health Screening", "DOC-005", "General Check-up", "Completed"],
            ["2026-09-21", "02:00 PM", 11, "Paediatric Consultation", "DOC-003", "General Check-up", "Completed"],

            // OCTOBER 2026 - 4 APPOINTMENTS

            ["2026-10-03", "09:00 AM", 12, "Cardiology Consultation", "DOC-006", "Follow-up Consultation", "Completed"],
            ["2026-10-09", "10:00 AM", 13, "Dermatology Consultation", "DOC-007", "Skin Problems", "Completed"],
            ["2026-10-15", "11:30 AM", 14, "General Consultation", "DOC-001", "Fever or Flu Symptoms", "Completed"],
            ["2026-10-22", "01:00 PM", 15, "Women's Health", "DOC-004", "Follow-up Consultation", "Completed"],

            // NOVEMBER 2026 - 5 APPOINTMENTS

            ["2026-11-04", "10:00 AM", 16, "General Consultation", "DOC-001", "Fever or Flu Symptoms", "Completed"],
            ["2026-11-07", "11:30 AM", 17, "Paediatric Consultation", "DOC-003", "General Check-up", "Completed"],
            ["2026-11-12", "01:00 PM", 18, "General Consultation", "DOC-002", "Stomach Pain", "Cancelled"],
            ["2026-11-17", "03:00 PM", 19, "Health Screening", "DOC-005", "Medication Review", "Completed"],
            ["2026-11-25", "09:30 AM", 20, "General Consultation", "DOC-002", "Cough or Sore Throat", "Confirmed"],

            // DECEMBER 2026 - 5 APPOINTMENTS

            ["2026-12-02", "09:00 AM", 21, "General Consultation", "DOC-001", "Fever or Flu Symptoms", "Confirmed"],
            ["2026-12-08", "10:00 AM", 22, "Women's Health", "DOC-004", "Follow-up Consultation", "Confirmed"],
            ["2026-12-14", "11:00 AM", 23, "Cardiology Consultation", "DOC-006", "Follow-up Consultation", "Pending"],
            ["2026-12-20", "02:00 PM", 24, "Dermatology Consultation", "DOC-007", "Skin Problems", "Confirmed"],
            ["2026-12-28", "09:30 AM", 25, "Health Screening", "DOC-005", "General Check-up", "Pending"],

            // JANUARY 2027 - 5 APPOINTMENTS

            ["2027-01-05", "09:00 AM", 26, "General Consultation", "DOC-001", "General Check-up", "Confirmed"],
            ["2027-01-12", "10:30 AM", 27, "Cardiology Consultation", "DOC-006", "Follow-up Consultation", "Pending"],
            ["2027-01-19", "01:00 PM", 28, "Women's Health", "DOC-008", "Follow-up Consultation", "Confirmed"],
            ["2027-01-26", "02:30 PM", 29, "Dermatology Consultation", "DOC-007", "Skin Problems", "Pending"],
            ["2027-01-30", "11:00 AM", 30, "Vaccination", "DOC-003", "Other", "Confirmed"]
        ];

        const patients = getInitialPatients();
        const doctors = getDefaultDoctors();

        return records.map((record, index) => {

            const [
                date,
                time,
                patientNumber,
                service,
                doctorId,
                reason,
                status
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

    // =====================================
    // 7. DOCTOR SCHEDULES
    // =====================================

    function getInitialDoctorSchedules() {
        return [
            {
                id: "SCH-001",
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
                id: "SCH-002",
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
                id: "SCH-003",
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
                id: "SCH-004",
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
                id: "SCH-005",
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
                id: "SCH-006",
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
                id: "SCH-007",
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
                id: "SCH-008",
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
    // 8. SUPPORT REQUESTS
    // =====================================

    function getInitialSupportRequests() {
        return [
            {
                id: "SUP-001",
                patientId: "PAT-001",
                patientName: "Aiman Hakimi",
                patientEmail: "aiman.hakimi88@gmail.com",
                category: "Appointment",
                subject: "Appointment Confirmation",
                message: "I would like to check the confirmation status of my upcoming appointment.",
                status: "Resolved",
                submittedAt: "2026-11-15T09:30:00"
            },
            {
                id: "SUP-002",
                patientId: "PAT-002",
                patientName: "Nur Sarah Iman",
                patientEmail: "sarah.iman24@gmail.com",
                category: "Account",
                subject: "Update Contact Information",
                message: "I need assistance updating my contact information in my patient profile.",
                status: "In Progress",
                submittedAt: "2026-11-16T11:15:00"
            },
            {
                id: "SUP-003",
                patientId: "PAT-003",
                patientName: "Daniel Lee",
                patientEmail: "daniel.lee88@gmail.com",
                category: "General Enquiry",
                subject: "Clinic Operating Hours",
                message: "May I confirm the clinic operating hours during public holidays?",
                status: "Open",
                submittedAt: "2026-11-18T14:20:00"
            }
        ];
    }

    // =====================================
    // 9. INITIAL DATA MIGRATION
    // =====================================

    function replaceInitialRecords(storageKey, initialRecords, prefix) {

        const existingRecords = getData(storageKey);

        const cleanedRecords = existingRecords.filter(record => {

            const id = String(record.id || "");
            const appointmentId = String(record.appointmentId || "");

            // Replace previous fixed patient records.
            if (
                storageKey === KEYS.PATIENTS &&
                /^PAT-\d{3}$/.test(id)
            ) {
                return false;
            }

            // Replace previous appointment records.
            if (
                storageKey === KEYS.APPOINTMENTS &&
                (
                    id.startsWith("SAMPLE-APT-") ||
                    id.startsWith("HLR-APT-") ||
                    appointmentId.startsWith("SAMPLE-APT-") ||
                    appointmentId.startsWith("HLR-APT-")
                )
            ) {
                return false;
            }

            // Replace initial schedules and support requests.
            if (prefix && id.startsWith(prefix)) {
                return false;
            }

            return true;
        });

        const updatedRecords = [
            ...cleanedRecords,
            ...initialRecords
        ];

        return saveData(storageKey, updatedRecords);
    }

    function seedInitialData() {

        const currentVersion =
            localStorage.getItem(KEYS.DATA_VERSION);

        if (currentVersion === DATA_VERSION) {
            return;
        }

        const patientsSaved = replaceInitialRecords(
            KEYS.PATIENTS,
            getInitialPatients(),
            ""
        );

        const appointmentsSaved = replaceInitialRecords(
            KEYS.APPOINTMENTS,
            getInitialAppointments(),
            ""
        );

        const schedulesSaved = replaceInitialRecords(
            KEYS.DOCTOR_SCHEDULES,
            getInitialDoctorSchedules(),
            "SCH-"
        );

        const supportSaved = replaceInitialRecords(
            KEYS.SUPPORT_REQUESTS,
            getInitialSupportRequests(),
            "SUP-"
        );

        if (
            patientsSaved &&
            appointmentsSaved &&
            schedulesSaved &&
            supportSaved
        ) {
            localStorage.setItem(
                KEYS.DATA_VERSION,
                DATA_VERSION
            );

            console.log(
                "Healora Clinic initial records updated successfully."
            );

        } else {
            console.error(
                "Unable to update Healora Clinic records."
            );
        }
    }

    // =====================================
    // 10. INITIALIZE DATA
    // =====================================

    function initializeData() {

        ensureAdminAccount();

        const doctors = getData(KEYS.DOCTORS);

        getDefaultDoctors().forEach(defaultDoctor => {

            const exists = doctors.some(
                doctor => doctor.id === defaultDoctor.id
            );

            if (!exists) {
                doctors.push(defaultDoctor);
            }
        });

        saveData(KEYS.DOCTORS, doctors);

        const services = getData(KEYS.SERVICES);

        getDefaultServices().forEach(defaultService => {

            const exists = services.some(
                service => service.id === defaultService.id
            );

            if (!exists) {
                services.push(defaultService);
            }
        });

        saveData(KEYS.SERVICES, services);

        seedInitialData();

        console.log(
            "Healora Clinic initialized successfully."
        );
    }

    // =====================================
    // 11. USER MANAGEMENT
    // =====================================

    function getUsers() {
        return getData(KEYS.USERS);
    }

    function findUserByEmail(email) {

        const normalizedEmail = String(email || "")
            .trim()
            .toLowerCase();

        return getUsers().find(user =>
            String(user.email || "")
                .trim()
                .toLowerCase() === normalizedEmail
        ) || null;
    }

    function ensureAdminAccount() {

        const users = getUsers();

        const adminEmail = "admin@healora.com";

        const existingAdmin = users.find(user =>
            String(user.email || "")
                .trim()
                .toLowerCase() === adminEmail
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

        return saveData(KEYS.USERS, users);
    }

    // =====================================
    // 12. USER REGISTRATION
    // =====================================

    function registerUser(userData) {

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

        if (findUserByEmail(email)) {
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

        const users = getUsers();

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
    // 13. LOGIN AND SESSION MANAGEMENT
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

            console.error(
                "Unable to save login session:",
                error
            );

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

            const currentUser =
                sessionStorage.getItem(KEYS.CURRENT_USER);

            if (!currentUser) return null;

            const user = JSON.parse(currentUser);

            if (!user || !user.id) return null;

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

            console.error(
                "Unable to read login session:",
                error
            );

            return null;
        }
    }

    function logout() {
        sessionStorage.removeItem(KEYS.CURRENT_USER);
    }

    // =====================================
    // 14. PATIENT MANAGEMENT
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

            fullName: patientData.fullName || patientData.name || "",

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
    // 15. DOCTOR MANAGEMENT
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
    // 16. CLINIC SERVICES
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

    function deleteService(id) {

        const services = getServices().filter(
            service => service.id !== id
        );

        return saveData(KEYS.SERVICES, services);
    }

    // =====================================
    // 17. APPOINTMENT MANAGEMENT
    // =====================================

    function getAppointments() {
        return getData(KEYS.APPOINTMENTS);
    }

    function addAppointment(appointmentData) {

        const appointments = getAppointments();

        const appointmentId = generateId("APT");

        const newAppointment = {

            id: appointmentId,

            appointmentId,

            patientId: appointmentData.patientId || "",

            userId: appointmentData.userId || "",

            patientName: appointmentData.patientName || "",

            patientEmail: appointmentData.patientEmail || "",

            gender: appointmentData.gender || "",

            doctorId: appointmentData.doctorId || "",

            doctorName: appointmentData.doctorName || "",

            service: appointmentData.service || "",

            serviceName: appointmentData.serviceName || appointmentData.service || "",

            date: appointmentData.date || "",

            appointmentDate: appointmentData.date || "",

            time: appointmentData.time || "",

            appointmentTime: appointmentData.time || "",

            slot: appointmentData.time || "",

            reason: appointmentData.reason || "",

            visitReason: appointmentData.reason || "",

            notes: appointmentData.notes || "",

            status: "Pending",

            createdAt: getCurrentDate(),

            bookingDate: getCurrentDate()
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
            appointment =>
                appointment.id === id ||
                appointment.appointmentId === id
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
            appointment =>
                appointment.id !== id &&
                appointment.appointmentId !== id
        );

        return saveData(KEYS.APPOINTMENTS, appointments);
    }

    // =====================================
    // 18. DASHBOARD STATISTICS
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
                appointment =>
                    appointment.status === "Pending"
            ).length,

            confirmedAppointments: appointments.filter(
                appointment =>
                    appointment.status === "Confirmed"
            ).length,

            completedAppointments: appointments.filter(
                appointment =>
                    appointment.status === "Completed"
            ).length,

            cancelledAppointments: appointments.filter(
                appointment =>
                    appointment.status === "Cancelled" ||
                    appointment.status === "Canceled"
            ).length
        };
    }

    // =====================================
    // 19. INITIALIZE SYSTEM
    // =====================================

    initializeData();

    // =====================================
    // 20. PUBLIC FUNCTIONS
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
        deleteService,

        getAppointments,
        addAppointment,
        updateAppointment,
        deleteAppointment,

        getStatistics

    };

})();

// =====================================
// 21. MAKE STORAGE AVAILABLE GLOBALLY
// =====================================

window.HealoraStorage = HealoraStorage;
