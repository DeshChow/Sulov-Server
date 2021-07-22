const exporess = require('express');

const router = exporess.Router();

const mongoose = require("mongoose");


const productSchema = require('../Schemas/productSchema');

const Product = new mongoose.model("Product", productSchema);

const categorySchema = require('../Schemas/categorySchema');
const fileUpload = require('express-fileupload');

const Category = new mongoose.model("Category", categorySchema);


router.post('/add', async (req, res) => {

   



    
    try {

    const allPic = [];


    let Allfile=[];

    
    if(!Array.isArray(req.files.file))
        {
            Allfile=[req.files.file];

        

        }
    else  Allfile = req.files.file;




  Allfile.forEach(async file=>
    {
  
    allPic.push(file.name);

  
    })



   Allfile.forEach(async file=>
    {
    await file.mv(`${__dirname.replace('routeHandler','')}images/${file.name}`);
  
    })

   
    
    req.body.pic= allPic;

 

    console.log(req.body);

     req.body.category = {
         id : req.body.categoryId,
         title:  req.body.categoryTitle
     }

     console.log(req.body);
    

     const newProduct = new Product(req.body);

        const product = await newProduct.save()

        await Category.updateOne({
            _id : req.body.category.id
        },
        {
            $push : {
                products : product.id
            }
        })

       return  res.status(200).json({

            insertCount: true,
            message: "Successfully Inserted",
        }
        )



    }        
            
    catch (err) {
       
        res.status(500).json({
            insertCount: false,
            error: 'There was a server site error',
        })

    }

         

    





})

router.get('/',(req,res)=>
{
    Product.find({})
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

                products : data,
                
                message: "Successfully Read",
            })


        }
    })
})

router.get('/:id',(req,res)=>
{
    Product.findOne({ _id : req.params.id})
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

                result : data,
                
                message: "Successfully Read",
            })


        }
    })
})

router.put('/:id',(req,res)=>
{
    
    const updateData = { };

    if(req.body.title!=undefined)
    {
        updateData.title = req.body.title;
    }

    if(req.body.pic!=undefined)
    {
        updateData.pic = req.body.pic;
    }
    if(req.body.status!=undefined)
    {
        updateData.status = req.body.status;
    }

    if(req.body.price!=undefined)
    {
        updateData.price = req.body.price;
    }

    if(req.body.star!=undefined)
    {
        updateData.star = req.body.star;
    }

    if(req.body.itemCount!=undefined)
    {
        updateData.itemCount = req.body.itemCount;
    }

    

    if(Object.keys(updateData).length==0)
    {
        res.status(400).json({
            message: "You Have Insert Nothing , So there is no update",
            updateCount : false,
           
          });
          

    }

    else{


    Product.findByIdAndUpdate(
      { 
          _id: req.params.id },
      {
        $set: updateData,
      },
      {
        new: true,
        useFindAndModify: false,
      },
      (err,data) => {
        if (err) {
          res.status(500).json({
            error: "There was a server side error!",
            updateCount : false,
          });
        } else {
          res.status(200).json({
            message: "Product was updated successfully!",
            result : data ,
            updateCount : true
          });
        }
      }
    );
    }


})

router.delete('/:id',(req,res)=>
{

    console.log('hamaisiiiiii',req.params.id)
    Product.findByIdAndRemove(req.params.id,(err)=>
    {

        console.log(err)
        if(err)
        {
         return res.status(200).json({
            error: "There was a server side error!",
            deleted : false,
          });
        }

        else {

           return res.status(200).json({
                message: "Product was deleted successfully!",
                deleted : true
            });

        }
         
    })
})




module.exports = router;
