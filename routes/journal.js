const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const JournalEntry = require('../models/JournalEntry');

router.post('/',protect, async(req,res)=> {
    const {date, mood,text, sentiment} =req.body;
    try{
        const newEntry = new JournalEntry({
            user:req.user.id,
            date,
            mood,
            text,
            sentiment,
        });
        const entry =  await newEntry.save();
        res.json(entry);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

router.get('/',protect,async(req,res)=>{
    try{
        const entries = await JournalEntry.find({user:req.user.id}).sort({date:-1});
        rmSync.json(entries);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');
    }
})
module.exports = router;