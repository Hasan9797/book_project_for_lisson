module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		firstName: { type: DataTypes.STRING(30), allowNull: false },
		lastName: { type: DataTypes.STRING(30), allowNull: false },
		age: { type: DataTypes.INTEGER, allowNull: false },
	});
	return User;
};
