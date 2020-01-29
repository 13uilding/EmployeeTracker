const inquirer = require("inquirer");
const cTable = require("console.table");

class Department {
    constructor(connection, name = null, id = null) {
        this.id = id;
        this.name = name;
        this.connection = connection;
    };
    initAdd(escape) {
        let innerConnection = this.connection;
        innerConnection.query("SELECT * FROM departments", function(err, res) {
            if (err) throw err;
            let departments = [];
            for (const department of res) {
                departments.push(department.name);
            }
            inquirer.prompt({
                name: "add",
                message: "What department would you like to add?",
                type: "input",
                validate: function(answer) {
                    console.log(answer);
                    for (let department of departments) {
                        if (department === answer){
                            console.log("\nCan't create a department that already exists...\n")
                            return false;
                        }
                    }
                    return true;
                }
            }).then(function(answer) {
                innerConnection.query("INSERT INTO departments SET ?",
                    { name: answer.add }, function(err, res) {
                        if (err) throw err;
                        console.log(res.affectedRows + " department added!\n");
                        escape()
                    })
            });
        });
    };
    viewMySQL() {
        this.connection.query(
            "SELECT * FROM departments",
            function(err, res) {
                if (err) throw err;
                // let reps = res.length;
                console.table( res); // Change the view later
                console.log("\n\n\n");
            })
    }
    removeMySQL(escape) {
        let innerConnection = this.connection;
        innerConnection.query("SELECT * FROM departments", function(err, res) {
                if (err) throw err;
                let departments = [];
                for (const department of res) {
                    departments.push(department.name);
                }
                departments.push("None");
                inquirer.prompt({
                    name: "remove",
                    message: "Which department would you like to remove?",
                    type: "list",
                    choices: departments,
                }).then(function(answer) {
                    if (answer.remove === "None") {
                        escape();
                    };
                    for (let i = 0; i < res.length; i++) {
                        if (answer.remove === res[i].name) {
                            let id = res[i].id;
                            innerConnection.query("DELETE FROM departments WHERE ?",
                                {id: id}, function(err, res) {
                                  if (err) throw err;
                                  escape();
                            });
                        }
                    }
                })
            });
    }

}




module.exports = Department;


