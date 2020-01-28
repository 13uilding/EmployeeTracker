const mysql = require("mysql");
// const questions = require("./javascript/questionnaire/questions");
const Department = require("./javascript/classes/department");
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
    database: "company_db"
})


connection.connect(function(err) {
    if (err) throw err;
    // let department = new Department(connection);
    doWhat();
})

    // What would you like to do Questionnaire
function doWhat() {
    inquirer.prompt({
        name: "do",
        message: "What would you like to do?",
        type: "list",
        choices: testingDep
    }).then(function(answers) {
        let department = new Department(connection);
        switch (answers.do) {
            case "Add Department":
                department.addMySQL(doWhat);
                break;
            case "View All Departments":
                department.viewMySQL();
                doWhat();
                break;
            case "Remove Department":
                department.removeMySQL(doWhat);
                break;
            case "Exit":
            default:
                connection.end();
                break;
        }

    });
};








// Tests
// function resolveAfter2Seconds(x) { 
//     return new Promise(resolve => {
//       setTimeout(() => {
//         resolve(x);
//       }, 2000);
//     });
//   }
  
//   async function f1() {
//     var x = await resolveAfter2Seconds(10);
//     console.log(x); // 10
//   }


// Object switch case
// const doObj = {};
// for (const option of doArr) {
//     let action = option.split(" ")[0]
//     switch (action) {
//         case "Add":
//             doObj[option] = new Add
//     }

// }