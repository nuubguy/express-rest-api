const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');


router.get('/',(req,res,next) =>{
    Product.find().select('_id name price').exec().then(docs =>{
        const response ={
            count: docs.length,
            products: docs.map(doc =>{
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request:{
                        type:'GET',
                        url:'http://localhost:3000/products/'+ doc._id
                    }
                }
            })
        }
        if(docs.length==0){
            res.status(200).json({message:"data not found"});        
        }else{
            res.status(200).json(response);
        }
    }).catch(err=>{
        res.status(500).json({error:err});
    });    
});

router.get('/:productId',(req,res,next) =>{
    const id = req.params.productId;
    Product.findById(id).select('_id name price')
    .exec()
    .then(docs =>{    
        if(docs==null){
            res.status(404).json({message:"product not found"});
        }else{
            res.status(200).json({docs,
                request:{
                    type:"GET",
                    description:"Get all products",
                    url:'http://localhost:3000/products/'
            }
        });
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
        res.status(200).json({
            message:'product has been saved',
            product:{
                _id: result._id,
                name: result.name,
                price: result.price,
                request:{
                    type:"GET",
                    url:'http://localhost:3000/products/'+ result._id
                }
            }
        })
    });
});

router.delete('/:productId',(req,res,next)=>{
    const id = req.params.productId;
    Product.remove({_id:id})
    .exec()
    .then(result =>{
        res.status(200).json({request:{
            type:"GET",
            url:'http://localhost:3000/products/'
        }});
    }).catch(err=>{
        res.status(500).json({error:err});
    });
});

router.patch('/:productId',(req,res,next)=>{
    const id= req.params.productId;
    const updateOps = {};
    for(const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id:id},{$set: updateOps})
    .exec().then(result =>{        
        res.status(200).json({request:{
            type:"GET",
            url:'http://localhost:3000/products/'+ result._id
        }});
    }).catch(err=>{
        res.status(500).json({error:err});
    });
});

module.exports = router;