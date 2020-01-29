const mysql = require("mysql");
// const questions = require("./javascript/questionnaire/questions");
// const Department = require("./javascript/classes/department");
// const Remove = require("./javascript/classes/remove");
// const View = require("./javascript/classes/view");
// const Update = require("./javascript/classes/update");
const inquirer = require("inquirer");

const doQs = [
    "View All Employees", "View Employees By Department", "View Employees by Manager",
    "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager",
    "View All Roles", "View Roles By Department", "Add Role", "Remove Role", 
    "Update Role Department", "View All Departments", "Add Department",
    "Remove Department", "Exit"
    ];

const testingDep = doQs.splice(12);
// const testingRoles = doQs.splice(7, 12);
// const testingEmp = doQs.splice(0, 7);

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Bqlbajaboy3!",
    database: "company_db",
    multipleStatements: true
})

connection.connect(async function(err) {
    if (err) throw err;
    // let department = new Department(connection);
    init();
    connection.end();
})

async function init() {
    var data = await getTables();
    // var data = await questionAdd({name: "testing"}, "departments")
    console.log(data);
}

// Works
function questionAdd(obj, database) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${database} SET ?`
        connection.query(query, obj, function(err, res) {
            if (err) throw err;
            resolve();
        })
        
    })
}

function getTables() {
    return new Promise((resolve, reject) => {
        let query = "";
        query += "SELECT * FROM departments";
        query += ";SELECT * FROM roles";
        query += ";SELECT * FROM employees"
        connection.query(query, function(err, res) {
            if (err) throw err;
            // Departments
            // console.log(res[0]);
            // Roles
            // console.log(res[1]);
            // employees
            // console.log(res[1]);
            resolve(res);
        })
    })
}