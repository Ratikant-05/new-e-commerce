import User from '../Model/userModel.js';
import bcrypt from 'bcrypt';
import generateToken from '../utils/generateToken.js';


export const signupController = async (req,res)=>{
  const {email,fullName,password} = req.body;
  try {
    // check password length
    if(password.length<6){
      return res.status(400).json({message: "Password must be atleast 6 characters."})
    }
    // check user already exists or not?
    const user = await User.findOne({email});
    if(user){
      return res.status(400).json({message: "Email already exists"})
    }

    // salt aur pass
    // pass >>> salt (10)

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password,salt)
    // 123456 >> dewcdfvaewgewfadv

    const newUser = await User({
      email:email,
      fullName:fullName,
      password:hashPass
    })

    if(newUser){
      // gen jwt token
      await newUser.save(); //saving the new user in the database
      generateToken(newUser._id,res) // res is used so tha it can send the cookie in the response
      // 201 >> create
      res.status(201).json({
        _id:newUser._id,
        fullName:newUser.fullName,
        email:newUser.email,
        profilePic:newUser.profilePic
    })
    }else{
      res.status(400).json({message: "Invalid User Data"})
    }


  } catch (error) {
    console.log("Error in sign up controller", error.message)
    res.status(500).json({message: "Internal Server Error"})
  }
}

export const loginController =async (req,res)=>{
  const {email,password} = req.body;
  try {
    const user = await User.findOne({email});
    if(user){
      const isPasswordCorrect = await bcrypt.compare(password, user.password)
      if(!isPasswordCorrect){
        return res.status(400).json({message: "Invalid Credentials"})
      }else{
        generateToken(user._id,res)
        res.status(200).json({
          _id:user._id,
          fullName:user.fullName,
          email:user.email,
          profilePic:user.profilePic
        })
      }
    }else{
      return res.status(400).json({message: "Invalid Credentials"})
    }

  } catch (error) {
    console.log("Error in loginController", error.message)
    res.status(500).json({message: "Server Side Error"})
  }
}

export const logoutController = (req,res)=>{
 try {
   res.cookie("jwt", "", {maxAge:0})
   res.status(200).json({message: "Logged out Successfully."})
 } catch (error) {
  console.log("Error in logged out Controller", error.message)
  res.status(500).json({message: "Internal Server Error"})
 }
}

export const updateProfile = async (req,res) => {
  const {profilePic} = req.body;
  const userId = req.user._id;

 try {
   if(!profilePic){
     res.status(400).json({message: "Profile Pic Required"})
   }
 
   const uploadResponse = await cloudinary.uploader.upload(profilePic); //upload image to cloudinary
   const updatedUser = await User.findByIdAndUpdate(
     userId,
     {profilePic: uploadResponse.secure_url}, //response ke andar se >>> profile pic return
     {new:true}
   )
 
   res.status(200).json(updatedUser)
 } catch (error) {
  res.status(500).json({message: "Internal Server Error"})
 }
}


// give you the authenticated user
export const checkAuth = (req,res)=>{
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({message: "Internal Server Error"});
  }
} //will call this function whenever the page is refreshed
