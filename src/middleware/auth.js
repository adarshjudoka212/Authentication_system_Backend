const jwt = require("jsonwebtoken");

const { TOKEN_KEY }=process.env;

const verifyToken = async(req,resp,next)=>{
    const token =  
    req.body.token ||
    req.header("Authorization").replace("Bearer ", "");
    

    //check for provided token is missing
    if(!token){
        return resp.status(401).send("an Authentication token is required");

    }

    //verify token
    try{
        const decodedToken = await jwt.verify(token,TOKEN_KEY);
        console.log("decoding is running",decodedToken);
        req.currentUser = decodedToken;

    }catch(error){
        return resp.status(403).send(`Invalid token provided ${error.message}`);

    }
    //proceed with request
    return next();

};
module.exports=verifyToken;