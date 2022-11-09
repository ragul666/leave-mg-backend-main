const ordersData = require('../docs/orders.json');
const ping = require('./ping');
const responseBuilder = require('../helper/responseBuilder');
const constant = require('../helper/constant');
const medicineData = require('../docs/medicine.json');
const shopData = require('../docs/shops.json');
const godownData = require('../docs/godown.json');
const { v4: uuidv4 } = require('uuid');
const vendors = require('../docs/vendor.json');
// const vendorFolder = require('../vendors/vendorsServices');

const updateStatusApproval = (request) => {
    let loggedInUser = request.user;
    let medicines;
    let body = request.body;
    let godownId = body.godownId;
    let transactionId = body.transactionId;
    let cost = 0;
    if (loggedInUser.role === "shopAdmin") {
        let filter = ordersData.find((order) => {
            if (order.transactionId == transactionId) {
                return order
            }
        });
        if (filter == null) {
            return responseBuilder.errorMsg(constant.validator.notExist)
        }
        let data = [];
        let bodyMedicines = body.medicines;
        filter.status = 'godown pending'
        filter.godownId = godownId;
        medicines = filter.medicines;
        let godown = godownData.find((godown) => godownId === godown.godownId)
        let unitPrice;
        godown.medicines.forEach((medicine) => {
            body.medicines.forEach((medi) => {
                if (medi.name === medicine.medicineName)
                    unitPrice = medicine.unitPrice;
            })
        })
        medicines.forEach((medicine) => {
            medicineData.forEach((medi) => {
                if (medicine.name == medi.name) {
                    bodyMedicines.forEach((bodyMedi) => {
                        if (bodyMedi.name == medicine.name) {
                            medi['unitPrice'] = unitPrice;
                            medi['quantity'] = bodyMedi.quantity;
                            data.push(medi)
                        }
                    })
                }
            })
        })
        data.forEach((medi) => {
            if (medi.quantity <= 1000) {
                cost = cost + (medi.quantity * medi.unitPrice);
            }
            else
                return responseBuilder.errorMsg(constant.medicine.exceedQuantityGodown);
        })
        filter.medicines = data;
        filter['totalCost'] = cost
    }
    else if (loggedInUser.role === "godownAdmin") {
        let filter = ordersData.find((order) => {
            if (order.transactionId == transactionId)
                return order
        });
        if (filter == null) {
            return responseBuilder.errorMsg(constant.validator.notExist)
        }
        filter.status = 'godown Approved'
        medicines = filter.medicines;
    }
    else if (loggedInUser.role === 'godownShipment') {
        let filter = ordersData.find((order) => {
            if (order.transactionId == transactionId)
                return order
        });
        if (filter == null) {
            return responseBuilder.errorMsg(constant.validator.notExist)
        }
        filter.status = 'shipped';
        filter.vendorCode = body.vendorCode
        medicines = filter.medicines;
        let godown = godownData.find((godown) => godown.godownId === filter.godownId);
        let godownMedi = godown.medicines;
        godownMedi.forEach((medicine) => {
            medicines.forEach((medi) => {
                if (medi.medicineName === medicine.MedicineName) {
                    if (medicine.medicineQuantity > medi.quantity)
                        medicine.medicineQuantity = medicine.medicineQuantity - medi.quantity;
                }
            })
        })
        let newGodown = JSON.stringify(godownData, null, 2)
        ping.writeData('src/docs/godown.json', newGodown);
        if (filter.status == 'shipped') {
            if (transactionId) {
                let baseURL = 'http://localhost:2000/Vendors/viewDeliveries';
                let data = JSON.stringify({
                    "transactionId": transactionId,
                    "deliveryAddress": "ping1234",
                    "companyName": "abc",
                });
                let vendorAxios = hook(data, baseURL);
                console.log(vendorAxios);
            }
        }
    }
    else {
        return responseBuilder.errorMsg(constant.role.noAccess);
    }
    let data = JSON.stringify(ordersData, null, 2);
    ping.writeData('src/docs/orders.json', data);
    let incompleteOrders = ordersData.filter((order) => {
        if (order.transactionId == transactionId)
            return order.status !== "completed";
    })
    let result = responseBuilder.list(incompleteOrders);
    return result;
}

