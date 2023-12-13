const { response } = require("express");

const logger=(req,res,next)=>{
    const recievedDate=new Date();
    console.log('request recieved at time= ',recievedDate.toTimeString());
    res.locals.recievedDate=recievedDate;
    next();
    const responseDate=new Date();
    console.log('request responded at time = ',responseDate.toTimeString());
    console.log('Time taken for processing = ',responseDate.getTime()-recievedDate.getTime());
}

module.exports=logger;