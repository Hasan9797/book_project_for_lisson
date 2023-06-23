const { Router } = require('express');
const route = Router();
const fs = require('fs');
const path = require('path');

function getAll() {
	return new Promise((resolve, reject) => {
		fs.readFile(
			path.join(__dirname, '..', 'db', 'data.json'),
			'utf-8',
			(err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(JSON.parse(data));
				}
			}
		);
	});
}

const { addBook, getAllBook } = require('../controllers/book');

route.post('/', addBook);

route.get('/', getAllBook);

route.post('/id', async (req, res) => {
	const book = await getAll();
	const data = book.find(book => book.id === req.body.id);
	res.render('updateBook', { title: 'Update Book', data });
});

route.post('/update', async (req, res) => {
	const books = await getAll();
	const data = books.filter(book => book.id !== req.body.id);
	data.push(req.body);

	fs.writeFile(
		path.join(__dirname, '..', 'db', 'data.json'),
		JSON.stringify(data),
		err => {
			if (err) {
				res.end('<h1>Kitob yuklanmadi</h1>');
			} else {
				res.redirect('/book');
			}
		}
	);
});

route.get('/delete/:id', async (req, res) => {
	const books = await getAll();
	const data = books.filter(book => book.id !== req.params.id);

	fs.writeFile(
		path.join(__dirname, '..', 'db', 'data.json'),
		JSON.stringify(data),
		err => {
			if (err) {
				res.end('<h1>Kitob yuklanmadi</h1>');
			} else {
				res.redirect('/book');
			}
		}
	);
});

module.exports = route;
