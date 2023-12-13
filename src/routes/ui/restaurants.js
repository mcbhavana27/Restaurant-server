const express=require('express');
const {
    getRestaurants
}=require('../../controllers/ui/restaurants');

const router=express.Router();

router.get('/',getRestaurants);

module.exports=router;