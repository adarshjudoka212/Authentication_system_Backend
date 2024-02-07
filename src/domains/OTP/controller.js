const OTP = require("./OTP");
const generateOTP = require("./../../utilities/generateOTP");
const sendEmail = require("./../../utilities/mailsender");
const {hashData, verifyHashedData} = require("./../../utilities/hashdata")
//const {MAIL_USER}=process.env;
const verifyOTP = async(email, otp)=>{
    try {
        if(!(email && otp)){
            throw Error("provide value for email, otp");
        }
        //ensure otp record exist
        const matchedOTPRecod = await OTP.findOne({
            email,
        });

        if(!matchedOTPRecod){
            throw Error("No otp records found");
        }
        if(!fetchedUser.verified){
            throw Error("Email not verified yet check your inbox")
        }

        const {expiresAt}=matchedOTPRecod;

        //checking for expired code
        if(expiresAt<Date.now()){
            await OTP.deleteOne({email});
            throw Error("code expired request a new one");
        }
        //not expired yet, verify values
        const hashedOTP = matchedOTPRecod.otp;
        const validOTP = await verifyHashedData(otp,hashedOTP);
        return validOTP;
    
    } catch (error) {
        throw error;
    }
}




const sendOTP = async({ email, subject, message, duration=1})=>

{

    try {
        if(!(email && subject && message)){
            throw Error("Provide value for email, subject, message");
        }
        //clear any old record
         await OTP.deleteOne({email});
        

         //generate pin
         const generatedOTP = await generatedOTP();
        
        //send email
        const mailOptions ={
        from: `Ducs Connect || By - Du University <${process.env.MAIL_USER}>`,
         to: `${email}`,
         subject: `${title}`,
         html: `${body}`,
        };
        await sendEmail(mailOptions);

        //save otp record
        const hashedOTP = await hashData(generateOTP);
        const newOTP = await new OTP({
            email,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt:Date.now() + 3600000* + duration,
        });
        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord;

    } catch (error) {
        throw error;
    }
};
const deleteOTP = async(email)=>{
    try {
        await OTP.deleteOne({email});
    } catch (error) {
       throw error; 
    }
}


module.exports={sendOTP, verifyOTP, deleteOTP};