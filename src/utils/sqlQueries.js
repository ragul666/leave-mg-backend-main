
async function query(sql, params) {
    const mysqlConnection = require('../database/connectMysql');
    const results = await mysqlConnection.execute(sql, params);
    return results[0];
}

module.exports = {
    query
}