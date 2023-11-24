# SimpleAPI
This project is an implementation of Express.js to serve as an API between a company database and the client

### Author
Ozan Topcu

### Date
24/11/2023

### Instructions on how to use
Starting the app initially is simple with the command: <code>node .\backend.js</code>   
**EndPoints:**
- GET endpoints
  -  /employees
  -  /department
  -  /company
- POST endpoints
  -  /employees
  -  /employees/:id
  -  /department
  -  /department/:id
#### /employees & /department & /company (With GET endpoints)
These endpoints are created in a way to represent the whole of the data for either 
each table or for a joined version of two tables then return the result in a JSON format.

More specifically, the /employees and /department table returns the Employee and Department
tables data respectively whereas /company is used to LEFT JOIN each table and reformat their values 
to a single JSON object and return it that way.

#### /employees & /employees/:id & /department & /department/:id (With POST endpoints)
The endpoints without the "id" attribute are made for creating new rows whereas the ones
with the "id" attribute are designed to find that specific row and update its values with the
given values.
