var shopServices = require('../../services/shopServices');
const responseBuilder = require("../../helper/responseBuilder");
var path = require("path");
var jsonPath = path.join(__dirname, "..", "..", "docs", "shops.json");
const jsonFile = require('../../helper/jsonFile');
const medicines = require('../../docs/medicine.json');
const { resourceLimits } = require("worker_threads");

function saveShop(request, response) {
    let body = request.body;
    let data = shopServices.saveShop(body);
    response.send(data);
}

function updateShop(request, response) {
    let shops = jsonFile.getJsonFile(jsonPath);
    let body = request.body;
    let data = shopServices.updateShop(body);
    response.send(data);
}

function searchMedicine(request, response) {
    let body = request.query;
    let data = shopServices.searchMedicine(body);
    response.send(data);
}

function addMedicine(request, response) {
    let body = request.body;
    let data = shopServices.addMedicine(body);
    response.send(data);
}

function getShops(request, response) {
    let loggedInUser = request.user;
    let body = request.query;
    let data = shopServices.getShops(body, loggedInUser);
    response.send(data);
}

function checkMedicine(request, response) {
    let body = request.body;
    let data = shopServices.checkMedicine(body);
    response.send(data);
}


function placeOrder(request, response) {
    let order = request.body;
    let data = shopServices.placeOrder(order);
    response.send(data);
};

function getMedicineFromShop(request, response) {
    let loggedInUser = request.user;
    let body = request.body;
    let data = shopServices.getMedicineFromShop(body, loggedInUser);
    response.send(data);
}







module.exports = { saveShop, getShops, placeOrder, searchMedicine, checkMedicine, addMedicine, updateShop, getMedicineFromShop };