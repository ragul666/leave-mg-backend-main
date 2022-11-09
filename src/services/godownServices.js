let godowns = require('../docs/godown.json');
let utilsGodown = require('../utils/utilsGodown');
let responseBuilder = require('../helper/responseBuilder');
var jsonFile = require('../helper/jsonFile');
var jsonPath = ('src/docs/godown.json');
var orders = require('../docs/orders.json');
var shopData = require('../docs/shops.json');
const res = require('express/lib/response');
const fs = require('fs');

function addGodown(body){
    let result = utilsGodown.pushGodown(body);
    console.log(result);
    if(result){
        return responseBuilder.success("result");
    }else{
        return responseBuilder.failure("No Data!");
    }
}

function addMedicine(medicineRequest){
    var godownExist = false;
    for (let elem of godowns) {
        if (elem.godownId == medicineRequest.godownId) {
            godownExist = true;
            if (elem.medicines) {
                elem.medicines = elem.medicines.concat(medicineRequest.medicines);
            } else {
                elem.medicines = medicineRequest.medicines;
            }
            break;
        }
    }
    if (godownExist) {
        jsonFile.writeJsonFile(jsonPath, godowns);
        return responseBuilder.success("Medicines added successfully");
    } else {
        return responseBuilder.failure("Invalid Request");
    }
}

function getMedicinebyGodownId(requestedId){
    let result = utilsGodown.getMedicineByGodownId(requestedId);
    if(result){
        return responseBuilder.success(result);
    }else{
        return responseBuilder.failure("No Such Data!");
    }
}

function updateMedicineByGodownId(medicineRequest){
    let godownExists = false;
    let medicineExists = false;

    for (let elem of godowns) {
        if (elem.godownId == medicineRequest.godownId) {
            godownExists = true;
            let med = elem.medicines;
            let medBody = medicineRequest.medicines;
            for (let val of med) {
                for (let val2 of medBody) {
                    if (val.medicineId == val2.medicineId) {
                        medicineExists = true;
                        if (val2.medicineName) {
                            val.medicineName = val2.medicineName;
                        }
                        if (val2.medicineType) {
                            val.medicineType = val2.medicineType;
                        }
                        if (val2.medicineCompany) {
                            val.medicineCompany = val2.medicineCompany;
                        }
                        if (val2.unitPrice) {
                            val.unitPrice = val2.unitPrice;
                        }
                        if (val2.medicineQuantity) {
                            val.medicineQuantity = val2.medicineQuantity;
                        }
                        if (val2.manufactureDate) {
                            val.manufactureDate = val2.manufactureDate;
                        }
                        if (val2.expiryDate) {
                            val.expiryDate = val2.expiryDate;
                        }
                        if (val2.medicineStatus) {
                            val.medicineStatus = val2.medicineStatus;
                        }
                    } else {
                        medicineExists;
                    }
                }
            }
        } else {
            godownExists;
        }
    }
    if (godownExists && medicineExists) {
        jsonFile.writeJsonFile(jsonPath, godowns);
        return responseBuilder.success("Updated successfully");
    } else if (godownExists && !medicineExists) {
        return responseBuilder.failure("No Such Medicine ID");
    } else if (!godownExists) {
        return responseBuilder.failure("No Such Godown ID");
    }
}


function getGodowns(body, loggedInUser){
    let data;
    let value = [];
    let length = Object.keys(body).length;

    if (length == 0) {
        if (loggedInUser.role === 'superuser' && loggedInUser.role !== 'godownAdmin') {
            data = godowns;
        }
        else {
            data = godowns.filter((e) => {
                if(e.godownId === loggedInUser.godownId){
                    let med = e.medicines;
                     for (let elem of med) {
                         if (elem.medicineStatus == 'active') {
                             value.push(elem);
                            }
                        }
                        data = value;
                }
                return data;
            });
        }
    }
    else {
        data = godowns.filter((e) => {
            if (loggedInUser.role === 'godownAdmin') {
                let isValid = true;
                for (key in body) {
                    isValid = isValid && e[key] == body[key];
                }
                return isValid;
            }
            else {
                let isValid = true;
                for (key in body) {
                    isValid = isValid && e[key] == body[key] && loggedInUser.godownId === e.godownId;
                }
                return isValid;
            }
        });
    }
    let godownList = data;
    return responseBuilder.buildSucessResponse( godownList);
}

