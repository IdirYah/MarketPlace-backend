import express from "express"
import { updateAcheteur,updateVendeur,updatePasswordAcheteur,updatePasswordVendeur } from "../controllers/User.controller.js"
import { authAcheteur,authVendeur } from "../middlewares/Auth.middleware.js"

const router = express.Router()

router.put("/updateAcheteur",authAcheteur,updateAcheteur)
router.put("/updateVendeur",authVendeur,updateVendeur)
router.put("/updateAcheteurPassword",authAcheteur,updatePasswordAcheteur)
router.put("/updateVendeurPassword",authVendeur,updatePasswordVendeur)

export default router