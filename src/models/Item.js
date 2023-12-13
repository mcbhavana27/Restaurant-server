const mongoose=require('mongoose');

const itemSchema=mongoose.Schema(
    {
        restaurant:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'Restaurant'
        },  
        name:{
            type:String,
            required:true
        },
        cuisine:{
            type:String,
            required:true
        },
        description:{
            type:String,
            maxLength:512
        },
        price:{
            type:Number,
            min:0,
            required:true
        },
        imageUrl:{
            type:String
        }
    }
);

mongoose.model('Item',itemSchema);