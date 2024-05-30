const express = require("express")
const router = express.Router()
const UserController = require("../controller/UsersController")
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT)
router.get("/", UserController.getAllUsers)
// router.post("/", UserController.createNewUser)
router.put("/:id", UserController.upDateUser)
router.delete("/:id", UserController.deleteUser)
router.get("/:id", UserController.getUserById)

module.exports = router