

const producHandler = require('./routeHandler/productHandler');

const categoryHandler = require('./routeHandler/categoryHandler');

const adminInitHandler = require('./routeHandler/adminInitHandler');

const userHandler = require('./routeHandler/userHandler');

const orderHistoryHandler = require('./routeHandler/orderHistoryHandler');

const contactHandler = require('./routeHandler/contactHandler')


const route={

     product : producHandler,

     category : categoryHandler,

     adminInit : adminInitHandler,

     user : userHandler,

     orderHistory : orderHistoryHandler,

     contact : contactHandler


}

module.exports = route;

