const res = require('express/lib/response');
const jsonEmployeeUtils=require('../utils/employeeUtils')
//const sqlEmployeeUtils=require('../utils/sql/employeeSqlUtils')
 
function push(request,response){
    let body=request.body
    if (process.env.DATABASE_TYPE === "jsonFile") {
        console.log("push")
        data = jsonEmployeeUtils.push(body);
    }
    response.send(data)
}
function listByName(request,response){
    if (process.env.DATABASE_TYPE === "jsonFile") {
        console.log("list")
        data = jsonEmployeeUtils.listByName(request.body);
    }
    response.send(data)
}

function modify(request,response){
    if (process.env.DATABASE_TYPE === "jsonFile") {
        data = jsonEmployeeUtils.modify(request.body);
    }
    response.send(data) 
}

function change(request,response){
    if (process.env.DATABASE_TYPE === "jsonFile") {
        data = jsonEmployeeUtils.update(request.body);
    }
    response.send(data)  
}

function getEmployee(request,response){
    if (process.env.DATABASE_TYPE === "jsonFile") {
        data = jsonEmployeeUtils.get(request);
    }
    response.send(data)  
}

module.exports={
    push,
    listByName,
    modify,
    change,
    getEmployee

}