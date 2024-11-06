import jwt from "jsonwebtoken"
import { StatusCodes } from "http-status-codes"
import ROLE from "../constants/role.js"

const authUser = async(Role,req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(StatusCodes.UNAUTHORIZED).json({message:"Invalid authentication"})
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        if(payload.role !== Role){
            return res.status(StatusCodes.FORBIDDEN).json({message:"Access denied"})
        }
        req.userId = payload.userId
        req.role = payload.role
        next()
    } catch (error) {
        console.log(error.message)
        res.status(StatusCodes.UNAUTHORIZED).json({error:"Token verification failed"})
    }
}

const authVendeur = (req,res,next)=>authUser(ROLE.VENDEUR,req,res,next)
const authAcheteur = (req,res,next)=>authUser(ROLE.ACHETEUR,req,res,next)

export {authAcheteur,authVendeur}