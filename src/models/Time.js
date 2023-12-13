const mongoose=require('mongoose');

const timeSchema=new mongoose.Schema({
    hours:{
        type:Number,
        min:0,
        max:23,
        required:true
    },
    minutes:{
        type:Number,
        min:0,
        max:59,
        required:true
    },
    _id:false
})

module.exports=timeSchema;