const jwt=require('jsonwebtoken');

const authenticate=(req,res,next)=>{
    const token=req.header('Authorization');
    if(!token){
        return next(getHttpError('Token has not been sent',401));
    }
    jwt.verify(token);
};

module.exports={
    authenticate
}