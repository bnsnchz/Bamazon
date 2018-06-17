CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
	id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    inventory INT NOT NULL,
    PRIMARY KEY(id)
);

INSERT INTO products SET
product_name = "Ray Ban Wayfarers",
department_name = "accesories",
price = 159.99,
inventory = 10;

INSERT INTO products SET
product_name = "Rolex Submariner",
department_name = "accesories",
price = 4599.99,
inventory = 5;

INSERT INTO products SET
product_name = "Nike Kobe 8",
department_name = "shoes",
price = 149.99,
inventory = 7;

INSERT INTO products SET
product_name = "Cole Haan Lunar Chucka",
department_name = "shoes",
price = 249.99,
inventory = 10;

INSERT INTO products SET
product_name = "Macbook Pro Retina",
department_name = "electronics",
price = 1999.99,
inventory = 2;

INSERT INTO products SET
product_name = "Nintendo Switch",
department_name = "electronics",
price = 259.99,
inventory = 0;

INSERT INTO products SET
product_name = "iPhone X",
department_name = "electronics",
price = 999.99,
inventory = 10;

INSERT INTO products SET
product_name = "Tonka Truck",
department_name = "toys",
price = 29.99,
inventory = 20;

INSERT INTO products SET
product_name = "Hot Wheels",
department_name = "toys",
price = 0.99,
inventory = 10;

INSERT INTO products SET
product_name = "Birkenstock Sandals",
department_name = "shoes",
price = 59.99,
inventory = 100;

SELECT * FROM products;