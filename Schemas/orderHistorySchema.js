const mongoose = require("mongoose");

const orderHistoryShema = mongoose.Schema({
  
    userInfo : {
        type : mongoose.Types.ObjectId,
        ref : "User",
       
    },

    orderInfo : {

        type : Object,
        required : true
        
    },
    status : {
        type : String,
        enum : ["delivered","pending"]
    },
    stripePaymentDetails : {

        type : Object,
        required : true
        

    },

    date : {

        type : String,

        default: Date.now

    }

  
});

module.exports = orderHistoryShema;