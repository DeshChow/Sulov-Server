
const exporess = require("express");

const router = exporess.Router();

const dotenv = require('dotenv')

dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST)

const mongoose = require("mongoose");

const orderHistorySchemas = require('../Schemas/orderHistorySchema');

const OrderHistory = new mongoose.model('OrderHistory',orderHistorySchemas);

 const userSchema = require("../Schemas/userSchema");

 const User = new mongoose.model("User", userSchema);


router.post("/", async (req, res) => {

  console.log('hamaisi')

   
  

  try {


      let { amount, id } = req.body
    
    
        const payment = await stripe.paymentIntents.create({
          amount : amount*100,
          currency: "BDT",
          description: "Spatula company",
          payment_method: id,
          confirm: true
        })
        console.log("Payment", payment)

        // req.body.orderInfo = JSON.parse(req.body.orderInfo)

        console.log('2nd state')

        req.body.state = 'pending'

        req.body.stripePaymentDetails = payment



        const newOrderHistory = new OrderHistory(req.body);
    
        await newOrderHistory.save()

        console.log('userInfo ',req.body.userInfo);
    
    
        await User.updateOne({
            _id : req.body.userInfo
        },{
           $push: {
    
            orderHistory : newOrderHistory._id
    
           } 
        })


        res.status(200).json({
          message: "Payment successful",
          orderId : newOrderHistory._id,
          success: true
        })
    
    





  }

 catch (error) {
        console.log("Error", error)
        res.json({
          message: "Payment failed",
          success: false
        })
      }
  
});

module.exports = router;
