let utilsGodown = require('../../utils/utilsGodown');
let godownServices = require('../../services/godownServices');
let responseBuilder = require('../../helper/responseBuilder');
let godown = require('../../docs/godown.json');
var jsonPath = ('src/docs/godown.json');
const jsonFile = require('../../helper/jsonFile');
const { value } = require('../../helper/constant');

const encryption = require('../../helper/encryption');



function addGodown(request, response) {
    let body = request.body;
    let data = godownServices.addGodown(body);
    console.log(data);
    response.send(data);
}

function addMedicine(request, response) {
    let medicineRequest = request.body;
    let data = godownServices.addMedicine(medicineRequest);
    response.send(data);
}


function getMedicineByGodownId(request, response) {
    let requestedId = request.params.godownId;
    let data = godownServices.getMedicinebyGodownId(requestedId);
    response.send(data);
}


function getGodowns(request, response){
    let loggedInUser = request.user;
    let body = request.query;
    let data = godownServices.getGodowns(body, loggedInUser);
    response.send(data);
}

function getMedicine(request, response) {
    let body = request.body;
    let data = godownServices.getMedicine(body);
    response.send(data);
}



function updateMedicineByGodownId(request, response) {
    let medicineRequest = request.body;
    let data = godownServices.updateMedicineByGodownId(medicineRequest);
    response.send(data);
}

function removeMedicine(request, response) {
    let loggedInUser = encryption.decrypt(request.headers.authtoken).user;
    let removeRequest = request.body;
    let value = [];
    let data;
    let godownExists = false;
    let medicineExists = false;
    let medLists = utilsGodown.getMedicinesFromGodowns();
    if(loggedInUser.role == 'superuser' || loggedInUser.role == 'godownAdmin'){
        medLists = medLists.filter((e) => {
            if(e.godownId == removeRequest.godownId && e.medicineId == removeRequest.medicineId){
                godownExists = true;
                medicineExists = true;
                e.medicineStatus = "inactive";
                for(let elem of godown){
                    if(e.godownId == elem.godownId){
                        for(let med of elem.medicines){
                            if(e.medicineId == med.medicineId){
                                delete e.godownId;
                                med = e;
                                console.log(elem);
                            }
                            if(med.medicineStatus == "active"){
                                value.push(med);
                            }
                        }
                    }
                }
            }
        })
        if (godownExists && medicineExists) {
            //  jsonFile.writeJsonFile(jsonPath, godown);
            response.send(responseBuilder.success(value));
        }
        // } else if (godownExists && !medicineExists) {
        //     response.send(responseBuilder.failure("No Such Medicine ID"));
        // } else {
        //     response.send(responseBuilder.failure("No Such Godown ID!"));
        // }
    }else{
        response.send(responseBuilder.failure("User Access denied!"));
    }
}

function getAllGodowns(request, response) {
    let loggedInUser = request.user;
    let body = request.body;
    let data = godownServices.getAllGodowns(body, loggedInUser);
    response.send(data);
}

function getMedicinesFromGodowns(request, response) {
    let loggedInUser = request.user;
    let body = request.body;
    let data = godownServices.getMedicinesFromGodowns(body, loggedInUser);
    response.send(data);
}

function viewOrderDeliveryStatus(request, response){
    // let loggedInUser = request.user;
    let body = request.body;
    let data = godownServices.viewOrderDeliveryStatus(body);
    response.send(data);
}

module.exports = {
    addGodown,
    getGodowns,
    addMedicine,
    getMedicine,
    getMedicineByGodownId,
    updateMedicineByGodownId,
    removeMedicine,
    getAllGodowns,
    getMedicinesFromGodowns,
    viewOrderDeliveryStatus
}