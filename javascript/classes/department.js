class Department {
    constructor(connection, name = null, id = null) {
        this.id = id;
        this.name = name;
        this.connection = connection;
    };
    addMySQL() {
        this.connection.query(
            "INSERT INTO departments SET ?",
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
            "SELECT * FROM departments;",
            function(err, res) {
                if (err) throw err;
                console.log(res);
                console.log("\n");
            });
    }

}



module.exports = Department;