import {StatusCodes} from "http-status-codes"
import Produit from "../models/Produit.model.js"

export const addProduct = async(req,res)=>{
    try {
        const vendeurId = req?.userId
        const {domaine,nom,description,prix} = req.body
        if(!domaine || !nom || !description){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Please enter your credentials"})
        }
        const newProduct = new Produit({
            domaine:domaine,
            nom:nom,
            description:description,
            prix:prix || 0,
            vendeurId:vendeurId
        })
        await newProduct.save()
        res.status(StatusCodes.CREATED).json({message:"Product added with success"}) 
    } catch (error) {
        console.log(error.message)
    }
}