document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const emailInput = document.getElementById('email');       
    const passwordInput = document.getElementById('password'); 

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email === "" || password === "") {
            alert("Vui lòng nhập cả email và mật khẩu.");
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];

        const foundUser = users.find(user => user.email === email);

        if (!foundUser || foundUser.password !== password) {
            alert("Sai thông tin đăng nhập.");
            return;
        }

        alert(`Chào mừng trở lại, ${foundUser.name}!`);

        sessionStorage.setItem('currentUser', JSON.stringify(foundUser));
        window.location.href = 'homepage.html';
    });
});