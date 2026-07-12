// controllers/bookController.js

const Book = require("../models/Book");

// Add Book
const addBook = async (req, res) => {
    try {
        const { title, author, category, isbn, quantity, status } = req.body;

        if (!title || !author || !category || !isbn || !quantity) {
            return res.status(400).json({
                message: "Please fill all required fields"
            });
        }

        const bookExists = await Book.findOne({ isbn });

        if (bookExists) {
            return res.status(400).json({
                message: "Book with this ISBN already exists"
            });
        }

        const book = await Book.create({
            title,
            author,
            category,
            isbn,
            quantity,
            status,
            addedBy: req.user.id
        });

        res.status(201).json({
            message: "Book added successfully",
            book
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get All Books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find().populate("addedBy", "name email");

        res.status(200).json(books);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get Single Book
const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json(book);

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Update Book
const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            message: "Book updated successfully",
            book: updatedBook
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Delete Book
const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        await Book.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
};