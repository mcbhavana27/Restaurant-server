const path=require('path');

const allAbout=(req,res)=>{
    // res.sendFile(path.join(process.cwd(),'public/about.html'))
    res.render('about',{
        appTitle:req.app.get('title'),
        title:'About | '+req.app.get('title')
    });
};

module.exports={
    allAbout
}