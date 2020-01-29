const mysql = require("mysql");
// const questions = require("./javascript/questionnaire/questions");
const cTable = require("console.table");
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


connection.connect(function(err) {
    if (err) throw err; 
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


const testingDep = doQs.splice(0, 7);
testingDep[7] = "Exit"
// const testingRoles = doQs.splice(7, 12);
// const testingEmp = doQs.splice(0, 7);



    // What would you like to do Questionnaire
async function doWhat() {
    try{
    var [departments, roles, employees] = await getTables();
    inquirer.prompt({
        name: "do",
        message: "What would you like to do?",
        type: "list",
        choices: testingDep
    }).then(async function(answers) {
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
                console.table(departments);
                doWhat();
                break;
            case "Remove Department":
                inquirer.prompt({
                    name: "remove",
                    message: "Which department would you like to remove?",
                    type: "list",
                    choices: choicesArr("name", database, departments)
                }).then(function(answer) {
                    elementRemove(answer, database, departments);
                });
                break;
            case "View All Employees":
                employeesTable = await getEmployeesTables("employees.id");
                console.table(employeesTable);
                doWhat();
                break;
            case "View Employees By Department":
                employeesTable = await getEmployeesTables("name");
                console.table(employeesTable);
                doWhat();
                break;
            case "View Employees by Manager":
                console.log("Haven't added this functionality yet.")
                doWhat();
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
                    choices: choicesArr("name", "roles", roles)
                }, {
                    name: "manager",
                    message: "Who is their manager?",
                    type: "list",
                    choices: choicesArr("name", database, employees)
                }]).then(function(answers) {
                    let matchRole = roles.find(role => role.title.toLowerCase() === answers.role.toLowerCase());
                    answers.role_id = matchRole.id;
                    let matchManager = employees.find(employee => ((employee.first_name.toLowerCase() + " " + employee.last_name.toLowerCase()) === answers.manager.toLowerCase()));
                    answers.manager_id = matchManager.id;
                    delete answers.role;
                    delete answers.manager;
                    elementAdd(answers, database)
                });
                break;
            case "Remove Employee":
                inquirer.prompt({
                    name: "remove",
                    message: "Which employee would you like to remove?",
                    type: "list",
                    choices: choicesArr("name", database, employees)
                }).then(function(answers) {
                    elementRemove(answers, database, employees);
                });
                break;
            case "Update Employee Role":
                inquirer.prompt([
                    {
                    name: "name",
                    message: "Which employee would you like to update?",
                    type: "list",
                    choices: choicesArr("name", "employees", employees)
                }, {
                    name: "role",
                    message: "What is their new role?",
                    type: "list",
                    choices: choicesArr("name", "roles", roles)
                }
                ]).then(function(answers) {
                    let matchName = employees.find(employee => answers.name === `${employee.first_name.toLowerCase()} ${employee.last_name.toLowerCase()}`)
                    let id = matchName.id;
                    let matchRole = roles.find(role => answers.role.toLowerCase() === role.title.toLowerCase())
                    let updatedRoleId = matchRole.id;
                    let obj = {id: id, updatedRoleId: updatedRoleId};
                    elementUpdate(obj, "employees")
                });
                break;
            case "Update Employee Manager":
                console.log("Haven't added this functionality yet.")
                doWhat();
                break;
            case "View All Roles":
                console.table(roles);
                doWhat();
                break;
            case "View Roles By Department":
                let rolesTable = await getRolesTables();
                console.table(rolesTable);
                doWhat();
                break;
            case "Add Role":
                inquirer.prompt([{
                    name: "title",
                    message: "What is the role's title?",
                    type: "input"           
                }, {
                    name: "salary",
                    message: "What is the role's salary?",
                    type: "input",
                }, {
                    name: "department_name",
                    message: "Which department does this role belong to?",
                    type: "list",
                    choices: choicesArr("name", "departments", departments)
                }]).then(function(answers) {
                    let match = departments.find(department => department.name.toLowerCase() === answers.department_name);
                    delete answers.department_name;
                    answers.department_id = match.id;
                    elementAdd(answers, database)
                });
                break;
            case "Remove Role":
                inquirer.prompt({
                    name: "remove",
                    message: "Which role would you like to remove?",
                    type: "list",
                    choices: choicesArr("name", database, roles)
                }).then(function(answers) {
                    elementRemove(answers, database, roles);
                });
                break;
            case "Update Role Department":
                console.log("Haven't added this functionality yet.")
                doWhat();
                break;
            case "Exit":
            default:
                connection.end();
                break;
        }

    });
            
} catch(err) {if (err) throw err;}
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
            return doWhat();
        })  
    })
}
function elementUpdate(obj, database) {
    return new Promise((resolve, reject) => {
        const query = 
`UPDATE ${database}
SET role_id = ${obj.updatedRoleId}
WHERE id = ${obj.id}`
        connection.query(query, function(err, res) {
            if (err) throw err;
            return doWhat();
        })
    })
}

function elementRemove(obj, database, databaseArr) {
    if (obj.remove === "None") {
        doWhat();
    };
    if (database === "departments") {
        var match = databaseArr.find(department => obj.remove === department.name)
    } else if (database === "roles") {
        var match = databaseArr.find(role => obj.remove === role.title)
    } else {
        var match = databaseArr.find(employee => obj.remove === `${employee.first_name.toLowerCase()} ${employee.last_name.toLowerCase()}`)
    }
        let id = match.id;
        connection.query(`DELETE FROM ${database} WHERE ?`, {id: id}, function(err, res) {
            if (err) throw err;
            return doWhat();
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
function getRolesTables() {
    return new Promise((resolve, reject) => {
        let query = `SELECT t2.name, title, salary
        FROM roles as t1
        INNER JOIN departments as t2 ON t1.department_id = t2.id
        ORDER BY t2.name;`;
        connection.query(query, function(err, res) {
            if (err) throw err;
            resolve(res);
        })
    })
}
function getEmployeesTables(order) {
    return new Promise((resolve, reject) => {
        let query = 
`SELECT employees.id, first_name, last_name, title, name, salary, manager_id
FROM employees
INNER JOIN roles ON role_id = roles.id
INNER JOIN departments ON departments.id = roles.department_id
ORDER BY ${order} ASC;`;
        connection.query(query, function(err, res) {
            if (err) throw err;
            resolve(res);
        })
    })
}

// Generates choices array for remove and ids (not great for manager)
function choicesArr(type, database, databaseArr) {
    var choices = [];
    switch (database) {
        case "departments":
            for (const department of databaseArr) {
                if (type === "name") {
                    choices.push((department.name).toLowerCase());
                } else {
                    choices.push(department.id);
                }
            };
            break;
        case "roles":
            for (const role of databaseArr) {
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
            for (const employee of databaseArr) {
                if (type === "name") {
                    let pushy = employee.first_name.toLowerCase()
                    pushy += " " + employee.last_name.toLowerCase()
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









