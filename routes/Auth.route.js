import express from "express"
const router = express.Router()
import {registerAcheteur,registerVendeur,loginAcheteur,loginVendeur} from "../controllers/Auth.controller.js"

router.post("/registerAcheteur",registerAcheteur)
router.post("/registerVendeur",registerVendeur)
router.post("/loginAcheteur",loginAcheteur)
router.post("/loginVendeur",loginVendeur)

export default router