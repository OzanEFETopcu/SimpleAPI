const Sequelize = require("sequelize");
const sequelize = require("../utils/database");

// Defining a table structure
const Employee = sequelize.define('Employee', {
    employeename: {
        type: Sequelize.STRING,
        allowNull: false
    },
    departmentname: {
        type: Sequelize.STRING,
        allowNull: false
    },
});

module.exports = Employee;