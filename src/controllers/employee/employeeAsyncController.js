const { request } = require('express');
const employeeService=require('../../services/employeeService')

async function push(request,response) {
    let body=request.body;
    if (process.env.DATABASE_TYPE === "mysql") {
        let result = await employeeService.pushSql(body);
        response.send(result);
    }
}
async function listByName(request,response){
    if(process.env.DATABASE_TYPE==="mysql"){
        let result=await employeeService.listByName(request,response);
        response.send(result)
    }
}
async function modify(request,response){
    if(process.env.DATABASE_TYPE==="mysql"){
        let result=await employeeService.modify(request,response);
        response.send(result)

    }
}
async function change(request,response){
    if(process.env.DATABASE_TYPE==="mysql"){
        let result=await employeeService.change(request,response)
        response.send(result)
    }
}

module.exports={
    push,
    listByName,
    modify,
    change
}