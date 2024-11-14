import express from "express"
import { addProduct, deleteProduct, getProductByDomaine, getProductByName, getProductByPrice, updateProduct } from "../controllers/Produit.controller.js"
import { authVendeur,authAcheteur } from "../middlewares/Auth.middleware.js"

const router = express.Router()

router.post("/addProduct",authVendeur,addProduct)
router.put("/updateProduct",authVendeur,updateProduct)
router.get("/getProductsByName",authAcheteur,getProductByName)
router.get("/getProductsByDomaine",authAcheteur,getProductByDomaine)
router.get("/getProductsByPrice",authAcheteur,getProductByPrice)
router.delete("/deleteProduct/:idProduct",authVendeur,deleteProduct)

export default router