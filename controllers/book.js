const Book = require('../model/book');
const fs = require('fs');
const path = require('path');

const addBook = async (req, res) => {
	const { title, author, page, price } = req.body;
	const book = new Book(title, author, page, price);
	await book.save();
	res.redirect('/book');
};

const getAllBook = async (req, res) => {
	const book = await Book.getAll();
	res.render('book', { title: 'Books', book });
};

const getByIdBookforUpdate = async (req, res) => {
	const books = await Book.getAll();
	const data = books.find(book => book.id === req.body.id);
	res.render('updateBook', { title: 'Update Book', data });
};

const updateBook = async (req, res) => {
	try {
		await Book.update(req.body);
		res.redirect('/book');
	} catch (error) {
		console.log(error);
		res.send('Book no updated');
	}
};

const deleteBook = async (req, res) => {
	try {
		await Book.deleteBook(req.params.id);
		res.redirect('/book');
	} catch (error) {
		res.send(`<h1>Ma'lumot o'chirilmadi</h1>`);
	}
};

module.exports = {
	addBook,
	getAllBook,
	getByIdBookforUpdate,
	updateBook,
	deleteBook,
};
