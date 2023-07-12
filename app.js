const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const path = require('path');
const db = require('./model/index');
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Buffer buni Object o'girarkanman
app.use(express.static(path.join(__dirname, './public')));

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use('/', require('./routes/home'));
app.use('/book', require('./routes/book'));

const start = () => {
	db.sequelize
		.authenticate()
		.then(() => {
			console.log('Connection established successfully.');
		})
		.catch(err => {
			console.error('Unable to connect to the database:', err);
		});
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => console.log(`Server on PORT: ${PORT}`));
};
start();
