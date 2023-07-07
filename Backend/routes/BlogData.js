const express = require('express')
const Router = express.Router()
const Bloging=require('../module/BlogSchema')



Router.post("/Add",async(req,res)=>{
    try {
        const blog=await Bloging.create({

        })
        // console.log(blog)
        res.json(blog)
    } catch (error) {
        res.json({errors:error.message})
        console.log(error.message)
    }

})


Router.put("/Delete/:id",async(req,res)=>{
    try {
        const id=req.params.id
        const Blogsfirst=await Bloging.findOne({_id:id})
        const Blogs=await Bloging.findOneAndDelete({_id:req.params.id})
        console.log(Blogsfirst,"check")
        res.json("Deleted Sucessully")
    } catch (error) {
        res.json({errors:error.message})
        console.log(error.message)
    }

})
module.exports = Router;