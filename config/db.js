const mongoose = require('mongoose')
const connectDB = async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URI,{
            useNewURLParser:true,
            useUnifiedTopology:true,
        });
        console.log("Mongodb connected..");
    }catch(err){
            console.error("Exit process with failure");
            process.exit(1);
    }
}
module.exports = connectDB;