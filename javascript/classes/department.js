const inquirer = require("inquirer");

class Department {
    constructor(connection, name = null, id = null) {
        this.id = id;
        this.name = name;
        this.connection = connection;
    };
    addMySQL() {
        this.connection.query( "INSERT INTO departments SET ?",
            {
                name: this.name
            },
            function(err, res) {
                if (err) throw err;
                // console.log(res.affectedRows + " department added!\n");
            }
        )
    }
    viewMySQL() {
        this.connection.query(
            "SELECT * FROM departments",
            function(err, res) {
                if (err) throw err;
                console.log(res); // Change the view later
            });
    }
    removeMySQL(escape) {
        let innerConnection = this.connection;
        innerConnection.query("SELECT * FROM departments", function(err, res) {
                if (err) throw err;
                let departments = [];
                for (const department of res) {
                    departments.push(department.name);
                }
                // console.log(innerConnection);

                inquirer.prompt({
                    name: "remove",
                    message: "Which department would you like to remove?",
                    type: "list",
                    choices: departments
                }).then(function(answer) {
                    for (let i = 0; i < res.length; i++) {
                        if (answer.remove === res[i].name) {
                            let id = res[i].id;
                            innerConnection.query("DELETE FROM departments WHERE ?",
                                {
                                  id: id
                                },
                                function(err, res) {
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


