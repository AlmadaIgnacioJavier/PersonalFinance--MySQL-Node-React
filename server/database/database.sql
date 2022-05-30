	CREATE DATABASE budget;

	USE budget;

	SHOW TABLES;

	CREATE TABLE balance (
	  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	  mail TEXT,
	  consept TEXT,
	  type TEXT,
	  amount MEDIUMINT,
	  category TEXT,	 
	  date TEXT
	);

	DESCRIBE balance;

	SELECT * FROM balance;

	CREATE TABLE users (
	  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
	  mail TEXT,
	  password TEXT,
	  name TEXT
	);

	DESCRIBE users;
