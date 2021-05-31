const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        pic:[ {
            type : String,
          
    
        }],
        price : 
        {
            type : Number,
            required : true,
        },
        status : 
        {
            type : String,
            enum : ["active","inactive"],
        },
        star : 
        {
            type : Number,
            default : 5,
            
        },
        itemCount : 
        {
            type : Number,

            default : 0,
            
        },
        description : {

            type : String,
            

        },

        category: 
        {
            type : Object,

            required : true,


            
        }
    }
)

module.exports = productSchema;