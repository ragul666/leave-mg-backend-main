const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/ordersController/ordersController');
const ordersMiddleware = require('../middleware/ordersMiddleware');
const userMiddleware =require('../middleware/userMiddleware');
// router.put('/statusComplete',ordersMiddleware.modifyValidator,ordersController.statusComplete);
router.put('/statusIncomplete',ordersMiddleware.modifyValidator,ordersController.statusIncomplete);
router.put('/statusApprove',ordersMiddleware.modifyValidator,ordersController.statusApproval);
router.put('/statusReject',ordersMiddleware.modifyValidator,ordersController.statusReject);
router.get('/getOrders',ordersController.getOrders);
router.get('/getVendors',ordersController.getVendors);
router.get('/getIncompleteOrders',ordersController.getIncomplete);
router.post('/placeOrder',ordersMiddleware.ordersValidator1,ordersController.placeOrder);
module.exports=router;