function getAllGodowns(body, loggedInUser){
    if (godowns.length <= 0) {
        response.send(responseBuilder.noData());
    }
    else {
        if (loggedInUser.role !== "godownAdmin" && loggedInUser.role !== "cus" && loggedInUser.role !== "shopEmp") {
                return responseBuilder.success(godowns);
        } else {
            body.godownId = loggedInUser.godownId;
            let respBody = utilsGodown.getGodown(body);
            return respBody;
        }
    }
}


function getMedicine(body){
    let length = Object.keys(body).length;
    let data;
    if (length == 0 || body == null) {
        response.send(responseBuilder.buildFailureResponse("Medicine Value is missing!"));
    } else {
        data = godowns.filter((godown) => {
            if (godown.medicines) {
                if (body.medicineName) {
                    return godown.medicines.some(medicine => medicine.medicineName == body.medicineName);
                }
                if (body.medicineId) {
                    return godown.medicines.some(medicine => medicine.medicineId == body.medicineId);
                }
                if (body.medicineCompany) {
                    return godown.medicines.some(medicine => medicine.medicineCompany == body.medicineCompany);
                }
                if (body.medicineStatus) {
                    return godown.medicines.some(medicine => medicine.medicineStatus == body.medicineStatus);
                }
                if (body.medicineType) {
                    return godown.medicines.some(medicine => medicine.medicineType == body.medicineType);
                }
            }
        });
        return responseBuilder.buildSucessResponse({ godownsList: data });
    }
}




function getMedicinesFromGodowns(body, loggedInUser){
    if (godowns.length <= 0) {
        return responseBuilder.noData();
    }
    else if(loggedInUser.role == 'superuser' || loggedInUser.role == 'shopAdmin'){
        let result = utilsGodown.getMedicinesFromGodowns();
        if(body.medicineName){
            let filteredData = [];
            for(let med of result){
                if(med.medicineName == body.medicineName){
                    filteredData.push(med);
                }
            }
            return responseBuilder.success(filteredData);
        }else{
            return responseBuilder.success(result);
        }
    }else if(loggedInUser.role == 'godownAdmin'){
        let data = utilsGodown.getMedicinesFromGodowns();
        let result = [];
        if(data){
            for(let elem of data){
                if(loggedInUser.godownId == elem.godownId){
                    result.push(elem);
                }
            }
            if(body.medicineName && result){
                let filteredData = [];
                for(let med of result){
                    if(med.medicineName == body.medicineName){
                        filteredData.push(med);
                    }
                }
                return responseBuilder.success(filteredData);
            }
        }else{
            return responseBuilder.failure("No data available!");
        }
        return responseBuilder.success(result);
    }else{
        return responseBuilder.failure("User has no access!!");
    }
}

function viewOrderDeliveryStatus(body){
    let result = [] ;
    let value = "OK";
    let statusExists = false;
    if(body.key != "aple123"){
        //return error => INVALID KEY
    }else{
        
    }
    if(body.transactionId || body.status){
        value = body.transactionId;
        for(let elem of orders){
            if(elem.transactionId == body.transactionId){
                value = "transaction id valid";
                if(elem.status !== 'delivered' && elem.vendorCode){
                    elem.status = body.status;
                    result.push(elem);
                    statusExists = true;
                    if(elem.status == 'delivered'){
                        let medicines;
                        let filter = orders.find((order)=> {
                            if(order.transactionId == body.transactionId){
                               return order;
                            }
                        });
                        let shopId = filter.shopId;
                        medicines=filter.medicines;
                        let shop = shopData.find((shop)=> shop.id==shopId);
                        let shopMedi =shop.medicines;
                        shopMedi.forEach((medicine)=>{       
                            medicines.forEach((medi)=>{
                                if(medi.name===medicine.medicineName){
                                        medicine.medicineQuantity=medicine.medicineQuantity+medi.quantity;
                                }
                            })
                        })
                        // let newShops = JSON.stringify(shopData,null,2);
                        jsonFile.writeJsonFile('src/docs/shops.json',shopData);
                    }
                }else if(elem.status){
                    result.push(elem);
                    return value = responseBuilder.success(result);
                }
            }
        }
    }
    if(statusExists){
        jsonFile.writeJsonFile('src/docs/orders.json', orders);
        return value = responseBuilder.success(result);
    }else{
        return value = responseBuilder.failure("InvalidStatus")
    }
}

module.exports = {
    addGodown,
    addMedicine,
    getMedicinebyGodownId,
    updateMedicineByGodownId,
    getAllGodowns,
    getGodowns,
    getMedicine,
    getMedicinesFromGodowns,
    viewOrderDeliveryStatus
}