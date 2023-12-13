const { model } = require("mongoose")

const pageNotFound=(req,res,next)=>{
    res.status(404).render('page-not-found',{
        title:'Platter App | Page not Found',
        appTitle:req.app.get('Title')
    })
}

const apiNotFound=(req,res,next)=>{
    res.status(404).json({
        status:'error',
        message:'API not supported'
    });
}

module.exports={
    pageNotFound,
    apiNotFound
}