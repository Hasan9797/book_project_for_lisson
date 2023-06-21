const { Router } = require('express');
const { v4 } = require('uuid');
const route = Router();
const fs = require('fs');
const path = require('path');

function getAll() {
	return new Promise((resolve, reject) => {
		fs.readFile(
			path.join(__dirname, '..', 'data.json'),
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

route.post('/', async (req, res) => {
	const books = await getAll();
	books.push({ id: v4(), ...req.body }); // til: bok , auth: davlat

	fs.writeFile(
		path.join(__dirname, '..', 'data.json'),
		JSON.stringify(books),
		err => {
			if (err) {
				res.end('<h1>Kitob yuklanmadi</h1>');
			} else {
				res.redirect('/book');
			}
		}
	);
});

route.get('/', async (req, res) => {
	const book = await getAll();
	res.render('book', { title: 'Books', book });
});

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
		path.join(__dirname, '..', 'data.json'),
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
	const data = books.filter((book) => book.id !== req.params.id)
	
	fs.writeFile(
		path.join(__dirname, '..', 'data.json'),
		JSON.stringify(data),
		err => {
			if (err) {
				res.end('<h1>Kitob yuklanmadi</h1>');
			} else {
				res.redirect('/book');
			}
		}
	);
})

module.exports = route;
