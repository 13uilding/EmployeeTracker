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
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jackson", "Vile", 1, 2),("Ryan", "Blue", 2, null),("Kyle", "Revort", 3, 4),("Dracula", "Winestein", 4, null),
	("Jacki", "Cirque", 5, 4),("Liz", "Green", 6, 5),("Carl", "Tubbottome", 7, 5),("Coral", "Chest", 8, 7),
	("Steve", "Brotherman", 9, null),("Jack", "Awn", 10, 9),("Elijah", "Planck", 11, 12),("Huebert", "Hell", 12, null);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;



SELECT first_name, last_name, title
FROM employees
INNER JOIN roles ON role_id = roles.id
ORDER BY first_name ASC
WHERE title = "Manager";

SELECT t.id, first_name, last_name, title, manager_id
FROM employees as t
INNER JOIN roles ON role_id = roles.id
ORDER BY first_name ASC;

SELECT t1.department_id, t2.name, title, salary
FROM roles as t1
INNER JOIN departments as t2 ON t1.department_id = t2.id
ORDER BY department_id DESC;