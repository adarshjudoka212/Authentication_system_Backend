const express=require("express");
const router = express.Router();
const {sendVerificationOTPEmail, verifyUserEmail}=require("./controller")
//request new verification otp
router.post("/verify",async(req,resp)=>{
    try {
        let {email,otp}=req.body;
        if(!(email && otp)) throw Error("Empty otp details are not allowed")
        await verifyUserEmail({email,otp});
    resp.status(200).json({email,verified:true});
    } catch (error) {
    resp.status(400).send(error.message);
    }
})

router.post("/",async(req,resp)=>{
   try {
    const {email} = req.body;
    if(!email) throw Error("an email is required");

    const createdEmailVerificationOTP = await sendVerificationOTPEmail(email);
    resp.status(200).json(createdEmailVerificationOTP);

} catch (error) {
    resp.status(400).send(error.message);
   } 
})
module.exports=router;