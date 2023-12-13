require('dotenv').config();
require('./utils/error')
require('./data/connect');

const express=require('express');
const path=require('path');

const morgan=require('morgan');
const logger=require('./middleware/logger');
const winston=require('./middleware/winston.config');
const {pageNotFound, apiNotFound}=require('./middleware/not-found');
const errorHandler=require('./middleware/error');

const apiIndexRouter=require('./routes/api/v1/index');
const apiRestaurantRouter=require('./routes/api/v1/restaurants');
const apiItemsRouter=require('./routes/api/v1/items');
const uiIndexRouter=require('./routes/ui/index');
const uiAboutRouter=require('./routes/ui/about');
const uiRestaurantRouter=require('./routes/ui/restaurants');

const app=express();

app.set('views',path.join(process.cwd(),'views'));
app.set('view engine','ejs');

app.set('title','Platter');

app.use(logger);
app.use(morgan('combined',{stream:winston.stream}));

app.use(express.static(path.join(process.cwd(),'public')));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/v1',apiIndexRouter);
app.use('/api/v1/restaurants',apiRestaurantRouter);
app.use('/api/v1/items',apiItemsRouter);

app.use(uiIndexRouter);
app.use(uiAboutRouter);
app.use('/restaurants',uiRestaurantRouter);

app.use('api',apiNotFound);
app.use(pageNotFound);

app.use(errorHandler);

const PORT=process.env.PORT||3000;

app.listen(PORT,()=>{
    // console.log(`Server running on http://localhost:${PORT}`);
    winston.info(`Server running on http://localhost:${PORT}`);
})
.on('error',error=>winston.error(error.message));