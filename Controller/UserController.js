const userModel = require('../Model/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const saveUser = async(req,res)=>{
    const{name, email, password}=req.body;

    try{
        const hashedpassword = await bcrypt.hash(password, 10)
       const newUser =  new userModel({
        name,
        email,
        password: hashedpassword
       })
      await newUser.save();
      res.status(201).json({message: "User is registerd Successfully"})
    }
    catch(error){
     res.status(500).json({message: "Something went wrong"})
    }
}

const LoginUser = async(req,res)=>{
    const {email, password} = req.body;

    try{
        const user = await userModel.findOne({email})

        if(!user){
            return res.status(404).json({message: "user not found"})
        }
        const comparepassword = await bcrypt.compare(password, user.password)
        if(!comparepassword){
            return res.status(401).json({message: "Incorrect password"})
        }
        const token = jwt.sign({id: user._id, email: user.email}, "our_secreate_key", {expiresIn:"1h"})
        return res.status(200).json({message: "Login Successfully", user, "token": token})
    }
    catch(err){
        return res.status(500).json({message:"Login failed", error: err.message})
    }
}
module.exports = {saveUser, LoginUser}