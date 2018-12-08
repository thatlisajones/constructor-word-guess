DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
id INT AUTO_INCREMENT NOT NULL,
product_name VARCHAR(40) NOT NULL,
department_name VARCHAR(40) NOT NULL,
customer_cost DECIMAL(10,2) NOT NULL,
product_sales INT NOT NULL, 
stock_qty INT NOT NULL,
PRIMARY KEY (id));

CREATE TABLE departments (
id INT AUTO_INCREMENT NOT NULL,
department_id INT NOT NULL,
department_name VARCHAR(40) NOT NULL,
overhead_cost DECIMAL(10,2) NOT NULL,
PRIMARY KEY (id)
);