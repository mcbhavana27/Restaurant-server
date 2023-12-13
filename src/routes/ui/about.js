const express=require('express');
const {allAbout}=require('../../controllers/ui/about');

const router=express.Router();

router.all('/about',allAbout);

module.exports=router;