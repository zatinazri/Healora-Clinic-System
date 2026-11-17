
/* =========================================
   HEALORA CLINIC
   DASHBOARD MANAGEMENT
   File: dashboard.js
========================================= */

const HealoraDashboard = (() => {

    let appointmentChart = null;
    let supportMessageChart = null;

    const SUPPORT_STORAGE_KEY = "healora_support_requests";

    // =====================================
    // 1. ELEMENT HELPER
    // =====================================

    function getElement(id) {
        return document.getElementById(id);
    }

    // =====================================
    // 2. FORMAT DATE
    // =====================================

    function formatDate(dateString) {

        if (!dateString) return "-";

        const date = new Date(dateString + "T00:00:00");

        if (isNaN(date.getTime())) return "-";

        return date.toLocaleDateString("en-MY", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    }

    // =====================================
    // 3. GET CURRENT USER APPOINTMENTS
    // =====================================

    function getDashboardAppointments() {

        const appointments = HealoraStorage.getAppointments();
        const currentUser = HealoraStorage.getCurrentUser();

        if (!currentUser || currentUser.role === "admin") {
            return appointments;
        }

        const patient = HealoraStorage.getPatients().find(
            item => item.userId === currentUser.id
        );

        if (!patient) return [];

        return appointments.filter(
            appointment => appointment.patientId === patient.id
        );
    }

    // =====================================
    // 4. UPDATE STATISTIC CARDS
    // =====================================

    function updateStatistics() {

        const allStatistics = HealoraStorage.getStatistics();

        const appointments = getDashboardAppointments();

        const currentUser = HealoraStorage.getCurrentUser();

        const isAdmin = currentUser?.role === "admin";

        const totalPatients = HealoraStorage.getPatients().length;
        const totalDoctors = HealoraStorage.getDoctors().length;

        const pendingAppointments = appointments.filter(
            appointment => appointment.status === "Pending"
        ).length;

        const values = {
            totalPatients: isAdmin ? totalPatients : 1,
            totalDoctors: totalDoctors,
            totalAppointments: appointments.length,
            pendingAppointments: pendingAppointments
        };

        const elements = {
            totalPatients: getElement("totalPatients"),
            totalDoctors: getElement("totalDoctors"),
            totalAppointments: getElement("totalAppointments"),
            pendingAppointments: getElement("pendingAppointments")
        };

        Object.keys(elements).forEach(key => {

            if (elements[key]) {
                elements[key].textContent = values[key];
            }

        });

        return {
            ...allStatistics,
            ...values
        };
    }

    // =====================================
    // 5. STATUS BADGE
    // =====================================

    function getStatusBadge(status) {

        const statusClasses = {
            Pending: "badge-pending",
            Confirmed: "badge-confirmed",
            Completed: "badge-completed",
            Cancelled: "badge-cancelled"
        };

        const badgeClass = statusClasses[status] || "badge-pending";

        return `
            <span class="status-badge ${badgeClass}">
                ${status || "Pending"}
            </span>
        `;
    }

    // =====================================
    // 6. RECENT APPOINTMENTS
    // =====================================

    function renderRecentAppointments() {

        const tableBody = getElement("recentAppointments");

        if (!tableBody) return;

        const appointments = getDashboardAppointments();

        const sortedAppointments = [...appointments].sort(
            (a, b) => {

                const dateA = new Date(`${a.date}T${a.time || "00:00"}`);
                const dateB = new Date(`${b.date}T${b.time || "00:00"}`);

                return dateB - dateA;
            }
        );

        const recentAppointments = sortedAppointments.slice(0, 5);

        if (recentAppointments.length === 0) {

            tableBody.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">
                        No appointments available.
                    </td>
                </tr>
            `;

            return;
        }

        tableBody.innerHTML = recentAppointments.map(appointment => `
            <tr>
                <td>${appointment.id || "-"}</td>
                <td>${appointment.patientName || "-"}</td>
                <td>${appointment.doctorName || "-"}</td>
                <td>${appointment.service || "-"}</td>
                <td>${formatDate(appointment.date)}</td>
                <td>${getStatusBadge(appointment.status)}</td>
            </tr>
        `).join("");
    }

    // =====================================
    // 7. APPOINTMENT CHART
    // =====================================

    function renderAppointmentChart() {

        const canvas = getElement("appointmentChart");

        if (!canvas) return;

        if (typeof Chart === "undefined") {
            console.error(
                "Chart.js is not loaded. Please include Chart.js before dashboard.js."
            );
            return;
        }

        const appointments = getDashboardAppointments();

        const chartData = {
            Pending: appointments.filter(
                item => item.status === "Pending"
            ).length,

            Confirmed: appointments.filter(
                item => item.status === "Confirmed"
            ).length,

            Completed: appointments.filter(
                item => item.status === "Completed"
            ).length,

            Cancelled: appointments.filter(
                item => item.status === "Cancelled"
            ).length
        };

        if (appointmentChart) {
            appointmentChart.destroy();
        }

        appointmentChart = new Chart(canvas, {

            type: "doughnut",

            data: {
                labels: [
                    "Pending",
                    "Confirmed",
                    "Completed",
                    "Cancelled"
                ],

                datasets: [{
                    label: "Appointments",

                    data: [
                        chartData.Pending,
                        chartData.Confirmed,
                        chartData.Completed,
                        chartData.Cancelled
                    ],

                    backgroundColor: [
                        "#D6B77A",
                        "#800020",
                        "#738C78",
                        "#B9A7AA"
                    ],

                    borderWidth: 3,
                    borderColor: "#FAF8F5",
                    hoverOffset: 8
                }]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                cutout: "70%",

                plugins: {

                    legend: {
                        position: "bottom",

                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                family: "Manrope",
                                size: 12
                            }
                        }
                    },

                    tooltip: {
                        backgroundColor: "#350017",
                        padding: 12,
                        cornerRadius: 8
                    }
                }
            }
        });
    }

    // =====================================
    // 8. SUPPORT MESSAGE DATA
    // =====================================

    function getSupportMessages() {

        try {

            const messages = JSON.parse(
                localStorage.getItem(SUPPORT_STORAGE_KEY) || "[]"
            );

            return Array.isArray(messages) ? messages : [];

        } catch (error) {

            console.error(
                "Unable to read support messages:",
                error
            );

            return [];
        }
    }

    // =====================================
    // 9. NORMALISE SUPPORT STATUS
    // =====================================

    function normaliseSupportStatus(status) {

        const value = String(status || "").trim().toLowerCase();

        if (
            value === "resolved" ||
            value === "complete" ||
            value === "completed"
        ) {
            return "Resolved";
        }

        if (
            value === "in progress" ||
            value === "in-progress"
        ) {
            return "In Progress";
        }

        return "Pending";
    }

    // =====================================
    // 10. SUPPORT MESSAGE CHART
    // =====================================

    function renderSupportMessageChart() {

        const canvas = getElement("supportMessageChart");

        if (!canvas) return;

        if (typeof Chart === "undefined") {
            console.error(
                "Chart.js is not loaded. Support message chart cannot be displayed."
            );
            return;
        }

        const messages = getSupportMessages();

        const pending = messages.filter(
            message => normaliseSupportStatus(message.status) === "Pending"
        ).length;

        const progress = messages.filter(
            message => normaliseSupportStatus(message.status) === "In Progress"
        ).length;

        const resolved = messages.filter(
            message => normaliseSupportStatus(message.status) === "Resolved"
        ).length;

        if (supportMessageChart) {
            supportMessageChart.destroy();
        }

        supportMessageChart = new Chart(canvas, {

            type: "bar",

            data: {

                labels: [
                    "Pending",
                    "In Progress",
                    "Resolved"
                ],

                datasets: [{
                    label: "Support Messages",

                    data: [
                        pending,
                        progress,
                        resolved
                    ],

                    backgroundColor: [
                        "#D6B77A",
                        "#52749A",
                        "#738C78"
                    ],

                    borderRadius: 8,
                    borderSkipped: false,
                    maxBarThickness: 75
                }]
            },

            options: {

                responsive: true,

                maintainAspectRatio: false,

                plugins: {

                    legend: {
                        display: false
                    },

                    tooltip: {
                        backgroundColor: "#350017",
                        padding: 12,
                        cornerRadius: 8
                    }
                },

                scales: {

                    y: {

                        beginAtZero: true,

                        ticks: {
                            precision: 0,
                            stepSize: 1,
                            color: "#958A90"
                        },

                        grid: {
                            color: "#F0ECEE"
                        }
                    },

                    x: {

                        ticks: {
                            color: "#5E535A",

                            font: {
                                family: "Manrope",
                                size: 11,
                                weight: "600"
                            }
                        },

                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }

    // =====================================
    // 11. WELCOME MESSAGE
    // =====================================

    function updateWelcomeMessage() {

        const currentUser = HealoraStorage.getCurrentUser();

        const welcomeElement = getElement("welcomeName");

        if (welcomeElement && currentUser) {
            welcomeElement.textContent = currentUser.name;
        }
    }

    // =====================================
    // 12. INITIALIZE DASHBOARD
    // =====================================

    function initializeDashboard() {

        if (!HealoraStorage.getCurrentUser()) {
            return;
        }

        updateWelcomeMessage();

        updateStatistics();

        renderRecentAppointments();

        renderAppointmentChart();

        renderSupportMessageChart();
    }

    // =====================================
    // 13. PUBLIC FUNCTIONS
    // =====================================

    return {
        initializeDashboard,
        updateStatistics,
        renderRecentAppointments,
        renderAppointmentChart,
        renderSupportMessageChart,
        updateWelcomeMessage
    };

})();


// =========================================
// RUN DASHBOARD AFTER HTML LOADS
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    HealoraDashboard.initializeDashboard();

});


// =========================================
// REFRESH SUPPORT CHART WHEN DATA CHANGES
// IN ANOTHER BROWSER TAB
// =========================================

window.addEventListener("storage", (event) => {

    if (event.key === "healora_support_requests") {

        if (window.HealoraDashboard) {
            window.HealoraDashboard.renderSupportMessageChart();
        }
    }

});

window.HealoraDashboard = HealoraDashboard;
