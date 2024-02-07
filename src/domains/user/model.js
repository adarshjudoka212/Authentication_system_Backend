const mongoose = require("mongoose");
const Schema = mongoose.Schema;
 const UserSchema = new Schema({
    name:{type: String,},
    email:{type:String,unique:true},
    password:{type:String},
    token:{type:String},
    verified:{type:Boolean,default:false},
 });

 const User = mongoose.model("User",UserSchema);
 module.exports=User;