const updateStatusReject = (request) => {
    let loggedInUser = request.user;
    let body = request.body;
    let transactionId = body.transactionId;
    if (loggedInUser.role === "shopAdmin") {
        let filter = ordersData.find((order) => order.transactionId === transactionId);
        if (filter == null) {
            return responseBuilder.errorMsg(constant.validator.notExist)
        }
        filter.status = 'shop rejected'
    }
    else if (loggedInUser.role === "godownAdmin") {
        let filter = ordersData.find((order) => order.transactionId === transactionId);
        if (filter == null) {
            return responseBuilder.errorMsg(constant.validator.notExist)
        }
        filter.status = 'godown rejected'
    }
    else {
        return responseBuilder.errorMsg(constant.role.noAccess);
    }
    let data = JSON.stringify(ordersData, null, 2);
    ping.writeData('src/docs/orders.json', data);
    let incompleteOrders = ordersData.filter((order) => {
        if (order.transactionId == transactionId)//
            return order.status !== "completed";
    })
    let result = responseBuilder.list(incompleteOrders);
    return result;
}
const updateStatusIncomplete = (request) => {
    let loggedInUser = request.user;
    let body = request.body;
    let transactionId = body.transactionId;
    if (loggedInUser.role === "shopAdmin") {
        let filter = ordersData.find((order) => order.transactionId === transactionId);
        if (filter == null) {
            return responseBuilder.errorMsg(constant.validator.notExist)
        }
        filter.status = 'incomplete'
    }
    else {
        return responseBuilder.errorMsg(constant.role.noAccess);
    }
    let data = JSON.stringify(ordersData, null, 2);
    ping.writeData('src/docs/orders.json', data);
    let completeOrders = ordersData.filter((order) => {
        if (order.transactionId == transactionId)
            return order.status === "incomplete";
    })
    let result = responseBuilder.list(completeOrders);
    return result;
}

const getOrders = (request) => {
    let loggedInUser = request.user;
    let data;
    let length = Object.keys(request.query).length;
    let filters = request.query;
    if (length == 0) {
        if (loggedInUser.role === "superuser") {
            data = ordersData;
        }
        else if (loggedInUser.role === "cus") {
            data = ordersData.filter((order) => {
                if (order.status === "completed")
                    return order.userId === loggedInUser.id;
            })
        }
        else {
            data = ordersData.filter((order) => {
                if (loggedInUser.shopId) {
                    if (order.status === "completed")
                        return loggedInUser.shopId === order.shopId;
                }

                else if (loggedInUser.godownId) {
                    if (order.status === "completed")
                        return loggedInUser.godownId === order.godownId;
                }

            });
        }
    } else {
        data = ordersData.filter((order) => {
            if (loggedInUser.role === "superuser") {
                let isValid = true;
                if (filters.medicineId) {
                    return order.medicines.some(medicine => medicine.id == request.query.medicineId);
                }
                for (key in filters) {
                    isValid = isValid && order[key] == filters[key];
                }
                return isValid;
            } else if (loggedInUser.role === "cus") {
                let isValid = true;
                for (key in filters) {
                    isValid = isValid && order[key] == filters[key] && loggedInUser.id === order.userId && order.status == "completed";
                }
                if (isValid == 0) {
                    return responseBuilder.errorMsg(constant.validator.noValue);
                }
                return isValid;
            }
            else {
                let isValid = true;
                for (key in filters) {
                    isValid = isValid && order[key] == filters[key]
                        && (loggedInUser.shopId === order.shopId || loggedInUser.godownId === order.godownId) && order.status == "completed";
                }
                return isValid;
            }
        });
    }
    return responseBuilder.success(data);
};

