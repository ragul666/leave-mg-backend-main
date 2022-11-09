var sqlQueries = require('../sqlQueries');

async function add(body) {
    var sqlQuery = `INSERT INTO medicines (name,expiryDate,manufactureDate,company,medicineType,status) VALUES ('${body.name}','${body.expiryDate}','${body.manufactureDate}','${body.company}','${body.medicineType}','active')`;
    var result = await sqlQueries.query(sqlQuery);
    return result;
}


async function list(body) {
    var sqlQuery = `select * from  medicines`;
    var rows = await sqlQueries.query(sqlQuery);
    return rows;
}

async function expired(body) {
    var sqlQuery = `select * from  medicines where status ='expired'`;
    var rows = await sqlQueries.query(sqlQuery);
    return rows;
}


module.exports = {
    add,
    list,
    expired
}