const express = require('express')
const Router = express.Router()
const { body, validationResult } = require('express-validator');
const Para=require('../module/ParaSchema')



Router.post("/Add",[
    body('content', 'ParaGraph Cannot be Empty').isLength({ min: 1 })
],async(req,res)=>{
    try {
        console.log(req.body)
        const errorsofbody = validationResult(req);
        if (!errorsofbody.isEmpty()) {
          return res.json({ errors: errorsofbody.array() });
        }
        const {name,content,blog_id,secNo}=req.body
        const para=await Para.create({
            name:name,
            content:content,
            blog_id:blog_id,
            secNo:secNo
        })
        console.log(para)
        res.json(para)
    } catch (error) {
        res.json({errors:error.message})
    }

})


Router.post("/GetById/:id",async(req,res)=>{
    try {
         // Access the id property of the request body
        console.log(req.params.id)
        const head=await Para.find({blog_id:req.params.id})
        
        res.json(head)
    } catch (error) {
        res.json({errors:error.message})
    }

})



Router.put("/Delete/:id",async(req,res)=>{
    try {
         // Access the id property of the request body
        console.log(req.params.id)
        const head=await Para.deleteMany({blog_id:req.params.id})
        
        res.json(head)
    } catch (error) {
        res.json({errors:error.message})
    }

})
module.exports = Router;