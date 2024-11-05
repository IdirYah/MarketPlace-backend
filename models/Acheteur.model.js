import mongoose from "mongoose"
import userSchema from "./User.model.js"

const acheteurSchema = new mongoose.Schema({
    ...userSchema.obj,
},{timestamps:true})

const Acheteur =  mongoose.model("Acheteur",acheteurSchema)

export default Acheteur