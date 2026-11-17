
/* =========================================
   HEALORA CLINIC
   DATA MANAGEMENT
   File: data.js
========================================= */

const HealoraData = (() => {

    // =====================================
    // 1. INITIALIZE DATA
    // =====================================

    function initializeData() {

        // Do not create sample patients.
        // Do not create sample appointments.
        // Patient and appointment records will
        // only be added through the system.

        console.log("Healora Clinic data management ready.");
    }

    // =====================================
    // 2. GET PATIENT DATA
    // =====================================

    function getPatients() {
        return HealoraStorage.getPatients();
    }

    // =====================================
    // 3. GET APPOINTMENT DATA
    // =====================================

    function getAppointments() {
        return HealoraStorage.getAppointments();
    }

    // =====================================
    // 4. PUBLIC FUNCTIONS
    // =====================================

    return {
        initializeData,
        getPatients,
        getAppointments
    };

})();

// Initialize data management
HealoraData.initializeData();

window.HealoraData = HealoraData;
