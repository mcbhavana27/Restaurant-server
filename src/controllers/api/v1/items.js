const ItemsService=require('../../../services/items');
const { getHttpError } = require('../../../utils/error');

// GET /api/v1/items?page=2
const getItems=async(req,res,next)=>{
    const {page}=req.query;

    const options={};

    const pageInt=parseInt(page,10);
    if(!isNaN(pageInt)){
        options.page=pageInt;
    }else{
        options.page=1;
    }

    try{
        const items=await ItemsService.getItems(options);
        return res.json(
            {
                status:'success',
                data:items
            }
        );
    }catch(err){
        return next(getHttpError(err.message,500));
    }
};

const getItemById=async (req,res,next)=>{
    const {id}=req.params;
    try{
        const item=await ItemsService.getItemsBYId(id);
        if(!item){
            return next(getHttpError("Item with given id does not exist",404));
        }
        return res.json({
            status:'success',
            data:item 
        })
    }catch(err){
        if(err.name==='CastError'){
            return next(getHttpError("Item with given id does not exist",404));
        }
        return next(getHttpError(err.message,500));
    }
};

const postItem=async(req,res,next)=>{
    const item=req.body;
    try{
        const newItem=await ItemsService.addItem(item);
        // console.log("newItem",newItem);
        res.status(201).json({
            status:'success',
            data:newItem
        });
    }catch(err){
        if(err.name==='ValidationError'){
            return next(getHttpError("Item with given id does not exist",404));
        }
        return next(getHttpError(err.message,500));
    }
}

const patchItem=async(req,res,next)=>{
    const {id}=req.params;
    const update=req.body;
    try{
        const updatedItem=await ItemsService.updateItem(id,update);
        if(!updatedItem){
            return next(getHttpError("Item with given id does not exist",404));
        }
        res.json({
            status:'success',
            message:updatedItem
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

const deleteItem=async(req,res,next)=>{
    console.log("ok");
    const {id}=req.params;
    console.log(id);
    try{
        const deletedItem=await ItemsService.removeItem(id);
        if(!deletedItem){
            return next(getHttpError("Item with given id does not exist",404));
        }
        res.json({
            status:'success',
            message:deletedItem
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

module.exports={
    getItems,
    getItemById,
    postItem,
    patchItem,
    deleteItem
};