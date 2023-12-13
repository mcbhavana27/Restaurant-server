const mongoose=require('mongoose');
const {PAGE_SIZE}=require('../config');
const Restaurant=mongoose.model('Restaurant');
const Item=mongoose.model('Item');

// options={
//     sort:{
//         rating:'desc',
//         name:'asc'
//     },
//     where:{
//         cuisines:['Italian','Mexican'],
//         min_CostForTwo:400,
//         max_CostForTwo:1000,
//         min_rating:4
//     }
//     page:2
// }

const getRestaurants=(options={})=>{
    const {sort, where, page}=options;

    const query= Restaurant.find();
    if(sort){
        query.sort(sort); // sort={rating:'desc',name:'asc'}
    }
    if(where&&where.cuisines){
        query.where('cuisines').in(where.cuisines);
    }
    if(where&&where.min_CostForTwo){
        query.where('CostForTwo').gte(where.min_CostForTwo);
    }
    if(where&&where.max_CostForTwo){
        console.log("hi");
        query.where('CostForTwo').lte(where.max_CostForTwo);
    }
    if(where&&where.min_rating){
        query.where('rating').gte(where.min_rating);
    }
    if(page){
        console.log("hi");
        query.skip((PAGE_SIZE*(page-1))).limit(PAGE_SIZE);
    }
    return query.exec();
}

const getRestaurantById=(id)=>{
    return Restaurant.findById(id).populate('items');
}

const getRestaurantBySlug=(slug)=>{
    return Restaurant.findOne(
        {
            slug:slug
        }
    );
}

const getRestaurantItemsSummaryById=(id)=>{
    return Item.aggregate(
        [
            {
                $match:{
                    restaurant:new mongoose.Types.ObjectId(id)
                }
            },
            {
                $group:{
                    _id:'$cuisine',
                    count:{
                        $sum:1
                    }
                }
            }
        ]
    )
};

const getRestaurantItemsSummaryBySlug=async(slug)=>{
    const restaurant=await Restaurant.findOne(
        {
            slug:slug
        }
    )
    return getRestaurantItemsSummaryById(restaurant._id);
};

const createRestaurant=(restaurant)=>{
    return Restaurant.create(restaurant);
}

const updateRestaurant=(id,update)=>{
    return Restaurant.findByIdAndUpdate(id,update);
}

const deleteRestaurant=(id)=>{
    return Restaurant.findByIdAndDelete(id);   
}

module.exports={
    getRestaurants,
    getRestaurantById,
    getRestaurantBySlug,
    getRestaurantItemsSummaryById,
    getRestaurantItemsSummaryBySlug,
    createRestaurant,
    updateRestaurant,
    deleteRestaurant
};