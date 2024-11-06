import Acheteur from "../models/Acheteur.model.js"
import Vendeur from "../models/Vendeur.model.js"
import bcrypt from "bcryptjs"
import { StatusCodes } from "http-status-codes"

const updateUser = async(Model,req,res)=>{
    try {
        const {fullName,userName,numTel} = req.body
        const userId = req?.userId
        if(!userId){
            return res.status(StatusCodes.NOT_FOUND).json({message:"user doesn't exists"})
        }
        const oldUser = await Model.findById(userId,)
        if(!oldUser){
            return res.status(StatusCodes.NOT_FOUND).json({message:"user doesn't exists"})
        }
        oldUser.fullName = fullName || oldUser.fullName
        oldUser.userName = userName || oldUser.userName
        oldUser.numTel = numTel || oldUser.numTel
        await oldUser.save()
        res.status(StatusCodes.OK).json({message:"user updated with success"})
    } catch (error) {
        console.log(error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:"Internal server error"})
    }
}
const updateUserPassword = async(Model,req,res)=>{
    try {
        const userId = req.userId
        if(!userId){
            return res.status(StatusCodes.NOT_FOUND).json({message:"User doesn't exists"})
        }
        const {oldPassword,newPassword,confirmPassword} = req.body
        if(!oldPassword || !newPassword || !confirmPassword){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Please enter your credentials"})
        }
        const oldUser = await Model.findById(userId,)
        if(!oldUser){
            return res.status(StatusCodes.NOT_FOUND).json({message:"User doesn't exists"})
        }
        const isMatch = await bcrypt.compare(oldPassword,oldUser.password)
        if(!isMatch){
            return res.status(StatusCodes.UNAUTHORIZED).json({message:"Invalid password"})
        }
        if(newPassword !== confirmPassword){
            return res.status(StatusCodes.UNAUTHORIZED).json({message:"Passwords doesn't match"})
        }
        const salt = await bcrypt.genSalt(10)
        const hashMDP = await bcrypt.hash(newPassword,salt)
        oldUser.password = hashMDP
        await oldUser.save()
        res.status(StatusCodes.OK).json({message:"Password updated with success"})
    } catch (error) {
        console.log(error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:"Internal server error"})
    }
}

const updateAcheteur = (req,res)=>updateUser(Acheteur,req,res)
const updateVendeur = (req,res)=>updateUser(Vendeur,req,res)
const updatePasswordAcheteur = (req,res)=>updateUserPassword(Acheteur,req,res)
const updatePasswordVendeur = (req,res)=>updateUserPassword(Vendeur,req,res)

export {updateAcheteur,updateVendeur,updatePasswordAcheteur,updatePasswordVendeur}