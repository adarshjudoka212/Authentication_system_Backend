const express = require("express");
const router = express.Router();
const{sendPasswordResetOTPEmail,resetUserPassword}=require("./constroller");

router.post("/reset",async(req,resp)=>{
    try {
        let{email,otp,newPassword}=req.body;
        if(!(email && otp && newPassword)) throw Error("Empty credentials not allowed")


        await resetUserPassword({email,otp,newPassword});
        resp.status(200).json({email,passwordreset:true})
    
    } catch (error) {
        resp.status(400).send(error.message);
    }
});

//password reset request
router.post("/",async(req,resp)=>{
    try {
        const{email} = req.body;
        if(!email) throw Error("an Email is required")

        const createdPasswordResetOTP= await sendPasswordResetOTPEmail(email);
        resp.status(200).json(createdPasswordResetOTP);
    } catch (error) {
        resp.status(400).send(error.message);
    }
});
module.exports=router;