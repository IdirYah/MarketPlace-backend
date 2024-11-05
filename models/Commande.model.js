import mongoose from "mongoose"

const commandeSchema = new mongoose.Schema({
    produitId:{type:mongoose.Schema.Types.ObjectId,ref:"Produit",required:true},
    status:{type:Boolean,default:false},
},{timestamps:true})

const Commande = mongoose.model("Commande",commandeSchema)

export default Commande