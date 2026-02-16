const user = JSON.parse(localStorage.getItem('currentUser'));

if (!user) {
    alert('Please login first');
    window.location.href = 'Registration_Login.html';
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'Registration_Login.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const nameSpan = document.getElementById('username');
    if (nameSpan && user) {
        nameSpan.innerText = user.name;
    }
});