import mongoose from "mongoose"

const commandeSchema = new mongoose.Schema({
    produitId:{type:mongoose.Schema.Types.ObjectId,ref:"Produit",required:true},
    acheteurId:{type:mongoose.Schema.Types.ObjectId,ref:"Acheteur",required:true},
    isConfirmed:{type:Boolean,default:false},
    isCancelled:{type:Boolean,default:false},
},{timestamps:true})

const Commande = mongoose.model("Commande",commandeSchema)

export default Commande