const User = require("./../user/model");
const{sendOTP,verifyOTP,deleteOTP}=require("./../OTP/controller");
const {hashData}=require("./../../utilities/hashdata");
const resetUserPassword = async(email,otp,newPassword)=>{
    try {
       const validOTP = await verifyOTP({email,otp});
       if(!validOTP){
        throw Error("Invalid code passed check your inbox")
       }

       //now update user record with the ne password.
       if(newPassword.length<8){
        throw Error("password too short")
       }
       const hashedNewPassword = await hashData(newPassword);
       await User.updateOne({email},{password:hashedNewPassword});
       await deleteOTP(email);
       return;
    } catch (error) {
        throw error
    }
}


const sendPasswordResetOTPEmail = async(email)=>{
    try {
        //check if account exist
        const existingUser = await User.findOne({email});
        if(!existingUser){
            throw Error("there is no account for the provided email");

        }
        if(!existingUser.verified){
            throw Error("Email not verified yet check your inbox");
            
        }
        const otpDetails={
            email,
            subject:"password reset",
            message:"Enter the code below to reset our password",
            duration:1
        };
        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;

    } catch (error) {
        throw error;
    }

};
module.exports={sendPasswordResetOTPEmail, resetUserPassword};