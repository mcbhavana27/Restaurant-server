const getIndex=(req,res)=>{
    res.json({
        description:"The Platter server serves details of restaurants",
        data:[
            {
                url:'/api/v1/restaurants',
                description:'Serves a list of restaurants'
            },
            {
                url:'/api/v1/restaurants/:id/items',
                description:'Serves a list of items at a restaurant with given id'
            }
        ]
    })
};

const postIndex=(req,res)=>{
    res.json(
        {
            description:'The Platter server serves details of restaurants'
        }
    )
}

module.exports={
    getIndex,
    postIndex
}