const RestaurantsSvc=require('../../services/restaurants');

const getRestaurants=async (req,res)=>{
    try{
        const restaurants=await RestaurantsSvc.getRestaurants() 
        return res.render('restaurants',{
            appTitle:req.app.get('title'),
            title:'Restaurants | '+req.app.get('title'),
            restaurants
        })
    } catch(err){
        return res.render('error',{
            appTitle:req.app.get('title'),
            title:'Error'
        })
    }   
};

module.exports={
    getRestaurants
}