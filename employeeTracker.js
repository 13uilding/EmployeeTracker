const mysql = require("mysql");
const questions = require("./javascript/questionnaire/questions");
const add = require("./javascript/classes/add");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Bqlbajaboy3!",
    database: "company_db"
})


connection.connect(function(err) {
    if (err) throw err;
    console.log("Do What")
    let answer = questions.doWhat();
    console.log("don't end yet");
    console.log(answer);
})





