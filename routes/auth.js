const express = require('express')
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken')

router.post('/register',async (req,res)=>{
    const {username,email,password} = req.body;
    try{
        let user = await User.findOne({email})
        if(user) {
            return res.status(400).json({msg:'User already exists'});
        }
        user  = new User({username , email , password});
        await user.save();
        const token = user.getSignedJwtToken();
        res.status(201).json({token});
    }
    catch (err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


router.post('/login',async(req,res)=>{
    const {email, password} = req.body;

    try{
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({msg:'Invalid credentials'});
        }
        const isMatch = await user.matchPassword(password);
        if(!isMatch){
            return res.status(400).json({mmsg:'Invalid credentials'})
        }
        const token = user.getSignedJwtToken();
        res.json({token});

    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error') 
       }
});
module.exports = router;