
const exporess = require("express");

const router = exporess.Router();

const mongoose = require("mongoose");

const orderHistorySchemas = require('../Schemas/orderHistorySchema');

const OrderHistory = new mongoose.model('OrderHistory',orderHistorySchemas);

 const userSchema = require("../Schemas/userSchema");

 const User = new mongoose.model("User", userSchema);


router.post("/", async (req, res) => {

   
  

  try {




    req.body.orderInfo = JSON.parse(req.body.orderInfo)



    const newOrderHistory = new OrderHistory(req.body);

    await newOrderHistory.save()

    console.log('ok')

    console.log(newOrderHistory._id);

    await User.updateOne({
        _id : req.body.userInfo
    },{
       $push: {

        orderHistory : newOrderHistory._id

       } 
    })
    res.status(200).json({
        message: "Order was inserted successfully!",
    })
  } 
  
  catch (err) {
    res.status(500).json({
        msg : err,
        error: "There was a server side error!",
      });
  }
});

module.exports = router;
