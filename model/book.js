const { v4 } = require('uuid');
const pool = require('../config/db');

class Book {
	constructor(title, author, page, price) {
		this.title = title;
		this.author = author;
		this.page = page;
		this.price = price;
		// this.id = v4();
	}

	toJSON() {
		return {
			id: v4(),
			title: this.title,
			author: this.author,
			page: this.page,
			price: this.price,
		};
	}

	// addBook
	async save() {
		try {
			const { title, author, page, price } = this.toJSON();
			const books = await pool.query(
				'INSERT INTO books (title, author, page, price) VALUES ($1, $2, $3, $4) RETURNING *',
				[title, author, page, price]
			);
			return books;
		} catch (error) {
			console.log(error);
		}
	}

	// getAll
	static async getAll() {
		try {
			const books = await pool.query('SELECT * FROM books');
			if (!books) {
				return false;
			}
			return books.rows;
		} catch (error) {
			console.log(error);
		}
	}

	// update
	static async update(data) {
		try {
			const { id, title, author, page, price } = data;
			const queryUpdate = `UPDATE books SET "title" = $1, "author" = $2, "page" = $3, "price" = $4 WHERE "id" = $5 `;
			await pool.query(queryUpdate, [title, author, page, price, id]);
		} catch (error) {
			console.log(error);
			return error;
		}
	}
	// delete
	static async deleteBook(id) {
		try {
			await pool.query(`DELETE FROM books WHERE id = $1`, [id]);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = Book;
