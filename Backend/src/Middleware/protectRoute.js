import jwt from 'jsonwebtoken';
import User from '../Model/userModel.js';

const protectRoute = async (req,res,next)=>{
  try {
    // checking the user has token or not?
    const token = req.cookies.jwt;

    if(!token){
      return res.status(401).json({message: "Unauthorized: No Token Provided"});
    }

    const decoded = jwt.verify(token,process.env.JWT_SECRET) //verified token (token >>> userId)

    if(!decoded){
      res.status(401).json({message: "Unauthorized - Invalid Token"})
    }

    const user = await User.findById(decoded.userId).select("-password");
    // email, fullname, profilepicture, password -select  

    if(!user){
      res.status(404).json({message: "User not Found"})
    }

    req.user = user; //putting the valid user in a user variable
    
    next();

  } catch (error) {
    res.status(500).json({message: "Internal Server Error"})
  }
}


export default protectRoute;