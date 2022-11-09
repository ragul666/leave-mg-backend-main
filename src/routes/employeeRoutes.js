const express=require('express');
const employeeController=require('../controllers/employee/employeeController');
const router=express.Router();
const middlewaresEmp=require('../middleware/midEmployee');

router.post('/push',middlewaresEmp.validator,middlewaresEmp.checkRepeatation,employeeController.push)
router.get('/listByName',employeeController.listByName)
router.put('/modify',employeeController.modify)
router.put('/change',employeeController.change)
router.get('/getEmployee',employeeController.getEmployee);

module.exports=router;