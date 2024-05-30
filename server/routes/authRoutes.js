const express=require("express")
const router=express.Router()
const authController=require("../controller/authController")


const verifyJWT = require("../middleware/verifyJWT")


router.post("/login",authController.login)

router.use(verifyJWT)
router.post("/register",authController.register)

module.exports=router