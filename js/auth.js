
/* =========================================
   HEALORA CLINIC
   AUTHENTICATION SYSTEM
   File: auth.js
========================================= */

const HealoraAuth = (() => {

    // =====================================
    // 1. GET ELEMENT HELPER
    // =====================================

    function getElement(id) {
        return document.getElementById(id);
    }


    // =====================================
    // 2. MESSAGE HANDLING
    // =====================================

    function showMessage(elementId, message, type = "error") {

        const element = getElement(elementId);

        if (!element) return;

        element.textContent = message;

        if (elementId === "loginError") {
            element.className = "login-error " + type;
            element.hidden = false;
        } else if (elementId === "registerMessage") {
            element.className = "register-message " + type;
        }
    }


    function hideMessage(elementId) {

        const element = getElement(elementId);

        if (!element) return;

        element.textContent = "";

        if (elementId === "loginError") {
            element.className = "login-error";
            element.hidden = true;
        } else if (elementId === "registerMessage") {
            element.className = "register-message";
        }
    }


    // =====================================
    // 3. NAVIGATION
    // =====================================

    function getPageUrl(path) {

        const isInsidePages = window.location.pathname
            .split("/")
            .includes("pages");

        const prefix = isInsidePages ? "../" : "";

        return new URL(
            prefix + path,
            window.location.href
        ).href;
    }


    function redirectToLogin() {
        window.location.href = getPageUrl("login.html");
    }


    function redirectToDashboard(role) {

        if (role === "admin") {
            window.location.href = getPageUrl(
                "pages/admin-dashboard.html"
            );
        } else if (role === "patient") {
            window.location.href = getPageUrl(
                "pages/patient-dashboard.html"
            );
        } else {
            redirectToLogin();
        }
    }


    // =====================================
    // 4. LOGIN SYSTEM
    // =====================================

    function handleLogin(event) {

        event.preventDefault();

        hideMessage("loginError");

        if (!window.HealoraStorage) {
            showMessage(
                "loginError",
                "System error. Please refresh the page and try again."
            );
            return;
        }

        const email = getElement("loginEmail")?.value.trim();
        const password = getElement("loginPassword")?.value;

        if (!email || !password) {
            showMessage(
                "loginError",
                "Please enter your email and password."
            );
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            showMessage(
                "loginError",
                "Please enter a valid email address."
            );
            return;
        }

        const result = window.HealoraStorage.login(
            email,
            password
        );

        if (!result.success) {
            showMessage("loginError", result.message);
            return;
        }

        showMessage(
            "loginError",
            "Login successful! Redirecting...",
            "success"
        );

        const loginButton = getElement("loginSubmit");

        if (loginButton) {
            loginButton.disabled = true;
        }

        redirectToDashboard(result.user.role);
    }


    // =====================================
    // 5. PATIENT REGISTRATION
    // =====================================

    function handleRegister(event) {

        event.preventDefault();

        hideMessage("registerMessage");

        if (!window.HealoraStorage) {
            showMessage(
                "registerMessage",
                "System error. Please refresh the page and try again."
            );
            return;
        }

        const name = getElement("registerName")?.value.trim();
        const email = getElement("registerEmail")?.value.trim();
        const phone = getElement("registerPhone")?.value.trim();
        const password = getElement("registerPassword")?.value;
        const confirmPassword = getElement("confirmPassword")?.value;
        const agreeTerms = getElement("agreeTerms")?.checked;

        if (
            !name ||
            !email ||
            !phone ||
            !password ||
            !confirmPassword
        ) {
            showMessage(
                "registerMessage",
                "Please complete all required fields."
            );
            return;
        }

        if (name.length < 3) {
            showMessage(
                "registerMessage",
                "Full name must contain at least 3 characters."
            );
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            showMessage(
                "registerMessage",
                "Please enter a valid email address."
            );
            return;
        }

        const phonePattern = /^[0-9+\-\s()]{8,20}$/;

        if (!phonePattern.test(phone)) {
            showMessage(
                "registerMessage",
                "Please enter a valid phone number."
            );
            return;
        }

        if (password.length < 6) {
            showMessage(
                "registerMessage",
                "Password must contain at least 6 characters."
            );
            return;
        }

        if (password !== confirmPassword) {
            showMessage(
                "registerMessage",
                "Passwords do not match."
            );
            return;
        }

        if (!agreeTerms) {
            showMessage(
                "registerMessage",
                "Please agree to the terms and conditions."
            );
            return;
        }

        const result = window.HealoraStorage.registerUser({
            name: name,
            email: email,
            phone: phone,
            password: password
        });

        if (!result.success) {
            showMessage("registerMessage", result.message);
            return;
        }

        showMessage(
            "registerMessage",
            "Account created successfully! Redirecting to login...",
            "success"
        );

        const registerButton = getElement("registerSubmit");

        if (registerButton) {
            registerButton.disabled = true;
        }

        event.target.reset();

        setTimeout(() => {
            window.location.href = getPageUrl("login.html");
        }, 1500);
    }


    // =====================================
    // 6. LOGOUT SYSTEM
    // =====================================

    function handleLogout() {

        const confirmed = window.confirm(
            "Are you sure you want to log out?"
        );

        if (!confirmed) return;

        window.HealoraStorage.logout();

        redirectToLogin();
    }


    // =====================================
    // 7. USER SESSION
    // =====================================

    function getLoggedInUser() {
        return window.HealoraStorage.getCurrentUser();
    }


    function requireLogin(requiredRole = null) {

        const user = getLoggedInUser();

        if (!user) {
            redirectToLogin();
            return false;
        }

        if (requiredRole && user.role !== requiredRole) {

            if (
                user.role === "admin" ||
                user.role === "patient"
            ) {
                redirectToDashboard(user.role);
            } else {
                redirectToLogin();
            }

            return false;
        }

        return true;
    }


    // =====================================
    // 8. DISPLAY USER INFORMATION
    // =====================================

    function displayUserInformation() {

        const user = getLoggedInUser();

        if (!user) return;

        document.querySelectorAll("[data-user-name]")
            .forEach(element => {
                element.textContent = user.name;
            });

        document.querySelectorAll("[data-user-email]")
            .forEach(element => {
                element.textContent = user.email;
            });

        document.querySelectorAll("[data-user-role]")
            .forEach(element => {
                element.textContent = user.role.toUpperCase();
            });
    }


    // =====================================
    // 9. MOBILE SIDEBAR
    // =====================================

    function initializeSidebar() {

        const mobileToggle = getElement("mobileToggle");
        const sidebar = document.querySelector(".sidebar");

        if (!mobileToggle || !sidebar) return;

        // Create overlay
        let overlay = getElement("sidebarOverlay");

        if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = "sidebarOverlay";
            overlay.className = "sidebar-overlay";
            document.body.appendChild(overlay);
        }

        function closeSidebar() {
            sidebar.classList.remove("active");
            sidebar.classList.remove("show");
            overlay.classList.remove("active");

            mobileToggle.setAttribute("aria-expanded", "false");
        }

        function openSidebar() {
            sidebar.classList.add("active");
            overlay.classList.add("active");

            mobileToggle.setAttribute("aria-expanded", "true");
        }

        mobileToggle.addEventListener("click", () => {

            const isOpen =
                sidebar.classList.contains("active") ||
                sidebar.classList.contains("show");

            if (isOpen) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });

        overlay.addEventListener("click", closeSidebar);

        // Close sidebar after selecting a menu link
        sidebar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeSidebar);
        });

        // Close sidebar when screen becomes desktop size
        window.addEventListener("resize", () => {
            if (window.innerWidth > 767) {
                closeSidebar();
            }
        });
    }


    // =====================================
    // 10. AUTOMATIC PAGE INITIALIZATION
    // =====================================

    function initializeAuthentication() {

        const loginForm = getElement("loginForm");

        if (loginForm) {
            loginForm.addEventListener("submit", handleLogin);
        }

        const registerForm = getElement("registerForm");

        if (registerForm) {
            registerForm.addEventListener("submit", handleRegister);
        }

        document.querySelectorAll("[data-logout]")
            .forEach(button => {
                button.addEventListener("click", handleLogout);
            });

        const requiredRole = document.body.dataset.requiresAuth;

        if (requiredRole) {
            const accessGranted = requireLogin(requiredRole);

            if (!accessGranted) return;
        }

        displayUserInformation();

        initializeSidebar();
    }


    // =====================================
    // 11. PUBLIC FUNCTIONS
    // =====================================

    return {

        handleLogin,
        handleRegister,
        handleLogout,

        getLoggedInUser,
        requireLogin,

        redirectToLogin,
        redirectToDashboard,

        displayUserInformation,
        initializeAuthentication

    };

})();


// =========================================
// 12. INITIALIZE AUTHENTICATION
// =========================================

document.addEventListener("DOMContentLoaded", () => {
    HealoraAuth.initializeAuthentication();
});


// Make authentication available globally
window.HealoraAuth = HealoraAuth;
