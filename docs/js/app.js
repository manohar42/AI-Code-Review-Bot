// js/app.js

// 1. Theme Management (Shared across all pages)
function initTheme() {
    const isDark = localStorage.getItem('theme') === 'dark' || !localStorage.getItem('theme');
    if (isDark) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// 2. Authentication Check
function checkAuth() {
    const token = localStorage.getItem('jwt_token');
    const path = window.location.pathname;

    // If user is NOT logged in and tries to access secure pages, boot them to login
    const securePages = ['/dashboard.html', '/history.html', '/settings.html', '/review-detail.html'];
    if (!token && securePages.some(page => path.includes(page))) {
        window.location.href = 'login.html';
    }

    // If user IS logged in and tries to access login/register, send them to dashboard
    const authPages = ['/login.html', '/register.html'];
    if (token && authPages.some(page => path.includes(page))) {
        window.location.href = 'dashboard.html';
    }
}

// 3. Logout Function
function logout() {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_data');
    window.location.href = 'login.html';
}

// Run on page load
initTheme();
checkAuth();