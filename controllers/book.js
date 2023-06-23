const { v4 } = require('uuid');
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

const addBook = async (req, res) => {
	const books = await getAll();
	books.push({ id: v4(), ...req.body }); // til: bok , auth: davlat

	fs.writeFile(
		path.join(__dirname, '..', 'db', 'data.json'),
		JSON.stringify(books),
		err => {
			if (err) {
				res.end('<h1>Kitob yuklanmadi</h1>');
			} else {
				res.redirect('/book');
			}
		}
	);
};

const getAllBook = async (req, res) => {
	const book = await getAll();
	res.render('book', { title: 'Books', book });
};

module.exports = { addBook, getAllBook }; // {addbook: addbook, getAll: getAll}
