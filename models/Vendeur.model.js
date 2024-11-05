import mongoose from "mongoose"
import userSchema from "./User.model.js"

const vendeurSchema = new mongoose.Schema({
    ...userSchema.obj,
},{timestamps:true})

const Vendeur  = mongoose.model("Vendeur",vendeurSchema)

export default Vendeur