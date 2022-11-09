const ordersData = require('../docs/orders.json')
const ping = require('./ping')
const responseBuilder = require('../helper/responseBuilder');
const constant = require('../helper/constant');
const shopData = require('../docs/shops.json')

const updateStatusComplete=(request)=>{
    let vendorCode = request.body.vendorCode;
    console.log(vendorCode)
    body=request.body;
    let medicines;
    let transactionId = body.transactionId;
    let vendor = ordersData.find((order)=>{
        if(order.transactionId==transactionId){
            return order
        }
    })
    if(vendor.vendorCode===vendorCode){
        let filter = ordersData.find((order)=> {
            if(order.transactionId == transactionId){
               order.status='completed';
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
        let newShops = JSON.stringify(shopData,null,2)
        ping.writeData('src/docs/shops.json',newShops)
    }
    else{
        return responseBuilder.errorMsg(constant.role.noAccess);
    }
    let data = JSON.stringify(ordersData,null,2);
    ping.writeData('src/docs/orders.json',data);
    let completeOrders = ordersData.filter((order)=>{
        if(order.transactionId==transactionId)
            return order.status==="completed";
    })
    let result = responseBuilder.list(completeOrders);
    return result;
}

module.exports={
    updateStatusComplete
}