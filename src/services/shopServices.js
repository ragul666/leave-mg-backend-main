var responseBuilder = require('../helper/responseBuilder');
var path = require("path");
var jsonPath = ('src/docs/shops.json');
var jsonFile = require('../helper/jsonFile');
const medicines = require('../docs/medicine.json');
let shops = require('../docs/shops.json');


function saveShop(body){
   
    let shopExists = false;
    for (const shop of shops) {
        if (shop.email === newShop.email) {
            shopExists = true;
            break;
        }
    }
    if (shopExists) {
        return responseBuilder.buildFailureResponse("Shop with email already exists!");
    } else {
        let id = shops.length + 1;
        Object.assign(newShop, { id: id });
        shops.push(newShop);
        jsonFile.writeJsonFile(jsonPath, shops);
        return responseBuilder.buildSucessResponse({ shop: newShop });
    }
}

function updateShop(body){
    shops.forEach((shop, index) => {
        if (shop.id === body.id) {
            shops[index] = body;
        }
    });
    jsonFile.writeJsonFile(jsonPath, shops);
    return responseBuilder.buildSucessResponse({ shop: body });
}

function searchMedicine(body){
    let data;
    let length = Object.keys(body).length;
    if (length == 0 || body.medicineName == null) {
        responseBuilder.buildFailureResponse("Medicine name is missing!");
    } else {
        data = shops.filter((shop) => {
            if (shop.medicines) {
                return shop.medicines.some(medicine => medicine.medicineName == body.medicineName);
            }
        });
        return responseBuilder.buildSucessResponse({ shopsList: data });
    }
}

function addMedicine(body){
    let shopExists = false;
    for (let shop of shops) {
        if (shop.id === body.shopId) {
            shopExists = true;
            if (shop.medicines) {
                shop.medicines = shop.medicines.concat(body.medicines);
            } else {
                shop.medicines = body.medicines;
            }
            break;
        }
    }
    if (shopExists) {
        jsonFile.writeJsonFile(jsonPath, shops);
        return responseBuilder.buildSucessResponse({ message: "Medicines added sucessfully" });
    } else {
        return responseBuilder.buildFailureResponse("Shop with given shop id does exist!");
    }
}


function getShops(body, loggedInUser){
    let data;
    let length = Object.keys(body).length;
    let filters = body;
    if (length == 0) {
        if (loggedInUser.role === "superuser" || loggedInUser.role === "cus") {
            data = shops;
        } else {
            data = shops.filter((shop) => {
                return shop.id === loggedInUser.shopId;
            });
        }
    } else {
        data = shops.filter((shop) => {
            if (loggedInUser.role === "superuser" || loggedInUser.role === "cus") {
                let isValid = true;
                for (key in filters) {
                    isValid = isValid && shop[key] == filters[key];
                }
                return isValid;
            } else {
                let isValid = true;
                for (key in filters) {
                    isValid = isValid && shop[key] == filters[key] && loggedInUser.shopId === shop.id;
                }
                return isValid;
            }
        });
    }
    return responseBuilder.buildSucessResponse({ shopsList: data });
}

function checkMedicine(body){
    let medicine;
    for (let shop of shops) {
        let filteredMedicine = shop.medicines.find(medicine => medicine.medicineName == body.medicineName);
        if (filteredMedicine) {
            medicine = filteredMedicine;
        } else {
            return responseBuilder.buildFailureResponse("Shop doesn't have the medicine in stock!");
        }
        break;
    }
    return responseBuilder.buildSucessResponse({ medicine: medicine });
}


function placeOrder(order){
    for (let shop of shops) {
        if (shop.id === order.shopId) {
            let medicine = shop.medicineList.find(medicine => medicine.name == order.medicineName);
            if (medicine) {
                if (medicine.quantity < order.quantity) {
                    responseBuilder.buildFailureResponse("Shop does not have sufficient quantity of medicine!");
                } else {
                    if (shop.orders) {
                        shop.orders.push(order);
                    } else {
                        shop.orders = [order];
                    }
                }
            } else {
                responseBuilder.buildFailureResponse("Shop does not have the medicine in stock!");
            }
            break;
        }
    }
    jsonFile.writeJsonFile(jsonPath, shops);
    return responseBuilder.buildSucessResponse({ message: "Order placed sucessfully" });
}


function getMedicineFromShop(body, loggedInUser){
    let value = [];
    let newValue = [];
    let finalData = [];
    for (let elem of shops) {
        for (let data of elem.medicines) {
            if (data.medicineId) {
                data['shopId'] = elem.id;
                value.push(data)
            }
        }
    }
    for (let elem of medicines) {
        for (let data of value) {
            if (data.medicineId == elem.id) {
                newValue.push(data);
            }
        }
        if (newValue != 0) {
            finalData.push(newValue);
        }
        newValue = [];

    }
    if (loggedInUser.role == "superuser") {
        if (body.medicineName) {
            let filtersData = [];
            for (let elem of value) {
                if (body.medicineName == elem.medicineName) {
                    filtersData.push(elem)
                }

                else {
                    return (responseBuilder.failure("Medicine Not available"))
                }
                return (responseBuilder.success(filtersData))

            }
        }
        return (responseBuilder.success(finalData))

    }
    else if(loggedInUser.role == "cus"){
        return (responseBuilder.success(value))
    }


    else if (loggedInUser.role == "shopAdmin" || loggedInUser.role == "shopEmp") {
        let result = [];
        if (value) {
            data = value.filter((elem) => {
                if (loggedInUser.shopId == elem.shopId)
                    result.push(elem)
            });
            if (body.medicineName) {
                let filtersData = [];
                for (let elem of value) {
                    if (body.medicineName == elem.medicineName) {
                        filtersData.push(elem)
                    }
                    else {
                        return (responseBuilder.failure("Mediciine not available"))
                    }
                    return (responseBuilder.success(filtersData))
                }
            }
        } else {
            data = elem.filter((medicine) => {
                return medicine.finalData(medicine => medicine.medicineName == request.body.medicineName);

            });
        }
        return (responseBuilder.success(result))
    }
    else {
        return (responseBuilder.failure("User access denied"));
    }
}



module.exports = {
    saveShop,
    updateShop,
    searchMedicine,
    addMedicine,
    getShops,
    checkMedicine,
    placeOrder,
    getMedicineFromShop
}