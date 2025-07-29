const mongoose = require('mongoose');
const JournalEntrySchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    mood:{
        type:Number,
        required:true,
    },
    text:{
        type: String,
        required:true,
    },
    sentiment:{
        type:String,
        default:'neutral',
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
});
module.exports = mongoose.model('JournalEntry', JournalEntrySchema);