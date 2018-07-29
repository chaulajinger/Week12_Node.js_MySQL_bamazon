/* Create Database */
CREATE DATABASE bamazon;

USE bamazon;
/* Create Table Products */
CREATE TABLE products(
  item_id INT auto_increment PRIMARY KEY,
  Product_Name VARCHAR(60) NOT NULL,
  Department_Name VARCHAR(60) NOT NULL,
  Price Decimal (6,2) NOT NULL,
  Stock_Quantity int(10) NOT NULL); 

/* adding product_sales column */

USE bamazon;
alter table products
add product_sales int after Stock_Quantity;


/* Updated product_sales column to multiply quantity and Price */

USE bamazon;
alter table products
update products set product_sales = (Price * Stock_Quantity)

/*Dropped column */
USE bamazon;
alter table products
drop column product_sales;

/* Create Table departments */
use bamazon;
create table departments(
  department_id int not null primary key,
  Department_Name VARCHAR(60) NOT NULL,
  over_head_costs int(10) NOT NULL); 
 