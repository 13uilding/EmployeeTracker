class AddDepartment {
    constructor(name) {
        // this.id = id;
        this.name = name;
    };

    addMySQL(connection) {
        connection.query(
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
}

class AddRole {
    constructor(id, title, salary, department_id) {
        this.id = id;
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    };
}

class AddEmployee {
    constructor(id, first_name, last_name, role_id, manager_id) {
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }
}


module.exports = {
    employee: AddEmployee,
    role: AddRole,
    department: AddDepartment
};