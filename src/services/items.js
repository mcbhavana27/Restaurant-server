const mongoose=require('mongoose');
const Item=mongoose.model('Item');
const Restaurant=mongoose.model('Restaurant');

const {PAGE_SIZE}=require('../config');

const getItems=(options)=>{
    const {page}=options;
    const query=Item.find();
    if(page){
        query.skip(PAGE_SIZE*(page-1)).limit(PAGE_SIZE);
    }
    return query.exec();
}

const getRestaurantItemBySlug=async (slug)=>{
    const restaurant=await Restaurant.findOne(
        {
            slug:slug
        }
    );
    return getRestaurantItemById(restaurant._id);
}

const getRestaurantItemById=(id)=>{
    return Item.find(
        {
            restaurant:id
        }
    )
}

const getItemsBYId=(id)=>{
    return Item.findById(id).populate('restaurant');
}

const addItem=(item)=>{
    return Item.create(item);
};

const updateItem=(id,update)=>{
    return Item.findByIdAndUpdate(id,update);
}

const removeItem=(id)=>{
    return Item.findByIdAndDelete(id);
}

module.exports={
    getItems,
    getRestaurantItemById,
    getRestaurantItemBySlug,
    getItemsBYId,
    addItem,
    updateItem,
    removeItem
};