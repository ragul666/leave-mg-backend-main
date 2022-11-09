const jsonMedicineUtils = require('../utils/medicineUtils');
const sqlMedicineUtils = require('../utils/sql/medicineSqlUtils');

function add(req) {
    let body = req.body;
    if (process.env.DATABASE_TYPE === "jsonFile")
    return jsonMedicineUtils.add(body);
}

async function addSql(req) {
    let body = req.body;
    return await sqlMedicineUtils.add(body);
}


function list(req) {
    let body = req.body;
    if (process.env.DATABASE_TYPE === "jsonFile")
    return jsonMedicineUtils.list(body);
}

async function listSql(req) {
    let body = req.body;
    return await sqlMedicineUtils.list(body);
}

function expired(req) {
    if (process.env.DATABASE_TYPE === "jsonFile")
     return jsonMedicineUtils.expired();
    
}

async function expiredSql(req) {
    let body = req.body;
    return await sqlMedicineUtils.expired(body);
}
function change(req,res){
    if (process.env.DATABASE_TYPE === "jsonFile")
    return jsonMedicineUtils.change(req,res)
}
function statusChange(req,res){
    if(process.env.DATABASE_TYPE==="jsonFile")
    return jsonMedicineUtils.statusChange(req,res)
}
function activate(req,res){
    if(process.env.DATABASE_TYPE==="jsonFile")
    return jsonMedicineUtils.activate(req,res)
}


module.exports = {
    add,
    addSql,
    list,
    listSql,
    expired,
    expiredSql,
    change,
    statusChange,
    activate
}