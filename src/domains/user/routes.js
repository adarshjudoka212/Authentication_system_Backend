const express = require("express");
const { createNewUser, authenticateUser} = require("./controller");
const router = express.Router();
const auth = require("../../middleware/auth");
const {sendVerificationOTPEmail}=require("../email_verification/controller")
//protected route
router.get("/private_data",auth,(req,resp)=>{
    resp.status(200).send(`you are in the private territory of ${req.currentUser.email}`);
})



//signin
router.post("/",async(req,resp)=>{
    try{
        let { email, password } = req.body;
        email = email.trim();
        password = password.trim();

        if(!(email && password)){
            throw Error("Empty credentials");
        }
        const authUser= await authenticateUser({email,password});

        resp.status(200).json(authUser);
    }catch (error){
        resp.status(400).send(error.message);
    }
});

//signup
router.post("/signup", async(req,resp)=>{
    try{
        let{ name,email,password } = req.body;
        name = name.trim();
        email = email.trim();
        password = password.trim();

        if(!(name && email && password)){
            throw Error("empty input fields");
        }else if (!/^[a-zA-Z]*$/.test(name)){
            throw Error("Invalid name");
        }else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
            throw Error("Invalid email");
        }else if(password.length<8){
            throw Error("password is too short minimum 8 character required");
        //if good credentials, create new user
        }else{
            const newUser= await createNewUser({
            name,
            email,
            password,
            });
            await sendVerificationOTPEmail(email);
            resp.status(200).json(newUser);
        }
    }catch(error){
        resp.status(400).json(error.message);

    }
});
 module.exports=router;