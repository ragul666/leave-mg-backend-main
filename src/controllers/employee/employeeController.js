
const { response } = require('express');
//let employeeUtils=require('../../utils/employeeUtils');
const employeeService=require('../../services/employeeService')

function push(request,response){
    let body = request.body;
    body['role']="user";
    let data=employeeService.push(request,response)
    response.send(data)
}
function listByName(request,response){
    let data=employeeService.listByName(request,response)
    response.send(data)
}
function modify(request,response){
    let data=employeeService.modify(request,response)
    response.send(data)
}
function change(request,response){
    let data=employeeService.change(request,response)
    response.send(data)
}
function getEmployee(request,response){
    let data=employeeService.getEmployee(request,response)
    response.send(data)
}
    

module.exports={
    push,
    listByName,
    modify,
    change,
    getEmployee
}