// js/dashboard.js

// Check if user is logged in
const token = localStorage.getItem("token");

if (!token) {
    alert("Please login first.");
    window.location.href = "login.html";
}

// Display logged-in user's name
const user = JSON.parse(localStorage.getItem("user"));

if (user) {
    document.getElementById("userName").textContent = user.name;
}

// Fetch books and update dashboard
async function loadDashboard() {
    try {
        const response = await fetch("http://localhost:5000/api/books", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        const books = await response.json();

        if (!response.ok) {
            alert(books.message);
            return;
        }

        document.getElementById("totalBooks").textContent = books.length;

        const availableBooks = books.filter(
            (book) => book.status === "Available"
        ).length;

        const issuedBooks = books.filter(
            (book) => book.status === "Issued"
        ).length;

        document.getElementById("availableBooks").textContent = availableBooks;
        document.getElementById("issuedBooks").textContent = issuedBooks;

    } catch (error) {
        console.error(error);
        alert("Failed to load dashboard.");
    }
}

// Logout
document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logged out successfully.");

    window.location.href = "login.html";
});

// Load dashboard data
loadDashboard();