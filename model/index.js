const { Sequelize, DataTypes } = require('sequelize');
const { user, server, password, database, port } = require('../config/db');

const sequelize = new Sequelize(database, user, password, {
	host: server,
	port: port,
	dialect: 'postgres',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.books = require('./book.model')(sequelize, DataTypes);
db.users = require('./user.model')(sequelize, DataTypes);

module.exports = db;
