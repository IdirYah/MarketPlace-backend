import express from "express"
import { addProduct } from "../controllers/Produit.controller.js"
import { authVendeur } from "../middlewares/Auth.middleware.js"
import router from "./User.route.js"

const routes = express.Router()

router.post("/addProduct",authVendeur,addProduct)

export default router