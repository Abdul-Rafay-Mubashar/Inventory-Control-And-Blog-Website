const express = require('express')
const fs = require('fs');
const path = require('path');
const Router = express.Router()
const Item=require('../module/ItemData')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const multer = require("multer");
const app = express();
const crypto = require('crypto');


Router.post("/Search", async (req, res) => {
  try {
    const searchValue = req.body.search;
    const query = {
      name: { $regex: `^${searchValue}`, $options: 'i' }
    };
    const results = await Item.find(query).exec();
    console.log(results);
    res.json(results);
  } catch (error) {
    res.json({ errors: error.message });
  }
});

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


Router.post('/api', async (req, res) => {
  res.json("Good")
})
Router.post('/upload', upload.single('image'), function (req, res, next) {
  console.log("Good")
  const file = req.file;
  if (!file) {
    const error = new Error('Please upload a file');
    error.status = 400;
    return next(error);
  }

  const joinedFilename = file.originalname;
  // good=joinedFilename;
  console.log(good)
  console.log(joinedFilename)
  const imageUrl = req.protocol + '://' + req.get('host') + '/' + good;
  console.log(imageUrl)
  res.json(imageUrl)
});

module.exports = Router;

Router.post('/getitem/:id', async (req, res) => {
    const item=await Item.findOne({_id:req.params.id})
    res.json(item)
})

Router.post(
  '/Add',
  [body('name', 'Name Is Too Short').isLength({ min: 2 }), upload.single('image')],
  async (req, res) => {
    try {
      const { name, price, discription } = req.body;
      const nameCheck = await Item.findOne({ name: name });
      if (nameCheck) {
        return res.json({ error: { msg: 'This Name Item Is Already Registered' } });
      }
      const item = await Item.create({
        name: name,
        price: price,
        discription: discription,
        image:good
      });

      res.json(item)
    } catch (error) {
      console.log(error);
    }
  }
);
Router.post('/All', async (req, res) => {
  try {
      const imageUrl = req.protocol + '://' + req.get('host') + '/';
      const items = await Item.find({});
      items.forEach(item => {
        // Construct the new image URL
        const imageUrl = `${req.protocol}://${req.get('host')}/${item.image}`;
      
        // Update the image field of the item
        console.log(imageUrl)
        item.image = imageUrl;})
      if (!items) {
          return res.json({ error: { msg: "No Item Found" } });
      }
      const Items=await Item.find({})
      res.json(Items);
  } catch (error) {
      res.json(error);
      console.log(error.msg);
  }
});



Router.put('/Delete/:id', async (req, res) => {
    try {
        const Items=await Item.findOneAndDelete({_id:req.params.id})
        console.log(Items)
        res.json({msg:"Item Is Deleted"})

}catch (error) {
    res.json(error)
    console.log(error.msg)
}
})

Router.put('/Update/:id', async (req, res) => {
    try {
        const {name,price,discription}=req.body
        const name1=await Item.findOne({name:name})
        console.log(name,price,discription)
        if(name1)
        {
            return res.json({error:{msg:"This Name Item I Already Present"}})
        }
        const Items=await Item.findOneAndUpdate({_id:req.params.id},
            { name, price, discription },
            { new: true })
        console.log(Items)
        res.json({msg:"Item Is Updated"})

}catch (error) {
    res.json(error)
    console.log(error.msg)
}
})

module.exports = Router;