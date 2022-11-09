const express = require('express');
const responseBuilder =require('../helper/responseBuilder');
const constant = require('../helper/constant');
function ordersValidator(req,res,next){
    let body = req.body;
    let loggedInUser =req.user;
    let role = loggedInUser.role;
    if(body.godownId){
        if(!body.shopId){
            let resp = responseBuilder.errorMsg(constant.validator.noValue);
            res.send(resp);
        }
        else if(role==="cus" || role==="godownAdmin"){
            let resp = responseBuilder.errorMsg(constant.role.noAccess);
            res.send(resp);
        }
        else{
            next();
        }
    }
    else if(!body.godownId){
        if(!body.shopId){
            let resp = responseBuilder.errorMsg(constant.validator.noValue);
            res.send(resp);
        }
        else{
            body['godownId']=null;
            next(); 
        }           
    }    
    else
        res.send(responseBuilder.errorMsg(constant.validator.noValue));
    
}


///
const ordersValidator1=(req,res,next)=>{
    let body = req.body;
    let loggedInUser =req.user;
    let role = loggedInUser.role;
    if(body.mobile){
        if(!body.shopId){
            let resp = responseBuilder.errorMsg(constant.validator.noValue);
            res.send(resp);
        }
        else if(role==="cus" || role==="godownAdmin" || role==="godownShipment"){
            let resp = responseBuilder.errorMsg(constant.role.noAccess);
            res.send(resp);
        }
        else{
            body['godownId']=null;
            next();
        }
    }
    else if(!body.mobile){
        if(!body.shopId){
            let resp = responseBuilder.errorMsg(constant.validator.noValue);
            res.send(resp);
        }
        else{
            body['godownId']=null;
            body['mobile']=null;
            next(); 
        }           
    }    
    else
        res.send(responseBuilder.errorMsg(constant.validator.noValue));
    
}
///

function modifyValidator(req,res,next){
    let body = req.body;
    if(!body.orderId && !body.transactionId){
        let result=responseBuilder.errorMsg(constant.validator.noValue);
        res.send(result);
    }
    else
    next();
}
function medicineValidator(req,res,next){
    let body = req.body;
    let value =[];
    let num =0;
    if(!body.medicines){
        let resp = responseBuilder.errorMsg(constant.medicine.insufficientValue)
        res.send(resp);
    }
    value = body.medicines;
    for(let elem of value){
        if(!elem.id||!elem.quantity){
            num=1;
            let resp = responseBuilder.errorMsg(constant.medicine.insufficientValue)
            res.send(resp);
        }
    }
    if(num==0)
        next();
    
}
module.exports={
    ordersValidator1,
    modifyValidator,
    medicineValidator
}