const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    alternativeTitle : {

        type: String,
        required: true,


    },
    pic: {
        type : String,
        required: true,

    },
    products: [
        {
          type: mongoose.Types.ObjectId,

          ref: "Product" 
        }
    ]
});

module.exports = categorySchema;