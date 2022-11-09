require('dotenv').config
var mysql = require('mysql2/promise');

const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

let mysql=" SELECT * FROM employee;";
console.log("Creating connection pool...")
var connection = mysql.createPool(dbConfig);


module.exports = connection;