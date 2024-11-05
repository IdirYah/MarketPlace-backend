import mongoose from "mongoose"

const produitSchema = new mongoose.Schema({
    domaine:{type:String,required:true},
    nom:{type:String,required:true},
    description:{type:String,required:true},
    prix:{type:Number,default:0},
    images:[{type:String,default:[]}],
    vendeurId:{type:mongoose.Schema.Types.ObjectId,ref:"Vendeur",required:true},
},{timestamps:true})

const Produit = mongoose.model("Produit",produitSchema)

export default Produit