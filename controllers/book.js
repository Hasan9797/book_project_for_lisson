const { books } = require('../model/index');

const addBook = async (req, res) => {
	const { title, author, page, price, img } = req.body;
	const book = await books.create({
		title: title,
		author: author,
		page: page,
		price: price,
		img: img,
	});
	await book.save();
	res.redirect('/book');
};

const getAllBook = async (req, res) => {
	const book = await books.findAll({ raw: true });
	res.render('book', { title: 'Books', book });
};

const getByIdBookforUpdate = async (req, res) => {
	const book = await books.findByPk(req.params.id);
	res.render('updateBook', { title: 'Update Book', data: book.dataValues });
};

const updateBook = async (req, res) => {
	try {
		await books.update(req.body, {
			where: {
				id: req.body.id,
			},
		});
		res.redirect('/book');
	} catch (error) {
		console.log(error);
		res.send('Book no updated');
	}
};

const deleteBook = async (req, res) => {
	try {
		await books.destroy({
			where: {
				id: req.params.id,
			},
		});
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
