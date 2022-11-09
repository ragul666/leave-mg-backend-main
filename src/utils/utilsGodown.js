let responseBuilder = require('../helper/responseBuilder');
let godown = require('../docs/godown.json');
let jsonFile = require('../helper/jsonFile');
var jsonPath = ('src/docs/godown.json');




function pushGodown(body) {
    body['godownId'] = godown.length + 1;
    body['godownLocation'] = body.godownLocation.charAt(0).toUpperCase() +
        body.godownLocation.substring(1);
    godown.push(body);
    // let data = jsonFile.writeJsonFile(jsonPath, godown);
    let value = JSON.stringify(godown, null, 2);
    let data = responseBuilder.addData(value, 'src/docs/godown.json');
    console.log(data);
    return data;
}


function getMedicineByGodownId(data) {
    let result = godown.filter(e => e.godownId == data);
    if (result.length > 0) {
        let val;
        for(let elem of result){
            val = elem.medicines;
        }
        return responseBuilder.success(val);
    } else {
        return responseBuilder.failure("Invalid Request");
    }
}


function getGodown(body) {
    let result = [];
    for (let elem of godown) {
        if (body.godownId) {
            if (elem.godownId == body.godownId) {
                result.push(elem);
            }
        } else if (body.godownLocation) {
            if (elem.godownLocation == body.godownLocation) {
                result.push(elem);
            }
        } else if (body.godownPincode) {
            if (elem.godownPincode == body.godownPincode) {
                result.push(elem);
            }
        }
        else {
            return responseBuilder.error();
        }
    }
    return responseBuilder.success(result);
}

function getMedicinesFromGodowns(){
    let value = [];
    for(let elem of godown){
        for(let medData of elem.medicines){
            if(medData.medicineId){
                medData.godownId = elem.godownId;
                value.push(medData);
            }
        }
    }
    return value;
}




module.exports = {
    pushGodown,
    getMedicineByGodownId,
    getGodown,
    getMedicinesFromGodowns
}