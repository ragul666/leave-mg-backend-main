var mysqlConnection = require('../../database/connectMysql');


var createQuery = "CREATE TABLE IF NOT EXISTS medicines (`id` INT AUTO_INCREMENT PRIMARY KEY,`name` VARCHAR(255),`expiryDate` VARCHAR(64),`manufactureDate` VARCHAR(64), `company` VARCHAR(64), `medicineType` VARCHAR(64), `status` VARCHAR(32))";

async function medicineSchemaQuery() {
    await mysqlConnection.query(createQuery);
}

module.exports = medicineSchemaQuery;