const express = require("express");
const bodyParser = require('body-parser');
const Employee = require('./models/employee');
const Department = require('./models/department');

// Setting up express module with a specified port of 3000
const app = express();
const port = 3000;
// Use body-parser middleware to parse JSON requests
app.use(bodyParser.json());

// Connecting the models
Employee.belongsTo(Department, { foreignKey: 'departmentname', targetKey: 'departmentname' });
Department.hasMany(Employee, { foreignKey: 'departmentname', targetKey: 'departmentname' });

// Setting up the GET method for the employees route of the API
app.get("/employees", async (req, res) => {
    try {
        // Fetch all employees from the Employee table
        const employees = await Employee.findAll();
        // Send the employees as a JSON response
        res.json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Setting up the GET method for the department route of the API
app.get("/department", async (req, res) => {
    try {
        // Fetch all department from the Department table
        const department = await Department.findAll();
        // Send the department as a JSON response
        res.json(department);
    } catch (error) {
        console.error('Error fetching department:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Setting up the GET method for displayin both employees and department in the same response
app.get("/company", async (req, res) => {
    try {
        // Perform a LEFT JOIN between Employee and Department on the 'departmentname' column
        const result = await Employee.findAll({
            include: {
                model: Department,
                attributes: ['departmentname', 'departmentbudget'],
                required: false, // Use left join
            },
        });
        // Transform the result into the desired JSON format
        const formattedResult = result.map(employee => {
            const { employeename, departmentname, Department: departmentData } = employee.toJSON();

            // Include only relevant data from the Department model
            const departmentInfo = departmentData
                ? { departmentname: departmentData.departmentname, departmentbudget: departmentData.departmentbudget }
                : null;

            return {
                employeename,
                departmentname,
                departmentInfo,
            };
        });

        // Send the formatted result as a JSON response
        res.json(formattedResult);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define a route to create a new employee
app.post('/employees', async (req, res) => {
    try {
        // Create a new employee using data from the request body
        const newEmployee = await Employee.create(req.body);

        // Send the newly created employee as a JSON response
        res.json(newEmployee);
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define a route to update the existing employees
app.post('/employees/:id', async (req, res) => {
    const employeeID = req.params.id;

    try {
        // Find the employee from the database with the primary key which is id
        const employeeToUpdate = await Employee.findByPk(employeeID);

        // If the employee with the given ID doesn't exist, return a 404 Not Found response
        if (!employeeToUpdate) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Update the employee's properties with the data from the request body
        await employeeToUpdate.update(req.body);

        // Send the updated employee as a JSON response
        res.json(employeeToUpdate);
    } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define a route to create a new department
app.post('/department', async (req, res) => {
    try {
        // Create a new department using data from the request body
        const newDepartment = await Department.create(req.body);

        // Send the newly created department as a JSON response
        res.json(newDepartment);
    } catch (error) {
        console.error('Error creating department:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Define a route to update the existing department
app.post('/department/:id', async (req, res) => {
    const departmentID = req.params.id;

    try {
        // Find the department from the database with the primary key which is id
        const departmentToUpdate = await Department.findByPk(departmentID);

        // If the department with the given ID doesn't exist, return a 404 Not Found response
        if (!departmentToUpdate) {
            return res.status(404).json({ error: 'Department not found' });
        }

        // Update the department's properties with the data from the request body
        await departmentToUpdate.update(req.body);

        // Send the updated department as a JSON response
        res.json(departmentToUpdate);
    } catch (error) {
        console.error('Error updating department:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Setting the API to listen so that it can start functioning
app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});
