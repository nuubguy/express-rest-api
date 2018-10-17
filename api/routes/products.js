const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');


router.get('/',(req,res,next) =>{
    res.status(200).json({
        message:'product its ok'
    })    
});

router.post('/',(req,res,next)=>{

    // const product ={
    //     productId:req.body.productId,
    //     name:req.body.name,
    //     price:req.body.price
    // }

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