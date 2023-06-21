const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const path = require('path');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //Buffer buni Object o'girarkanman
app.use(express.static(path.join(__dirname, './public')));

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use('/', require('./routes/home'));
app.use('/book', require('./routes/book'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server on PORT: ${PORT}`));
