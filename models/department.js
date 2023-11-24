const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

// Defining a table structure
const Department = sequelize.define('Department', {
    departmentname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    departmentbudget: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
});

module.exports = Department;