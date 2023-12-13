const winston=require('winston');
const appRootPath=require('app-root-path');

const options={
    file:{
        level:'info',
        filename:`${appRootPath}/logs/app.log`,
        maxsize:5*1024*1024, // 5 MB
        maxFiles:5,
        handleExceptions:true,
        json:true,
        colorize:false
    },
    console:{
        level:'debug',
        handleExceptions:true,
        json:false,
        colorize:true
    }
};

const logger=winston.createLogger({
    level:process.env.LOG_LEVEL||'debug',
    exitOnError:false,
    transports:[
        new winston.transports.File({
            ...options.file,
            level:'error',
            filename:`${appRootPath}/logs/error.log`
        }),
        new winston.transports.File({
            ...options.file,
            filename:`${appRootPath}/logs/combined.log`
        }),
        new winston.transports.Console(options.console)
    ]
})

logger.stream={
    write:function(message,encoding){
        logger.info(message);
    }
}

module.exports=logger