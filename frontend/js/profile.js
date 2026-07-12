// js/profile.js

// Check if user is logged in
const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// Get user data from localStorage
const user = JSON.parse(localStorage.getItem("user"));

// Display user information
if (user) {
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
}