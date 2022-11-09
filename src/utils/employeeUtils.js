let responseBuilder=require('../helper/responseBuilder');
let constant=require('../helper/constant');
let employee=require('../docs/employee.json');
const encryption = require('../helper/encryption');
function push(body){
    let path='src/docs/employee.json'
    body["id"]=employee.length+1;
    body["status"]="active";
    body['name']=body.name.charAt(0).toUpperCase()+body.name.substring(1);
    body['hobby']=body.hobby.charAt(0).toUpperCase()+body.hobby.substring(1);
    employee.push(body);
    console.log(employee)
    let value=JSON.stringify(employee,null,2);
    responseBuilder.addData(value,path);
    let resp = responseBuilder.success(body);
    return resp;
}
function listByName(body){
    let result=[];
    let newData=[];
    let num=0;
    for(let elem of employee){
        if(elem.status=='active'){
            newData.push(elem);
            if(body.name){
                num=1;
                if(elem.name.toLowerCase()==body.name.toLowerCase())
                    result.push(elem);
            }
            else if(body.role){
                num=1;
                if(elem.role.toLowerCase()==body.role.toLowerCase())
                    result.push(elem);
            }
            else if(body.id){
                num=1;
                if(elem.id==body.id)
                    result.push(elem);
            }
            else if(body.shopId){
                num=1;
                if(elem.shopId==body.shopId)
                    result.push(elem);
            }
            else if(body.godownId){
                num=1;
                if(elem.godownId==body.godownId)
                    result.push(elem);
            }
            else if(body.email){
                num=1;
                if(elem.email==body.email)
                    result.push(elem);
            }
        }
    }
        if(num==0){
                let resp = responseBuilder.list(newData);
                return resp;
         }
            else if(num==1 && result==0){
                let resp= responseBuilder.errorMsg(constant.validator.notExist)
                return resp;
        }
            else  { 
                let resp=responseBuilder.success(result)
                return resp;
                  }
}
function modify(body){
    if(!body.id){
        return responseBuilder.error();
    }
    let result =[];
    if(body.id){
        for(let elem of employee){
            if(body.id==elem.id){
                result.push(elem);
                if(body.name){
                    elem.name=body.name;
                }
                if(body.dob){
                    elem.dob=body.dob;
                }
                if(body.email){
                    elem.email=body.email;
                }
                if(body.shopId){
                    elem.shopId=body.shopId;
                }
                if(body.godownId){
                    elem.godownId=body.godownId;
                }
                if(body.mobile){
                    elem.mobile=body.mobile;
                }
            }
        }
        console.log(employee)
        let value=JSON.stringify(employee,null,2);
        responseBuilder.addData(value,'src/docs/employee.json');
        let resp = responseBuilder.success(result);
        return resp;
    }
    
}
function update(body){
    let id=body.id;
    let result=[];
    for(let elem of employee){
        if(id==elem.id){
            elem.status='inactive';
        }
        if(elem.status=='active'){
            result.push(elem);
        }
 }
    let value=JSON.stringify(employee,null,2);
    responseBuilder.addData(value,'src/docs/employee.json');
    let resp = responseBuilder.success(result);
    return resp;
}
function get(request){
    let loggedInUser = request.user;
    let data;
    let length = Object.keys(request.query).length;
    let filters = request.query;
    if (length == 0) {
        if (loggedInUser.role === "superuser") {
            data = employee;
        } else {
            data = employee.filter((emp) => {
                return emp.shopId=== loggedInUser.shopId;
            });
        }
    } else{
        data = employee.filter((emp) => {
            if (loggedInUser.role === "superuser") {
                let isValid = true;
                for (key in filters) {
                    isValid = isValid && emp[key] == filters[key];
                }
                return isValid;
            } else {
                let isValid = true;
                for (key in filters) {
                    isValid = isValid && emp[key] == filters[key] && loggedInUser.shopId === emp.shopId;
                }
                return isValid;
            }
        });
    }
    let resp = responseBuilder.success(data);
        return resp;
};
    



module.exports={
    push,
    listByName,
    modify,
    update,
    get
 

}
