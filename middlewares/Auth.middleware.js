import jwt from "jsonwebtoken"
import { StatusCodes } from "http-status-codes"

const authUser = async(req,res,next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(StatusCodes.UNAUTHORIZED).json({message:"invalid authentication"})
    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET)
        req.userId = payload.userId
        req.role = payload.role
        next()
    } catch (error) {
        console.log(error.message)
        res.status(StatusCodes.UNAUTHORIZED).json({error:"Token verification failed"})
    }
}

export default authUser