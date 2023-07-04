const { Router } = require('express');
const route = Router();

const {
	addBook,
	getAllBook,
	getByIdBookforUpdate,
	updateBook,
	deleteBook,
} = require('../controllers/book');

route.post('/', addBook);

route.get('/', getAllBook);

route.post('/id', getByIdBookforUpdate);

route.post('/update', updateBook);

route.get('/delete/:id', deleteBook);

module.exports = route;
