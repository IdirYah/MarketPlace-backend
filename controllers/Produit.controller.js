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
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:"Internal server error"})
    }
}

export const updateProduct = async(req,res)=>{
    try {
        const {idProduit,domaine,nom,description,prix} = req.body
        if(!idProduit){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Product Id is required"})
        }
        const oldProduit = await Produit.findById(idProduit,)
        if(!oldProduit){
            return res.status(StatusCodes.NOT_FOUND).json({message:"Product not found"})
        }
        oldProduit.domaine = domaine || oldProduit.domaine
        oldProduit.nom = nom || oldProduit.nom
        oldProduit.description = description || oldProduit.description
        oldProduit.prix = prix || oldProduit.prix
        await oldProduit.save()
        res.status(StatusCodes.OK).json({message:"Product updated with sucess"})
    } catch (error) {
        console.log(error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:"Internal server error"})
    }
}

export const getProductByName = async(req,res)=>{
    try {
        const {nom} = req.body
        if(!nom){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Name is required"})
        }
        const products = await Produit.find({nom})
        if(products.length === 0){
            return res.status(StatusCodes.NOT_FOUND).json({message:"No product found with this name"})
        }
        res.status(StatusCodes.OK).json(products)
    } catch (error) {
        console.log(error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:"Internal server error"})
    }
}

export const getProductByDomaine = async(req,res)=>{
    try {
        const {domaine} = req.body
        if(!domaine){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Domaine is required"})
        }
        const products = await Produit.find({domaine})
        if(products.length === 0){
            return res.status(StatusCodes.NOT_FOUND).json({message:"No product found with this domaine"})
        }
        res.status(StatusCodes.OK).json(products)
    } catch (error) {
        console.log(error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:"Internal server error"})
    }
} 

export const getProductByPrice = async(req,res)=>{
    try {
        const {prixMn,prixMx} = req.body
        if(!prixMn || !prixMx){
            return res.status(StatusCodes.BAD_REQUEST).json({message:"Prices are required"})
        }
        const prixMin = Number(prixMn)
        const prixMax = Number(prixMx)
        if (isNaN(prixMin) || isNaN(prixMax)) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Prices must be numbers" })
        }
        const products = await Produit.find({prix:{$gte:prixMin,$lte:prixMax}})
        if(products.length === 0){
            return res.status(StatusCodes.NOT_FOUND).json({message:"No product found with these prices"})
        }
        res.status(StatusCodes.OK).json(products)
    }catch(error){
        console.log(error.message)
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({error:"Internal server error"})
    }
}