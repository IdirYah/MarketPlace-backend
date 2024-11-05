import mongoose from "mongoose"

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)   
        console.log("Connected to MongoBD")
    } catch (error) {
        console.log("Error connecting MongoDB",error.message)
    }
}

export default connectDB