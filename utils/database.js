const Sequelize = require("sequelize");

// Setting up the sequelize library for easy database handling
// Defining of the database type and location that is being used
const sequelize = new Sequelize({
    dialect: 'sqlite',
    host: 'localhost',
    storage: 'database.sqlite',
    logging: false,
});

module.exports = sequelize;