const express = require('express')
const Router = express.Router()
const User=require('../module/UserSchema')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');


Router.get('/C', async (req, res) => {
    res.send("Good")
})
Router.post('/Create',[
    body("name","Name Is Too Short").isLength({min:5}),
    body("email","Enter Proper Email").isEmail(),
    body("password","Password Is Too Short").isLength({min:8})
], async (req, res) => {
    try {

    const errorsofbody = validationResult(req);
    if (!errorsofbody.isEmpty()) {
      return res.json({ errors: errorsofbody.array() });
    }
    const { email,name, password } = req.body
    // console.log(req.body.email)
    // console.log(email,name,password)
    const EmailVerify = await User.findOne({ email: req.body.email })
    if (EmailVerify) {
        return res.json(  {errors:{msg: "This Email Is Already Registered"}} )
    }
    const salt= await bcrypt.genSalt(10)
    const HashPassword=await bcrypt.hash(password,salt)
    const send = await User.create({
        name: name,
        email: email,
        password: HashPassword
    })
    console.log(send)
    res.json(send)
}catch (error) {
    console.log(error.msg)
}
})


Router.post("/Login",async(req,res)=>{
    try {
        const Check=await User.findOne({email:req.body.email})
        if(!Check)
        {
            return res.status(400).json({error:'Invalid Email Or Password"'})
        }
        const passwordcheck=await bcrypt.compare(req.body.password,Check.password)
        if(!passwordcheck)
        {
            return res.status(400).json({error:'Invalid Email Or Password"'})
        }
        console.log(passwordcheck)
        res.json(Check)
    } catch (error) {
        console.log(error.msg)
    }
})

module.exports = Router;