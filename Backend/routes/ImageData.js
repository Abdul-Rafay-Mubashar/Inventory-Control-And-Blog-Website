const express = require('express')
const fs = require('fs');
const path = require('path');
const Router = express.Router()
const Image=require('../module/ImageSchema')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const multer = require("multer");
const app = express();
const crypto = require('crypto');


var good;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'backend/public/');
  },
  filename: function (req, file, cb) {
    const originalFileName = file.originalname;
    const fileExtension = path.extname(originalFileName);
    const timestamp = Date.now();
    const newFileName = `${timestamp}${fileExtension}`;
    good=newFileName
    cb(null, newFileName);
  }
});
const upload = multer({ storage: storage });
Router.use(express.static(__dirname + "\\public"))


Router.post('/upload/simple', upload.single('image'), function (req, res, next) {
  console.log("Good")
  const file = req.file;
  if (!file) {
      res.json({errors:{msg:"Please Attach The File"}})
  }

  const joinedFilename = file.originalname;
  // good=joinedFilename;
  // console.log(good)
  // console.log(joinedFilename)
  const imageUrl = req.protocol + '://' + req.get('host') + '/' + good;
  console.log(imageUrl)
  res.json(imageUrl)
});

Router.post('/upload/Blog-Simple-Image',  async (req, res) =>{
  const {name,blog_id,secNo, image_id}=req.body;
  console.log(good)


  const imgs=await Image.create({
    name:name,
    blog_id:blog_id,
    image:good,
    secNo:secNo,
    image_id:image_id
  })
  res.json(imgs)
})
Router.get("/GetAll",async(req,res)=>{
  try {
      console.log(req.body)
      const Head = await Image.find({ image_id: 1 });
      if(!Head){
          res.json({msg:"No Blog Found"})
      }
      console.log(Head)
      res.json(Head)
  } catch (error) {
      res.json({errors:error.message})
  }

})
Router.post("/GetById/:id",async(req,res)=>{
  try {
       // Access the id property of the request body
      console.log(req.params.id)
      const head=await Image.find({blog_id:req.params.id})
      
      res.json(head)
  } catch (error) {
      res.json({errors:error.message})
  }

})
module.exports = Router;