CREATE DATABASE DB_Virtual_Flyer;

USE DB_Virtual_Flyer;

CREATE TABLE login (
id int AUTO_INCREMENT,
eMail varchar(100) NOT NULL,
password varchar(255) NOT NULL,
active boolean,
PRIMARY KEY(id)
);
