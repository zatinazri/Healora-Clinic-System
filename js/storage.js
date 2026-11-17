
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
        DATA_CLEANED: "healora_demo_data_cleaned"
    };

    // =====================================
    // 2. BASIC STORAGE FUNCTIONS
    // =====================================

    function getData(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : [];
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
    // 4. USER MANAGEMENT
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
    // 5. ADMIN DEMO ACCOUNT
    // =====================================

    function ensureAdminAccount() {

        const users = getUsers();

        const adminEmail = "admin@healora.com";

        const existingAdmin = users.find(user =>
            String(user.email || "").trim().toLowerCase() === adminEmail
        );

        if (existingAdmin) {

            // Keep the existing account and ensure it has the admin role.
            existingAdmin.role = "admin";
            existingAdmin.name = existingAdmin.name || "Healora Administrator";
            existingAdmin.email = adminEmail;
            existingAdmin.password = "Admin123!";
            existingAdmin.createdAt = existingAdmin.createdAt || getCurrentDate();

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
    // 6. INITIAL DATA
    // =====================================

    function initializeData() {

        // Ensure Admin Demo always exists.
        ensureAdminAccount();

        // Update doctor list to exactly 8.
        const defaultDoctors = getDefaultDoctors();
        const existingDoctors = getData(KEYS.DOCTORS);

        const updatedDoctors = defaultDoctors.map(defaultDoctor => {

            const existingDoctor = existingDoctors.find(
                doctor => doctor.id === defaultDoctor.id
            );

            return existingDoctor
                ? { ...existingDoctor, ...defaultDoctor }
                : defaultDoctor;
        });

        saveData(KEYS.DOCTORS, updatedDoctors);

        // Default clinic services.
        const defaultServices = [
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

        const existingServices = getData(KEYS.SERVICES);

        const updatedServices = defaultServices.map(defaultService => {

            const existingService = existingServices.find(
                service => service.id === defaultService.id
            );

            return existingService
                ? { ...existingService, ...defaultService }
                : defaultService;
        });

        // Preserve additional services created by admin.
        existingServices.forEach(service => {

            const alreadyExists = updatedServices.some(
                item => item.id === service.id
            );

            if (!alreadyExists) {
                updatedServices.push(service);
            }
        });

        saveData(KEYS.SERVICES, updatedServices);

        // Clear old demo records only once.
        if (localStorage.getItem(KEYS.DATA_CLEANED) !== "true") {

            saveData(KEYS.PATIENTS, []);
            saveData(KEYS.APPOINTMENTS, []);

            localStorage.setItem(KEYS.DATA_CLEANED, "true");

            console.log("Old demo records cleared.");
        }

        console.log("Healora Clinic initialized successfully.");
    }

    // =====================================
    // 7. USER REGISTRATION
    // =====================================

    function registerUser(userData) {

        const users = getUsers();

        const name = String(userData.name || userData.fullName || "").trim();
        const email = String(userData.email || "").trim().toLowerCase();

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
    // 8. LOGIN AND SESSION MANAGEMENT
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
    // 9. PATIENT MANAGEMENT
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
    // 10. DOCTOR MANAGEMENT
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
    // 11. CLINIC SERVICES
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
    // 12. APPOINTMENT MANAGEMENT
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
    // 13. DASHBOARD STATISTICS
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
                appointment => appointment.status === "Cancelled"
            ).length
        };
    }

    // =====================================
    // 14. INITIALIZE SYSTEM
    // =====================================

    initializeData();

    // =====================================
    // 15. PUBLIC FUNCTIONS
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
