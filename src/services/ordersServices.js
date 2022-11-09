const jsonOrdersUtils = require('../utils/ordersUtils');

const statusIncomplete=(req)=>{
    return jsonOrdersUtils.updateStatusIncomplete(req);
}
const statusApproval = (req) =>{
    return jsonOrdersUtils.updateStatusApproval(req);
}
const statusReject = (req) =>{  
    return jsonOrdersUtils.updateStatusReject(req);
}
const getOrders = (req) =>{
    return jsonOrdersUtils.getOrders(req);
}
const getIncomplete = (req) =>{
    return jsonOrdersUtils.getIncomplete(req);
}
const placeOrder = (req) =>{
    return jsonOrdersUtils.placeOrder1(req);
}
const getVendors = (req) =>{
    return jsonOrdersUtils.getAllVendors(req);
}

module.exports={
    statusIncomplete,
    statusApproval,
    statusReject,
    getOrders,
    getIncomplete,
    placeOrder,
    getVendors
}