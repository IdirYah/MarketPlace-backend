import {StatusCodes} from "http-status-codes"
import Acheteur from "../models/Acheteur.model.js"
import Vendeur from "../models/Vendeur.model.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import ROLE from "../constants/role.js"

const registerUser = async(role,Model,req,res)=>{
    try {
        const {fullName,userName,numTel,gender,password} = req.body
        if(!fullName || !userName || !numTel || !gender || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Please enter your credentials"})
        }
        if(password.length<6){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Your password should have at least 6 characters"})
        }
        const user = await Model.findOne({$or:[{userName},{numTel}]})
        if(user){
            res.status(StatusCodes.CONFLICT).json({message:`${role} with this userName or numTel already exists`})
        }
        const salt = await bcrypt.genSalt(10)
        const hashMDP = await bcrypt.hash(password,salt)
        const newUser = new Model({
            fullName:fullName,
            userName:userName,
            numTel:numTel,
            gender:gender,
            password:hashMDP,
        })
        await newUser.save()
        const token = jwt.sign({userId:newUser._id,role:role},process.env.JWT_SECRET,{expiresIn:"30d"})
        res.status(StatusCodes.CREATED).json({
            fullName,
            userName,
            numTel,
            gender,
            role,
            token
        })
    } catch (error) {
        console.log(error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:"Internal server error"})
    }
}

const loginUser = async(role,Model,req,res)=>{
    try {
        const {userName,password} = req.body
        if(!userName || !password){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Please enter your credentials"})
        }
        const user = await Model.findOne({userName},)
        if(!user){
            return res.status(StatusCodes.UNAUTHORIZED).json({message:"Invalid userName or password"})
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(StatusCodes.UNAUTHORIZED).json({message:"Invalid userName or password"})
        }
        const token = jwt.sign({userId:user._id,role:role},process.env.JWT_SECRET,{expiresIn:"30d"})
        res.status(StatusCodes.OK).json({
            message:`${role} logged in successfully`,
            userName:userName,
            token:token
        })
    } catch (error) {
        console.log(error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:"Internal server error"})
    }
}

const registerAcheteur = (req,res)=>registerUser(ROLE.ACHETEUR,Acheteur,req,res)
const loginAcheteur = (req,res)=>loginUser(ROLE.ACHETEUR,Acheteur,req,res)

const registerVendeur = (req,res)=>registerUser(ROLE.VENDEUR,Vendeur,req,res)
const loginVendeur = (req,res)=>loginUser(ROLE.VENDEUR,Vendeur,req,res)

export {registerAcheteur,registerVendeur,loginAcheteur,loginVendeur}