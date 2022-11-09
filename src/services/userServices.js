const userUtils = require('../utils/userUtils');

const signUp = (req,res)=>{
    return userUtils.signUp(req,res);
}
const verifySignupToken = (req,res)=>{
    return userUtils.verifySignupToken(req,res);
}
const createUser = (req,res)=>{
    return userUtils.createUser(req,res)
}
const login = (req,res)=>{
    return userUtils.login(req,res)
}
const updateUser = (req,res)=>{
    return userUtils.updateUser(req,res)
}
const verifyEmail =(req,res)=>{
    return userUtils.verifyEmail(req,res)
} 
const assignRole =(req,res)=>{
    return userUtils.assignRole(req,res)
} 
const getActiveUsers =(req,res)=>{
    return userUtils.getActiveUsers(req,res)
} 
const getVerfiedUsers =(req,res)=>{
    return userUtils.getVerfiedUsers(req,res)
} 
const createAdmin =(req,res)=>{
    return userUtils.createAdmin(req,res)
} 
module.exports={
    signUp,
    verifySignupToken,
    createUser,
    login,
    updateUser,
    verifyEmail,
    assignRole,
    getVerfiedUsers,
    getActiveUsers,
    createAdmin    
}