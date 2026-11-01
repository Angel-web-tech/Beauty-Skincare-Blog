
// Get form elements

const form = document.getElementById("signupForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const skinInput = document.getElementById("skin");

// Function to check empty values

function isEmpty(value) {
    return value.trim() === "";
}

// Function to validate email

function isValidEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

// Function to check password length

function isStrongPassword(pw) {
    return pw.length >= 8;
}

// Function to display error messages

function showError(id, message) {
    document.getElementById(id).textContent = message;
}

// Function to clear previous errors

function clearErrors() {
    showError("nameError", "");
    showError("emailError", "");
    showError("passError", "");
    showError("skinError", "");

    document.getElementById("successMessage").textContent = "";
}

// Main form validation function

function validateForm() {

    let valid = true;

    clearErrors();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    // Name validation

    if (isEmpty(name)) {
        showError("nameError", "Name is required");
        valid = false;
    }
    else if (name.length < 3) {
        showError("nameError", "Use at least 3 characters");
        valid = false;
    }
    else {
        console.log("Name is valid");
    }

    // Email validation

    if (isEmpty(email)) {
        showError("emailError", "Email is required");
        valid = false;
    }
    else if (!isValidEmail(email)) {
        showError("emailError", "Enter a valid email address");
        valid = false;
    }
    else {
        console.log("Email is valid");
    }

    // Password validation

    if (isEmpty(password)) {
        showError("passError", "Password is required");
        valid = false;
    }
    else if (!isStrongPassword(password)) {
        showError("passError", "Minimum 8 characters required");
        valid = false;
    }
    else {
        console.log("Password is valid");
    }

    // Skin type validation

    if (isEmpty(skinInput.value)) {
        showError("skinError", "Please select your skin type");
        valid = false;
    }

    return valid;
}

// Handle form submission

form.addEventListener("submit", function(e) {

    e.preventDefault();

    if (validateForm()) {
        document.getElementById("successMessage").textContent =
            "Registration successful! Welcome to The Glow Edit.";

        alert("Registration successful!");
    }

});

// Clear errors when the form is reset

form.addEventListener("reset", function() {
    clearErrors();
});
