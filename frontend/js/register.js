document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form-container");

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const phoneInput = document.getElementById("phone");
  const passwordInput = document.getElementById("password");

  const rules = document.getElementById("password-rules");
  const ruleLength = document.getElementById("rule-length");
  const ruleUppercase = document.getElementById("rule-uppercase");
  const ruleNumber = document.getElementById("rule-number");
  const ruleSpecial = document.getElementById("rule-special");

  passwordInput.addEventListener("focus", () => {
    rules.style.display = "block";
  });

  passwordInput.addEventListener("blur", () => {
    rules.style.display = "none";
  });

  passwordInput.addEventListener("input", () => {
    const value = passwordInput.value;

    ruleLength.classList.toggle("valid", value.length >= 8);
    ruleUppercase.classList.toggle("valid", /[A-Z]/.test(value));
    ruleNumber.classList.toggle("valid", /\d/.test(value));
    ruleSpecial.classList.toggle("valid", /[!@#$%^&*(),.?":{}|<>]/.test(value));
  });

  function validateForm() {
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const password = passwordInput.value.trim();

    if (name === "") {
      alert("Please enter your full name.");
      nameInput.focus();
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      emailInput.focus();
      return false;
    }

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      alert("Phone number must be exactly 10 digits.");
      phoneInput.focus();
      return false;
    }

    const passCheck =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /\d/.test(password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (!passCheck) {
      alert(
        "Password must be at least 8 characters long, include one uppercase letter, one number, and one special character."
      );
      passwordInput.focus();
      return false;
    }

    return true;
  }
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
      const usersString = localStorage.getItem("users") || "[]";
      const users = JSON.parse(usersString);
      
      const newUser = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        password: passwordInput.value.trim(),
        role: "user"
      };

      const emailExists = users.some(user => user.email === newUser.email);

      if (emailExists) {
        alert("Email này đã được đăng ký. Vui lòng sử dụng một email khác.");
        return; 
      }

      users.push(newUser);

      localStorage.setItem("users", JSON.stringify(users));

      alert("Đăng ký thành công!");

      form.reset(); 

      location.href = "../html/homepage.html"; 
    }
  });
});

