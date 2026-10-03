const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(400).json({
            message: "Username and password are required"
        });
    }

    if (isValid(username)) {
        return res.status(409).json({
            message: "Username already exists"
        });
    }

    users.push({
        username: username,
        password: password
    });

    return res.status(201).json({
        message: "User successfully registered"
    });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
 res.send(JSON.stringify(books, null, 4));  return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    res.send(JSON.stringify(books[isbn], null, 4));
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const booksByAuthor = {};

    const bookKeys = Object.keys(books);

    bookKeys.forEach((key) => {
        if (books[key].author === author) {
            booksByAuthor[key] = books[key];
        }
    });

    res.send(JSON.stringify(booksByAuthor, null, 4));
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const booksByTitle = {};

    const bookKeys = Object.keys(books);

    bookKeys.forEach((key) => {
        if (books[key].title === title) {
            booksByTitle[key] = books[key];
        }
    });

    res.send(JSON.stringify(booksByTitle, null, 4));
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    if (books[isbn]) {
        res.send(JSON.stringify(books[isbn].reviews, null, 4));
    } else {
        res.status(404).json({
            message: "Book not found"
        });
    }
});

module.exports.general = public_users;
