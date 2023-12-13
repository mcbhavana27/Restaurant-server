const express=require('express');
const {getIndex,
    postIndex,
    // getBootstrapCss
}=require('../../controllers/ui/index');

const router=express.Router();

router.get('/',getIndex);
router.post('/',postIndex);
// router.get('/bootstrap/dist/css/bootstrap.min.css',getBootstrapCss)

module.exports=router;