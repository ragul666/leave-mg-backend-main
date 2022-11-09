const vendorUtils = require('../../utils/vendorUtils');

const statusComplete=(req,res)=>{
    let result = vendorUtils.updateStatusComplete(req);
    res.send(result);
}

module.exports={
    statusComplete
}