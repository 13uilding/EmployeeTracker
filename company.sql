DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments(
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY
    , name VARCHAR(30) NOT NULL
);


CREATE TABLE roles(
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY
    , title VARCHAR(30) NOT NULL
    , salary DECIMAL NOT NULL
    , department_id INT NOT NULL
);

CREATE TABLE employees(
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY
    , first_name VARCHAR(30) NOT NULL
    , last_name VARCHAR(30) NOT NULL
    , role_id INT NOT NULL
    , manager_id INT
);

INSERT INTO departments (name)
VALUES ("Production"), ("R&D"), ("Purchasing"), ("Marketing"), ("HR"), ("Accounting and Finance");
INSERT INTO roles (title, salary, department_id)
VALUES ("Recruiter", 38000.00, 5),("Manager", 58000.00, 5),("Content Creator", 38000.00, 4),("Manager", 57000.00, 4),
("Manager", 56000.00, 1),("Producer", 43000.00, 1),("Manager", 55000.00, 2),("Intern", 32000.00, 2),("Manager", 60000.00, 3),
("Inventory", 36000.00, 3),("Accountant", 44000.00, 6),("Manager", 63000.00, 6);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

SELECT t2.year, t2.position, t2.artist, t1.song, t2.album
FROM top5000 AS t1  
INNER JOIN top_albums AS t2 ON (t1.artist, t1.year) = (t2.artist, t2.year)
ORDER BY t2.position ASC;

SELECT title, salary, t1.department_id, t2.name
FROM roles as t1
INNER JOIN departments as t2 ON t1.department_id = t2.id
ORDER BY department_id DESC;
