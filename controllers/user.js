const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/user')
const Carts = require('../models/cart')
const address = require("../models/address")

// generator token 
const generatetoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  };


// this function get the users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
  res.status(200).json(users)
})

// this function gets a user data

//////////////////////////////////////////////////////////////////////////////////////
// this function Registers a user
const registerUser = async (req, res) => {
    const { name, email, password, userType } = req.body;
  
    // Check if all required fields are present
    if (!name || !email || !password ||!userType) {
      if(!name){
        return res.send({ message: "Please provide all required the name." });
      }
      else if(!email){
        return res.send({ message: "Please provide email." });
      }
      else if(!password){
        return res.send({ message: "Please provide password." });
      }
      else if (!userType){
        return res.send({ message: "Please provide role" });
      }
      return res.send({ message: "Please provide all required fields." });
    }
  
    try {
      // Check if the user already exists in the database
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.send({ message: "User already exists." });
      }
  
      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
  
      // Create and save the new user
      const newUser = new User({ name, email, password:hashedPassword, userType });
      const savedUser = await newUser.save();
  
      res.send({ message: "User created successfully" , token:generatetoken(savedUser.id),userType, _id: savedUser.id, password:hashedPassword}
      );
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "An error occurred while registering the user." });
    }
  };
//////////////////////////////////////////////////////////////////////////

// this function Authenticate a user
const loginUser=async(req,res)=>{
    const {email,password}=req.body
    // Check for User email 
    const user =await User.findOne({email})
    
    if(user &&(await bcrypt.compare(password, user.password))){
        return   res.json ({
          message: "User exists",
            _id:user.id,
            email:user.email,
            userType:user.userType,
            token:generatetoken(user.id)
      
            
        })
    }else {
      res.status(401).json({ message: "User doesn't exist" });


    }
}


module.exports = {
  registerUser,
  loginUser,
  getUsers,
}