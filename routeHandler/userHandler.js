const express = require("express");
 
const router = express.Router();
 
const jwt = require("jsonwebtoken");
 
const mongoose = require("mongoose");
 
// const userSchema = require("../Schemas/userSchema");
 
// const User = new mongoose.model("User", userSchema);
 
const bcrypt = require("bcrypt");
const userSchema = require("../Schemas/userSchema");
 
const User = new mongoose.model("User", userSchema);


router.get('/info',async(req,res)=>
{

  

   try{


    const customers =await User.find({});

    return res.status(200).json({
        customers : customers.map(custom=>{

             const {name,email,status,Address : address,registration_date,phone,_id} = custom;
          return {
          name,email,status,address,registration_date,phone,_id
          
          }
        })
   
      });
   }
   catch(err){
    return res.status(500).send(err);


   }
       

})
 
router.post('/',(req,res)=>
{
  res.status(200).json({
 
    message: "Successfully Resgistered"
 
  });
})
 
router.post("/signupin", async (req, res) => {

    // console.log(' now signupin')
 
 
  try {
 
    const userFind = await User.findOne({
        email : req.body.email
    }).populate('orderHistory');

    // console.log('object test emailVerified',req.body.emailVerified)

 
 
   if(userFind==null)
   {
 
    req.body.status = 'active'
 
 
    const newUser = new User(req.body);

   
    //  console.log(newUser)
 
 
     newUser.token = jwt.sign(
      {
        userEmail: newUser.email,
        userId: newUser._id,
      },
     process.env.JWT_SECRET
    );

   
 
    const user = await newUser.save();

    if(req.body.emailVerified==false){
      return res.status(200).json({
       
    
         registered: true,
    
         message: "Successfully Resgistered"
    
       });

    }
 
 
   else  return res.status(200).json({
      data : user,
 
      registered: true,
 
      message: "Successfully Resgistered"
 
    });
  } 
 
 
else {

  
 
  res.send({
    data: userFind,
 
    success: true,
  });
 
 
 
}
  }
 
  catch (err) {
    res.status(500).send('This email have no account');
  }
 
 
 
}
 
 
);
 
router.get("/login/:id", async (req, res) => {
  // console.log(process.env.JWT_SECRET);
  try {
    const user = await User.findOne({
      _id: req.params.id,
      email: req.body.email,
    }).select({
      password: 0,
      status: 0,
    });
 
    res.send({
      data: user,
 
      success: true,
    });
  } catch (err) {
    res.status(500).send("there was a server site error");
  }
});
 
router.get("/", async (req, res) => {
  try {
    const alluser = await User.find({}).populate('orderHistory');
 
    return res.status(200).json({
      data: alluser,
    });
  } catch (err) {
    res.status(500).send("there was a server site error");
  }
});
 
 
router.put("/:id",async(req,res)=>
{
    try{
            //  console.log(req.files)
      const file = req.files.file;
 
      res.send(file);
 
 
    }
    catch(err)
    {
        res.status(500).send(err);
    }
})
 
module.exports = router;