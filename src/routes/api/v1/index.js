const express=require('express');
const {getIndex,postIndex}=require('../../../controllers/api/v1/index');

const router=express.Router();

router.get('/',getIndex);
router.post('/',postIndex);

module.exports=router;