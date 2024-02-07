require("dotenv").config();
const mongoose = require("mongoose");

//uri
const { MONGODB_URI }= process.env;

const connectDB = async () => {
    try{
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");
    }catch(error){
        console.log(error);

 } 
  };
connectDB(); 