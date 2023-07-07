const express = require('express')
const Router = express.Router()
const { body, validationResult } = require('express-validator');
const Heading=require('../module/Heading')



Router.post("/Add",[
    body('heading', 'Heading Cannot be Empty').isLength({ min: 3 }),
],async(req,res)=>{
    try {
        console.log(req.body)
        const errorsofbody = validationResult(req);
        if (!errorsofbody.isEmpty()) {
          return res.json({ errors: errorsofbody.array() });
        }
        const {name,heading,blog_id,secNo}=req.body
        const Head=await Heading.create({
            heading:heading,
            name:name,
            blog_id:blog_id,
            secNo:secNo
        })
        console.log(Head)
        res.json(Head)
    } catch (error) {
        res.json({errors:error.message})
    }

})



Router.get("/GetAll",async(req,res)=>{
    try {
        console.log(req.body)
        const Head=await Heading.find({})
        if(!Head){
            res.json({msg:"No Blog Found"})
        }
        console.log(Head)
        res.json(Head)
    } catch (error) {
        res.json({errors:error.message})
    }

})


Router.post("/Search", async (req, res) => {
    try {
      const searchValue = req.body.search;
      const query = {
        heading: { $regex: `^${searchValue}`, $options: 'i' }
      };
      const results = await Heading.find(query).exec();
      console.log(results);
      res.json(results);
    } catch (error) {
      res.json({ errors: error.message });
    }
  });


Router.post("/GetById/:id",async(req,res)=>{
    try {
         // Access the id property of the request body
        console.log(req.params.id)
        const head=await Heading.find({blog_id:req.params.id})
        
        res.json(head)
    } catch (error) {
        res.json({errors:error.message})
    }

})


Router.put("/Delete/:id",async(req,res)=>{
    try {
         // Access the id property of the request body
        console.log(req.params.id)
        const head=await Heading.findOneAndDelete({blog_id:req.params.id})
        console.log(head)
        res.json("Deleted Sucessfully")
    } catch (error) {
        res.json({errors:error.message})
    }

})
module.exports = Router;