const User = require("./model");
const {hashData, verifyHashedData}=require("./../../utilities/hashdata");
const createToken = require("./../../utilities/createtoken");

const authenticateUser = async (data) =>{
    try{
        const{email,password}=data;
        const fetchedUser = await User.findOne({email});
    if(!fetchedUser){
        throw Error("Invalid email entered! ");
    }
    const hashedpassword = fetchedUser.password;
    const passwordMatch = await verifyHashedData
    (password,hashedpassword);

    if(!passwordMatch){
        throw Error("Invalid password entered!");
    }

    //create user token
    const tokenData = {userId:fetchedUser._id,email};
    const token = await createToken(tokenData);

    //assign user token
    fetchedUser.token = token;
    return fetchedUser;

    }catch(error){
        throw error;
    }
};


const createNewUser = async (data) =>{
    try{
        const{ name, email, password }= data;
         
        //checking if user already exist
         const existingUser = await User.findOne({email});
         
         if(existingUser){
            throw Error("User with provided email already exists");
         }
         //hash password
         const hashedpassword = await hashData(password);
         const newUser = new User({
            name,
            email,
            password:hashedpassword,
         });

         //save user
         const createdUser = await newUser.save();
         return createdUser;
        }catch(error){
        throw error;

    }
};
module.exports={createNewUser, authenticateUser}