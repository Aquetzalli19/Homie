CREATE DATABASE HOMIE;

USE HOMIE;

CREATE TABLE inmuebles(
    id number(10) NOT NULL auto_increment,
    nombre varchar(255) NOT NULL, 
    tipo varchar(255) NOT NULL, 
    precio varchar(255) NOT NULL,
    cantCuartos number(10) NOT NULL, 
    cantBaños number(10) NOT NULL, 
    empresaConstructora varchar(255) NOT NULL, 
    descripcion varchar(255) NOT NULL, 
    ubicacion varchar(255) NOT NULL, 
    url_imagen varchar(255) NOT NULL, 
    estado varchar(255) NOT NULL, 
    encargado varchar(255) NOT NULL

    primary key (id);
);

CREATE TABLE users(
    id number(10) NOT NULL auto_increment primary key
    nombre varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    password varchar(255) NOT NULL

)