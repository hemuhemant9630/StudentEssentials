import userModel from '../models/userModel.js'
import { comparePassword, hashPassword } from './../helpers/authHelper.js';
import JWT from 'jsonwebtoken';

export const registerController = async(req,res) => {
    try{
        const{name,email,password,phone,address} = req.body

        //validation
        if(!name){
             return res.send({error:'name is req'})
        }
        if(!email){
            return res.send({error:'email is req'})
       }
       if(!password){
        return res.send({error:'password is req'})
   }
   if(!phone){
    return res.send({error:'phone is req'})
}
if(!address){
    return res.send({error:'address is req'})
}

//check user
const existingUser = await userModel.findOne({email})
//existing user
if (existingUser){
    return res.status(200).send({
        success:true,
        message:'already registed please login',
    })
}
//register user
const hashedPassword = await hashPassword(password)
//save
const user = await new userModel({name,email,phone,address, password:hashedPassword}).save()

res.status(201).send({
    success:true,
    message:'user registerd successfully',
    user
})

    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Registration',
            error
        })
    }
}

//post login
export const loginController = async(req,res) => {
    try{
        const {email,password} = req.body
        //validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message:'Invalid Username or password'
            })
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message:'email not registered'
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match) {
            return res.status(200).send({
                success:false,
                message:'Invalid Password'
            })
        }

        //token
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn:"7d",
    });
    res.status(200).send({
    success: true,
    message: 'login successfully' ,
    user:{
    name: user.name,
    email:user.email,
    phone: user.phone,
    adddress:user.address
    },
    token
    })
    }catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Login',
            error
          });
        
    }
};

//test controller 
export const testController = (req,res) => {
  try{res.send("protected route");
  }catch(error){
    console.log(error);
    res.send({error});
  }
};