const medicineUtils = require('../../utils/medicineUtils');
const medicineService = require('../../services/medicineService');
function addMedicines(req, res) {
    let result = medicineService.add(req);
    res.send(result);
}
function listMedicines(req, res) {
    let result = medicineService.list(req)
    res.send(result);
}
function getExpired(req, res) {
    let result = medicineService.expired(req);
    res.send(result);
}

function modifyMedicine(req, res) {
    let result = medicineUtils.change(req.body);
    res.send(result);
}
function removeMedicine(req, res) {
    let result = medicineUtils.statusChange(req.body);
    res.send(result);
}
function statusActive(req, res) {
    let result = medicineUtils.activate(req.body);
    res.send(result);
}
module.exports = {
    addMedicines,
    listMedicines,
    getExpired,
    modifyMedicine,
    removeMedicine,
    statusActive
}