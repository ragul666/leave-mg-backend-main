const router = require("express").Router();
const vendorController = require('../controllers/vendor/vendorController');

router.put('/statusComplete',vendorController.statusComplete)

module.exports=router;
