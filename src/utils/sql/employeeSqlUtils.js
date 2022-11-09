const sqlQueries=require('../sqlQueries')

async function push(body) {
    var sqlQuery = `INSERT INTO employee (name,dob,mobile,email,hobby,shopId,status,role) VALUES ('${body.name}','${body.dob}','${body.mobile}','${body.email}','${body.hobby},'${body.shopId}','active','user')`;
    var result = await sqlQueries.query(sqlQuery);
    return result;
}
async function listByName(body){
    var sqlQuery='select * from employee';
    var result=await sqlQueries.query(sqlQuery);
    return result
}
async function modify(body){
    var sqlQuery='select * from employee';

    var result=await sqlQueries.query(sqlQuery);
    return result
}
async function change(body){
    var sqlQuery=''
    var result=await sqlQueries.query(sqlQuery);
    return result
}

module.exports={
    push,
    listByName,
    modify
}