const getIncomplete = (request) => {
    let loggedInUser = request.user;
    let incompleteOrders = [];
    if (loggedInUser.role == "cus")
        return responseBuilder.errorMsg(constant.role.noAccess);
    else if (loggedInUser.role === "godownAdmin" || loggedInUser.role === "godownShipment") {
        let godownId = loggedInUser.godownId;
        ordersData.forEach((order) => {
            if (order.godownId === godownId && order.status !== "completed"
                && order.status !== "shop rejected" && order.status !== "shop pending")
                incompleteOrders.push(order)
        })
        return responseBuilder.success(incompleteOrders)
    }
    else if (loggedInUser.role === "shopAdmin" || loggedInUser.role === "shopEmp") {
        let shopId = loggedInUser.shopId;
        ordersData.forEach((order) => {
            if (order.shopId === shopId && order.status !== "completed")
                incompleteOrders.push(order)
        })
        return responseBuilder.success(incompleteOrders)
    }
    else if (loggedInUser.role === "superuser") {
        ordersData.forEach((order) => {
            if (order.status !== "completed")
                incompleteOrders.push(order)
        })
        return responseBuilder.success(incompleteOrders)
    }
}
////
const placeOrder1 = (request) => {
    let cost = 0;
    let body = request.body;
    let loggedInUser = request.user;
    let mobile = loggedInUser.phoneNumber;
    let today = new Date;
    let medicines = [];
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    body['userId'] = loggedInUser.id;
    body['orderId'] = ordersData.length + 1;
    body['date'] = date;
    body['transactionId'] = uuidv4();
    body['name'] = loggedInUser.name;
    body['email'] = loggedInUser.email;
    body.medicines.forEach((medi) => {
        let data = medicineData.find((medicine) => {
            if (medicine.name == medi.name)
                return medicine
        })
        data['unitPrice'] = null;
        data['quantity'] = medi.quantity;
        medicines.push(data)
    })
    body.medicines = medicines;
    console.log(body)//
    if (body.mobile == null && loggedInUser.role === "shopEmp") {
        body['status'] = "shop pending";
        body.medicines.forEach((medi) => {
            if (medi.quantity <= 1000)
                cost = cost + (medi.quantity * medi.unitPrice);
            else
                return responseBuilder.errorMsg(constant.medicine.exceedQuantityGodown);
            body['totalCost'] = cost
        })
    }
    else if ((body.mobile != null && loggedInUser.role === "shopEmp") ||
        (body.mobile == null && loggedInUser.role === "cus")) {
        if (body.mobile == null && loggedInUser.role === "cus") {
            body['mobile'] = mobile;
        }
        let shopId = body.shopId;
        const shop = shopData.find((shop) => shopId === shop.id)
        body.medicines.forEach((medi) => {
            const medicine = shop.medicines.find((medicine) => medi.name == medicine.medicineName)
            medi.unitPrice = medicine.unitPrice;
            if (medi.quantity <= 10)
                cost = cost + (medi.quantity * medicine.unitPrice);
            else
                return responseBuilder.errorMsg(constant.medicine.exceedQuantityShop);
        })
        body['status'] = 'completed';
        body['totalCost'] = cost;

        let result = [];
        shop.medicines.forEach((shopMedi) => {
            body.medicines.forEach((bodyMedi) => {
                if (bodyMedi.name == shopMedi.medicineName) {
                    shopMedi.medicineQuantity = shopMedi.medicineQuantity - bodyMedi.quantity;
                    result.push(bodyMedi);
                }
            })
        })
        if (result.length != body.medicines.length) {
            return responseBuilder.errorMsg(constant.validator.notExist);
        }
        let res = JSON.stringify(shopData, null, 2)
        ping.writeData('src/docs/shops.json', res);
    }
    ordersData.push(body);
    let path = 'src/docs/orders.json';
    let data = JSON.stringify(ordersData, null, 2);
    ping.writeData(path, data);
    let result = responseBuilder.list(body);
    return result;
}
/////
const placeOrder = (request) => {
    let cost = 0;
    let body = request.body;
    let loggedInUser = request.user;
    let today = new Date;
    let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
    body['userId'] = loggedInUser.id;
    body['orderId'] = ordersData.length + 1;
    body['date'] = date;
    body['transactionId'] = uuidv4();
    body['name'] = loggedInUser.name;
    body['email'] = loggedInUser.email;
    body.medicine = body.medicines.forEach((medi) => {
        let data = medicineData.find((medicine) => {
            if (medicine.name == medi.name)
                return medicine
        })
        data['unitPrice'] = medi.unitPrice;
        data['quantity'] = medi.quantity;
    })

    if (body.godownId != null) {
        body['status'] = "shop pending";
        body.medicines.forEach((medi) => {
            if (medi.quantity <= 1000)
                cost = cost + (medi.quantity * medi.unitPrice);
            else
                return responseBuilder.errorMsg(constant.medicine.exceedQuantityGodown);
            body['totalCost'] = cost
        })
    }
    else {
        body.medicines.forEach((medi) => {
            if (medi.quantity <= 10)
                cost = cost + (medi.quantity * medi.unitPrice);
            else
                return responseBuilder.errorMsg(constant.medicine.exceedQuantityShop);
        })
        body['status'] = 'completed';
        body['totalCost'] = cost;
        let shopId = body.shopId;
        const shop = shopData.find((shop) => {
            if (shop.id == shopId)
                return shop
        })
        let result = [];
        shop.medicines.forEach((shopMedi) => {
            body.medicines.forEach((bodyMedi) => {
                if (bodyMedi.name == shopMedi.medicineName) {
                    shopMedi.medicineQuantity = shopMedi.medicineQuantity - bodyMedi.quantity;
                    result.push(bodyMedi);
                }
            })
        })
        if (result.length != body.medicines.length) {
            return responseBuilder.errorMsg(constant.validator.notExist);
        }
        let res = JSON.stringify(shopData, null, 2)
        ping.writeData('src/docs/shops.json', res);
    }
    ordersData.push(body);
    let path = 'src/docs/orders.json';
    let data = JSON.stringify(ordersData, null, 2);
    ping.writeData(path, data);
    let result = responseBuilder.list(body);
    return result;
}
const getAllVendors = (request) => {
    const loggedInUser = request.user;
    if (loggedInUser.role === 'godownShipment')
        return vendors;
    else
        return responseBuilder.errorMsg(constant.role.noAccess);
}

function hook(hookData, url) {
    var axios = require('axios');
    var config = {
        method: 'post',
        url: url,
        headers: {
            'Content-Type': 'application/json'
        },
        data: hookData
    };

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
}



module.exports = {
    getOrders,
    getIncomplete,
    updateStatusApproval,
    placeOrder1,
    updateStatusIncomplete,
    updateStatusReject,
    getAllVendors
}