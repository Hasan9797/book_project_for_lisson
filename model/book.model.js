module.exports = (sequelize, DataTypes) => {
	const Book = sequelize.define('books', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		title: { type: DataTypes.STRING(30), allowNull: false },
		author: { type: DataTypes.STRING(30), allowNull: false },
		page: { type: DataTypes.INTEGER, allowNull: false },
		price: { type: DataTypes.INTEGER, allowNull: false },
		img: { type: DataTypes.STRING(1200), allowNull: false },
	});
	return Book;
};
