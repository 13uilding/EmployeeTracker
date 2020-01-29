const mysql = require("mysql");
// const questions = require("./javascript/questionnaire/questions");
const Department = require("./javascript/classes/department");
// const Remove = require("./javascript/classes/remove");
// const View = require("./javascript/classes/view");
// const Update = require("./javascript/classes/update");
const inquirer = require("inquirer");

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
    var [departments, roles, employees] = await getTables(); 
    // console.log(roles);
    doWhat();
})

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



    // What would you like to do Questionnaire
function doWhat() {
    inquirer.prompt({
        name: "do",
        message: "What would you like to do?",
        type: "list",
        choices: testingDep
    }).then(async function(answers) {
        let department = new Department(connection);
        console.log(answers.do);
        let answersArr = answers.do.split(" ")
        let database = answersArr[answersArr.length - 1].toLowerCase();
        if (!database.includes("s")) {
            database += "s";
        };
        switch (answers.do) {
            case "Add Department":
                inquirer.prompt({
                    name: "name",
                    message: "What department would you like to add?",
                    type: "input"
                }).then(function(answers) {
                    elementAdd(answers, database);
                })
                break;
            case "View All Departments":
                department.viewMySQL();
                doWhat();
                break;
            case "Remove Department":
                department.removeMySQL(doWhat);
                break;
            case "View All Employees":
                break;
            case "View Employees By Department":
                break;
            case "View Employees by Manager":
                break;
            case "Add Employee":
                inquirer.prompt([{
                    name: "first_name",
                    message: "What is the employee's first name?",
                    type: "input"           
                }, {
                    name: "last_name",
                    message: "What is the employee's last name?",
                    type: "input"  
                }, {
                    name: "role",
                    message: "What is their role?",
                    type: "list",
                    choices: choicesArr(roles, "name")
                }, {
                    name: "manager",
                    message: "Who is their manager?",
                    type: "list",
                    choices: choicesArr(employee, "name")
                }]).then(function(answers) {
                    elementAdd(answers, database)
                });
                break;
            case "Remove Employee":
                break;
            case "Update Employee Role":
                break;
            case "Update Employee Manager":
                break;
            case "View All Roles":
                break;
            case "View Roles By Department":
                break;
            case "Add Role":
                break;
            case "Remove Role":
                break;
            case "Update Role Department":
                break;
            case "Exit":
            default:
                connection.end();
                break;
        }

    });
};

async function init() {
    var data = await getTables();
    // var data = await elementAdd({name: "testing"}, "departments")
    console.log(data);
}

// Add an element to any table
function elementAdd(obj, database) {
    return new Promise((resolve, reject) => {
        const query = `INSERT INTO ${database} SET ?`
        connection.query(query, obj, function(err, res) {
            if (err) throw err;
            doWhat();
        })
        
    })
}
// Gets fresh tables
function getTables() {
    return new Promise((resolve, reject) => {
        let query = "";
        query += "SELECT * FROM departments";
        query += ";SELECT * FROM roles";
        query += ";SELECT * FROM employees"
        connection.query(query, function(err, res) {
            if (err) throw err;
            resolve(res);
        })
    })
}

// Generates choices array for remove and ids (not great for manager)
function choicesArr(database, type) {
    var choices = [];
    switch (database) {
        case "departments":
            for (const department of departments) {
                if (type === "name") {
                    choices.push((department.name).toLowerCase());
                } else {
                    choices.push(department.id);
                }
            };
            break;
        case "roles":
            for (const role of roles) {
                if (type === "name") {
                    choices.push((role.title).toLowerCase());
                } else if (type === "id") {
                    choices.push(role.id);
                } else {
                    choices.push(role.salary);
                }
            };
            break;
        case "employees":
            for (const employee of employees) {
                if (type === "name") {
                    let pushy = (employee.first_name).toLowerCase()
                    pushy += " " + (employee.last_name).toLowerCase()
                    choices.push(pushy);
                } else if (type === "id") {
                    choices.push(employee.id);
                }
            };
            break;
        default:
            return
    }
    return choices
}
// Add later to the inquirerAddRole
// function managerArr(database) {
//     for ()
// }









