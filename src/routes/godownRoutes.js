const express = require('express');
const router = express.Router();
const godownController = require('../controllers/godown/godownController.js');


router.post('/addGodown', godownController.addGodown);
router.post('/addMedicine', godownController.addMedicine);
router.get('/getGodowns', godownController.getGodowns);
router.get('/searchMedicine', godownController.getMedicine);
router.get('/getMedicines/:godownId', godownController.getMedicineByGodownId);
router.put('/updateMedicine', godownController.updateMedicineByGodownId);
router.put('/removeMedicine', godownController.removeMedicine);
router.get('/getAllGodowns', godownController.getAllGodowns);
router.get('/getAllMedicines', godownController.getMedicinesFromGodowns);
router.put('/viewOrderStatus', godownController.viewOrderDeliveryStatus);


module.exports = router;