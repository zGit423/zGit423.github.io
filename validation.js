// COMP 322 Internet Systems - Assignment 4: Form Validation
// All validation (regular expressions) and redirection is handled here.

// ---------- Settings ----------
var SUCCESS_PAGE = "success.html";   // where to go when every field is valid
var STRONG_PASSWORD = true;          // true = bonus rule (1 upper, 1 lower, 1 number, 1 special char)

var COLOR_EMPTY = "red";
var COLOR_INVALID = "orange";

// ---------- Regular expressions ----------
var USERNAME_REGEX = /^[a-z0-9]{4,12}$/;                    // lowercase letters/numbers, 4-12 chars
var EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.(net|com|org|edu)$/;
var PHONE_REGEX = /^\(\d{3}\)-\d{3}-\d{4}$/;                // (123)-456-7890
var PASSWORD_REGEX = /^\w{9,}$/;                            // letters, numbers, underscores, > 8 chars
var STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{9,}$/;

// ---------- Helpers ----------
function addMessage(container, text, highlight, color) {
    var p = document.createElement("p");
    p.appendChild(document.createTextNode(text + " "));

    var span = document.createElement("span");
    span.textContent = highlight;
    span.style.color = color;
    span.style.fontWeight = "bold";

    p.appendChild(span);
    container.appendChild(p);
}

function isBlank(value) {
    return value.trim().length === 0;
}

// ---------- Main validation ----------
function validateForm() {
    var messages = document.getElementById("messages");
    messages.innerHTML = "";          // remove old warnings before re-validating
    var allValid = true;

    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var password = document.getElementById("password").value;
    var confirmPassword = document.getElementById("confirmPassword").value;
    var gender = document.querySelector('input[name="gender"]:checked');
    var ageGroup = document.getElementById("ageGroup").value;

    // 1. Username
    if (isBlank(username)) {
        addMessage(messages, "Please Enter", "Username", COLOR_EMPTY);
        allValid = false;
    } else if (!USERNAME_REGEX.test(username)) {
        addMessage(messages, "Please Enter", "a valid username", COLOR_INVALID);
        allValid = false;
    }

    // 2. Email
    if (isBlank(email)) {
        addMessage(messages, "Please Enter", "Email", COLOR_EMPTY);
        allValid = false;
    } else if (!EMAIL_REGEX.test(email)) {
        addMessage(messages, "Please Enter", "a valid email", COLOR_INVALID);
        allValid = false;
    }

    // 3. Phone number
    if (isBlank(phone)) {
        addMessage(messages, "Please Enter", "Phone Number", COLOR_EMPTY);
        allValid = false;
    } else if (!PHONE_REGEX.test(phone)) {
        addMessage(messages, "Please Enter", "a valid phone number", COLOR_INVALID);
        allValid = false;
    }

    // 4. Password
    var passwordRegex = STRONG_PASSWORD ? STRONG_PASSWORD_REGEX : PASSWORD_REGEX;
    if (password.length === 0) {
        addMessage(messages, "Please Enter", "Password", COLOR_EMPTY);
        allValid = false;
    } else if (!passwordRegex.test(password)) {
        addMessage(messages, "Please Enter", "a valid password", COLOR_INVALID);
        allValid = false;
    }

    // 5. Confirm password
    var passwordsMismatch = (password !== confirmPassword);
    if (passwordsMismatch) {
        allValid = false;
    }

    // 6. Gender
    if (gender === null) {
        addMessage(messages, "Please Select", "Gender", COLOR_EMPTY);
        allValid = false;
    }

    // 7. Age group
    if (ageGroup === "") {
        addMessage(messages, "Please Select", "Age Group", COLOR_EMPTY);
        allValid = false;
    }

    // Outcome
    if (passwordsMismatch) {
        // Short delay so the messages above are painted before the alert blocks the page
        setTimeout(function () {
            alert("passwords do not match");
        }, 50);
    } else if (allValid) {
        window.location.href = SUCCESS_PAGE;   // redirection
    }
}

// ---------- Clear (reset) ----------
function clearMessages() {
    document.getElementById("messages").innerHTML = "";
}

// ---------- Wire up the buttons ----------
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submitBtn").addEventListener("click", validateForm);
    document.getElementById("userForm").addEventListener("reset", clearMessages);
});
