
CREATE DATABASE bamazon_DB;
use bamazon_DB;

CREATE TABLE products (
item_id integer AUTO_INCREMENT,
product_name VARCHAR(50) NOT NULL,
department_name VARCHAR(50) NOT NULL,
price integer DEFAULT 0,
stock_quantity integer DEFAULT 0,
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Disposable_camera", "cameras", 45, 4);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("film", "cameras", 7, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("pen", "office", 2, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("paper", "office", 9, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("paper_clips", "office", 1, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("pencil", "office", 1, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("headphones", "electronics", 15, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("phone case", "electronics", 20, 16);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("chips", "food", 1, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES("burger", "food", 3, 20);
