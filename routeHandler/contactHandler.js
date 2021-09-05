
const express = require("express");

const router = express.Router();

const dotenv = require('dotenv')

dotenv.config();

const mongoose = require("mongoose");


const contactSchema = require('../Schemas/contactSchema');

const Contact = new mongoose.model("Contact", contactSchema);

router.post("/", async (req, res) => {

  console.log('hamaisi')


  console.log(req.body);

    try{

      const newContact = new Contact(req.body);

      await newContact.save()


      return  res.status(200).json({

        insertCount: true,
        message: "Successfully Inserted",
    }
    )



}        
        
catch (err) {

  console.log(err);
   
    res.status(500).json({
        insertCount: false,
        error: 'There was a server site error',
    })

}





});


router.get('/',(req,res)=>
{
    Contact.find({})
    .exec((err,data)=>
    {
        if(err) {
       
            res.status(500).json({

                dataRead : false,
                
                error: 'There was a server site error',
            })
        }
        else{

            res.status(200).json({

                dataRead : true,

                contacts : data,
                
                message: "Successfully Read",
            })


        }
    })
})

module.exports = router;
