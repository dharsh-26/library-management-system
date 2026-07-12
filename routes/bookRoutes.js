// routes/bookRoutes.js

const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

// Add Book
router.post("/", protect, addBook);

// Get All Books
router.get("/", protect, getBooks);

// Get Single Book
router.get("/:id", protect, getBookById);

// Update Book
router.put("/:id", protect, updateBook);

// Delete Book
router.delete("/:id", protect, deleteBook);

module.exports = router;