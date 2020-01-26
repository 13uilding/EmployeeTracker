const inquirer = require("inquirer");

const doArr = [
    "View All Employees", "View Employees By Department", "View Employees by Manager",
    "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee Manager",
    "View All Roles", "View Roles By Department", "Add Role", "Remove Role", 
    "Update Role Department", "View All Departments", "Add Department",
    "Remove Department"
    ];
const testingDep = doArr.splice(12);
const testingRoles = doArr.splice(7, 12);
const testingEmp = doArr.splice(0, 7);

module.exports = {
    // What would you like to do Questionnaire
    doWhat: inquirer.prompt({
        name: "do",
        message: "What would you like to do?",
        type: "list",
        choices: testingDep
    }).then(answers => {
        console.log(answers);
    }),
    
};