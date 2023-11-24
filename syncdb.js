const Employee = require('./models/employee');
const Department = require('./models/department');

Employee.sync({alter: true});
Department.sync({alter: true});
console.log("The User table have been updated!");
