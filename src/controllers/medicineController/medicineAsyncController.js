const medicineService = require('../../services/medicineService');

async function addMedicines(req, res) {
    if (process.env.DATABASE_TYPE === "mysql") {
        let result = await medicineService.addSql(req);
        res.send(result);
    }
}
async function listMedicines(req, res) {
    if (process.env.DATABASE_TYPE === "mysql") {
        let result = await medicineService.listSql(req);
        res.send(result);
    }
}
async function getExpired(req, res) {
    if (process.env.DATABASE_TYPE === "mysql") {
        let result = await medicineService.expiredSql(req);
        res.send(result);
    }
}


module.exports = {
    addMedicines,
    listMedicines,
    getExpired
}