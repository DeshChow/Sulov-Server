const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type : String,
        required: true,

    },
  

    mobile : {

        type : Number,
        require : true

    }
    
});

module.exports = contactSchema;