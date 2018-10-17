const express = require('express');
const router = express.Router();

router.get('/',(req,res,next) =>{
    res.status(200).json({
        message:'order its ok'
    })    
});

router.post('/',(req,res,next) =>{
    const order ={
        orderId: req.body.orderId,
        productId: req.body.productId,
        orderDate: req.body.orderDate,
        quantity: req.body.quantity,

    }
    res.status(200).json({
        message:'order its ok',
        order:order
    })    
});

module.exports = router;