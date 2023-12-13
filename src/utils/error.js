const getHttpError=(message='Internal Server Error',status=500)=>{
    const error=new Error(message);
    error.status=status;
    return error;
};

global.getHttpError=getHttpError;

module.exports={
    getHttpError
};