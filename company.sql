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

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;