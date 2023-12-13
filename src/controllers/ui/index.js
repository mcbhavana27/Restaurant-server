const path=require('path');

const getIndex=(req,res)=>{
    res.render('index',{
        appTitle:req.app.get('title'),
        title:req.app.get('title')
    });
};

const postIndex=(req,res)=>{
    console.log(req.method);
    res.send('Hello , i dont know i how to use database');
};

// const getBootstrapCss=(req,res)=>{
//     res.sendFile(path.join(process.cwd(),'public/bootstrap/dist/css/bootstrap.min.css'))
// };

module.exports={
    getIndex,
    postIndex,
    // getBootstrapCss
};