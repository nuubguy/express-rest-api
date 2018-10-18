const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');


router.get('/',(req,res,next) =>{
    Product.find().exec().then(doc =>{
        res.status(200).json(doc);
    }).catch(err=>{
        res.status(500).json({error:err});
    });    
});

router.get('/:productId',(req,res,next) =>{
    const id = req.params.productId;
    Product.findById(id).exec().then(doc =>{    
        if(doc==null){
            res.status(404).json({message:"product not found"});
        }else{
            res.status(200).json(doc);
        }
    }).catch(err=>{
        res.status(500).json({error:err});
    });    
});

router.post('/',(req,res,next)=>{
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name:req.body.name,
        price :req.body.price
    });

    product.save().then(result=>{
        console.log(result);
    });

    res.status(200).json({
        message:'product has been saved',
        product:product
    })
});

module.exports = router;