const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
      type: String,
      required: true,
  },

  pic : {
      type : String,
      default : null

  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  token : {
       type : String ,

       required : true,

  },
  Address : {
     type : String,

      default : null
  },

  phone : {

    type : Number,
    default : null
  },

  registration_date : {

    type : String,
    default : Date.now
  },


  orderHistory: [
    {
      type: mongoose.Types.ObjectId,
      ref: "OrderHistory"
    }
  ]
});

module.exports = userSchema;