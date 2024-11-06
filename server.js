import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connectDB.js"
import authRoutes from "./routes/Auth.route.js"
import updateUserRoutes from "./routes/User.route.js"

dotenv.config()
const app = express()
const PORT = process.env.PORT

connectDB()

app.use(express.json())

app.use("/api/auth",authRoutes)
app.use("/api/user/update",updateUserRoutes)

app.listen(PORT,()=>console.log(`Server running at port ${PORT}`))