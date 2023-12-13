const RestaurantService=require('../../../services/restaurants');
const ItemService=require('../../../services/items');
const { getHttpError } = require('../../../utils/error');

// api/v1/restaurants
// api/v1/restaurants?page=2
// api/v1/restaurants?sort=name:asc
// api/v1/restaurants?sort=rating:desc
// api/v1/restaurants?sort=rating:desc,name:asc
// api/v1/restaurants?sort=rating:desc,name:asc&cuisines=Italain,Mexican&min_CostForTwo=400&max_CostForTwo=1000&min_rating=4&page=2
// api/v1/restaurants?sort=rating ->BAD REQUEST
const getRestaurants=async (req,res,next)=>{
    // console.log('inside controller = ',res.locals.recievedDate);
    const {
        sort,
        cuisines,
        min_costForTwo,
        max_costForTwo,
        min_rating,
        page
    }=req.query; // req.query={sort:'rating:desc,name:asc'}; sort='rating:desc,name:asc'
    const options={};


    // sorting
    if(sort){
        options.sort={};
        
        const fields=sort.split(','); // ['rating:desc','name:asc', 'page:2']
        
        for(let i=0;i<fields.length;i++){
            const parts=fields[i].split(':'); // ['name','asc']
            if(parts.length!==2){
                return next(getHttpError("The sort query string parameter is not in correct format. Example of right usage - ?sort=name:asc, ?sort=name:desc",400));
            }
            options.sort[parts[0]]=parts[1];
        }   
    }

    // filtering
    if(cuisines){
        options.where={
            ...options.where,
            cuisines:cuisines.split(',')
        }
    }

    if(min_costForTwo){
        options.where={
            ...options.where,
            min_costForTwo:min_costForTwo
        }
    }

    if(max_costForTwo){
        options.where={
            ...options.where,
            max_costForTwo:max_costForTwo
        }
    }

    if(min_rating){
        options.where={
            ...options.where,
            min_rating:min_rating
        }
    }

    //pagination
    const pageInt=parseInt(page,10);
    if(!isNaN(pageInt)){
        options.page=pageInt;
    }else{
        options.page=1
    }

    try{
        const restaurants=await RestaurantService.getRestaurants(options)
        return res.json(
            {
                status:'success',
                data:restaurants
            }
        )
    }catch(err){
        return next(getHttpError(err.message,500));
    }
};

// GET api/v1/restaurants/:idOrSlug?matchBy=slug
const getRestaurantByIdOrSlug=async (req,res,next)=>{
    // {idOrSlug:'mad-about-pizza}
    const {idOrSlug}=req.params; 

    // {matchBy:'slug'}
    const {matchBy}=req.query;

    let isSlug=(matchBy==='slug'?true:false);

    let restaurant;

    try{
        if(isSlug){
            restaurant=await RestaurantService.getRestaurantBySlug(idOrSlug);
        }else{
            restaurant=await RestaurantService.getRestaurantById(idOrSlug);
        }
        if(!restaurant){
            return next(getHttpError("Restaurant with given id does not exist",404));    
        }
            
        return res.json({
            status:'success',
            data:restaurant
        })
    }catch(err){
        if(err.name==='CastError'){
            return next(getHttpError("Restaurant with given id does not exist",404));
        }
        return next(getHttpError("Internal Server Error",500));
    }

}

// GET api/v1/restaurants/:idOrSlug/items?matchBy=slug
const getRestaurantItemsByIdOrSlug=async (req,res,next)=>{
    // {idOrSlug:'mad-about-pizza}
    const {idOrSlug}=req.params; 

    // {matchBy:'slug'}
    const {matchBy}=req.query;

    let isSlug=(matchBy==='slug'?true:false);

    let item;

    try{
        if(isSlug){
            item=await ItemService.getRestaurantItemBySlug(idOrSlug);
        }else{
            item=await ItemService.getRestaurantItemById(idOrSlug);
        }
        if(!item||item.length==0){
            return next(getHttpError("No Items found for the restaurant",404));
        }
            
        return res.json({
            status:'success',
            data:item
        })
    }catch(err){
        if(err.name==='CastError'){
            return next(getHttpError("Restaurant with given id does not exist",404));
        }
        return next(getHttpError());
    }
}

const getRestaurantItemsSummaryByIdOrSlug=async(req,res)=>{
    const {idOrSlug}=req.params; 
    const {matchBy}=req.query;

    let isSlug=(matchBy==='slug'?true:false);

    let summary;

    try{
        if(!isSlug){
            summary=await RestaurantService.getRestaurantItemsSummaryById(idOrSlug);
        }else{
            summary=await getRestaurantItemsSummaryByIdOrSlug(idOrSlug);
        }
        return res.json(
            {
                status:"success",
                data:summary
            }
        )
    }catch(err){
        // console.log(err);
        if(err.name==='CastError'){
            return next(getHttpError("Restaurant with given id does not exist",404));
        }
        return next(getHttpError());
    }

}

const postRestaurants=async(req,res,next)=>{
    const restaurant=req.body;
    
    try{
        const createdRestaurant=await RestaurantService.createRestaurant(restaurant);
        res.json({
            status:'success',
            message:createdRestaurant
        })
    }catch(err){
        if(err.name==='ValidationError'){
            return next(getHttpError(err.message,400));
        }
        return next(getHttpError());
    }
};

const patchRestaurants=async(req,res,next)=>{
    const {id}=req.params;
    const update=req.body;
    try{
        const updatedRestuarant=await RestaurantService.updateRestaurant(id,update);
        if(!updatedRestuarant){
            return next(getHttpError("Restaurant with given id does not exist",404));
        }
        res.json({
            status:'success',
            message:updatedRestuarant
        })
    }catch(err){
        if(err.name==='CastError'){
            return next(getHttpError(err.message,404));
        }
        if(err.name==='ValidationError'){
            return next(getHttpError(err.message,400));
        }
        return next(getHttpError());
    }
}

const deleteRestaurants=async(req,res,next)=>{
    const {id}=req.params;
    try{
        const deletedRestaurant=await RestaurantService.deleteRestaurant(id);
        if(!deleteRestaurants){
            return next(getHttpError("Restaurant with given id does not exist",404));
        }   
        res.json({
            status:'success',
            message:deletedRestaurant
        })
    }catch(err){
        if(err.name==='CastError'){
            return next(getHttpError(err.message,404));
        }
        if(err.name==='ValidationError'){
            return next(getHttpError(err.message,400));
        }
        return next(getHttpError());
    }
}

const postItemForRestaurantById=async(req,res,next)=>{
    const item=req.body;
    const {id}=req.params;
    // console.log(id,item);

    item.restaurant=id;

    console.log(item);

    try{
        const newItem=await ItemService.addItem(item);
        res.status(201).json({
            status:'success',
            data:newItem
        });
    }catch(err){
        if(err.name==='ValidationError'){
            return next(getHttpError(err.message,404));
        }
        return next(getHttpError(err.message,500));
    }
};

module.exports={
    getRestaurants,
    getRestaurantByIdOrSlug,
    getRestaurantItemsByIdOrSlug,
    getRestaurantItemsSummaryByIdOrSlug,
    postRestaurants,
    patchRestaurants,
    deleteRestaurants,
    postItemForRestaurantById
}