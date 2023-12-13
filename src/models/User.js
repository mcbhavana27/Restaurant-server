const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:'general',
        enum:['admin','general']
    }
});

const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]\\|:;"'<>,.?/]).{8,}$/;

userSchema.path('email').validate(
    (value)=>{
        return emailRegex.test(value);
    },
    'Email is not valid'
);

userSchema.path('password').validate(
    (value)=>{
        return passwordRegex.test(value);
    },
    'Password must have atleast 1 uppercase, 1 lowercase, 1 digit, 1 special characters and at least 8 characters in length'
);

mongoose.model('User',userSchema);