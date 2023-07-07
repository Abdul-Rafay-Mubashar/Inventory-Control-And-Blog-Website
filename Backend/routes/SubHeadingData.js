const express = require('express')
const Router = express.Router()
const { body, validationResult } = require('express-validator');
const SubHeading=require('../module/SubHeadingSchema')



Router.post("/Add",[
    body('subheading', 'Subheading Cannot be Empty').isLength({ min: 1 })
],async(req,res)=>{
    try {
        console.log(req.body)
        const errorsofbody = validationResult(req);
        if (!errorsofbody.isEmpty()) {
          return res.json({ errors: errorsofbody.array() });
        }
        const {name,subheading,blog_id,secNo}=req.body
        const Response=await SubHeading.create({
            name:name,
            subheading:subheading,
            blog_id:blog_id,
            secNo:secNo
        })
        // console.log(Head)
        res.json(Response)
    } catch (error) {
        res.json({errors:error.message})
    }

})


Router.post("/GetById/:id",async(req,res)=>{
    try {
         // Access the id property of the request body
        console.log(req.params.id)
        const head=await SubHeading.find({blog_id:req.params.id})
        
        res.json(head)
    } catch (error) {
        res.json({errors:error.message})
    }

})


Router.put("/Delete/:id",async(req,res)=>{
    try {
         // Access the id property of the request body
        console.log(req.params.id)
        const head=await SubHeading.deleteMany({blog_id:req.params.id})
        
        res.json(head)
    } catch (error) {
        res.json({errors:error.message})
    }

})
module.exports = Router;