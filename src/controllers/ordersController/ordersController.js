const express = require('express');
const ordersServices = require('../../services/ordersServices')

const statusIncomplete=(req,res)=>{
    let result = ordersServices.statusIncomplete(req);
    res.send(result);
}
const statusApproval = (req,res) =>{
    let result = ordersServices.statusApproval(req);
    res.send(result);
}
const statusReject = (req,res) =>{
    let result = ordersServices.statusReject(req);
    res.send(result);
}
const getOrders=(req,res)=>{
    let result = ordersServices.getOrders(req);
    res.send(result);
}
const getIncomplete=(req,res)=>{
    let result = ordersServices.getIncomplete(req);
    res.send(result);
}
const placeOrder=(req,res)=>{
    let result = ordersServices.placeOrder(req);
    res.send(result)
}
const getVendors=(req,res)=>{
    let result = ordersServices.getVendors(req);
    res.send(result)
}
module.exports={
    getOrders,
    getIncomplete,
    placeOrder,
    statusApproval,
    statusReject,
    statusIncomplete,
    getVendors
}