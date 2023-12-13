const mongoose=require('mongoose');
const timeSchema=require('./Time');

const restaurantSchema=new mongoose.Schema({
    name:{  // "Mad About Pizza"
        type:String,
        unique:true,
        required:true
    },
    slug:{  // "mad-about-pizza"
        type:String,
        unique:true
    },
    description:{
        type:String,
        required:true,
        minLength:10
    },
    cuisines:{
        type:[String],
        default:[],
    },
    opens:{
        type:timeSchema,
        required:true
    },
    closes:{
        type:timeSchema,
        required:true
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        default:5
    },
    numRatings:{
        type:Number,
        min:0,
        default:0
    },
    costForTwo:{
        type:Number,
        required:true,
        min:0
    },  
    imageUrl:{
        type:String
    }
},{
    id:false,
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

const slugify=(text)=>{
    return text.toString().trim().toLowerCase().replace(/\s+/g,'-');
}

restaurantSchema.pre('save',function(done){
    this.slug=this.slug||slugify(this.name);
    done();
});

restaurantSchema.virtual('items',{
    ref:'Item',
    localField:'_id',
    foreignField:'restaurant'
});

mongoose.model('Restaurant',restaurantSchema);