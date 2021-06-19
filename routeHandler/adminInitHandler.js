const exporess = require('express');

const router = exporess.Router();

const mongoose = require("mongoose");


const productSchema = require('../Schemas/productSchema');

const Product = new mongoose.model("Product", productSchema);

const categorySchema = require('../Schemas/categorySchema');

const fileUpload = require('express-fileupload');

const userSchema = require("../Schemas/userSchema");
 
const User = new mongoose.model("User", userSchema);

const Category = new mongoose.model("Category", categorySchema);

const orderHistorySchemas = require('../Schemas/orderHistorySchema');

const OrderHistory = new mongoose.model('OrderHistory',orderHistorySchemas);

const { taskProgress } = require("../helpers/utilities");



router.get('/init',async(req,res)=>
{
    try{

        console.log(User);

       const products = await Product.find({});

       const userCount = await User.countDocuments({});

       const allOrder = await OrderHistory.find({ });

       const reverseProduct = products.reverse();

       const reverseOrder = allOrder.reverse();

      


       const taskProg = taskProgress(allOrder);

       const latestProduct = reverseProduct.slice(0,6);

       const latestOrder = reverseOrder.slice(0,6);

       



       let sum=0;

       for (const item in products) {
         sum+=products[item].price;



        
      }

   

      const budget = Math.floor(sum-(sum*.10));

      res.status(200).json({
       
      budget,
      userCount , //minus adminUser
      taskProgress : taskProg,
      latestProduct,
      latestOrder
     
    });


       

    }
    catch(err){

        res.status(500).json({err});
    }


})


module.exports = router;
