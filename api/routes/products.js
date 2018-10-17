const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) =>{
    res.status(200).json({
        message:'product its ok'
    })    
});

router.post('/',(req,res,next)=>{

    const product ={
        productId:req.body.productId,
        name:req.body.name,
        price:req.body.price
    }

    res.status(200).json({
        message:'product has been saved',
        product:product
    })
});

module.exports = router;