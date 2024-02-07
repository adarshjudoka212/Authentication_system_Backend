const User = require("./../user/model");
const {sendOTP, verifyOTP, deleteOTP}=require("./../OTP/controller");

const verifyUserEmail = async({email, otp})=>{
    try {
        const validOTP = await verifyOTP({email,otp});
        if(!validOTP){
            throw Error("Invalid code passed. check your inbox");
        }
        //update user record to show verified
        await User.updateOne({email},{verified:true});
        await deleteOTP(email);
        return;

    
    } catch (error) {
        
        throw error;
    }
}



const sendVerificationOTPEmail = async(email)=>{
    try {
        //check if account exist
        const existingUser = await User.findOne({email});
        if(!existingUser){
            throw Error("there is no account dor the provided email")
        }
        const otpDetails ={
            email,
            subject:"Email verification",
            message:"verify your email with the code below",
            duration:1,
        };
    } catch (error) {
        throw error;
    }
};
module.exports={sendVerificationOTPEmail, verifyUserEmail};