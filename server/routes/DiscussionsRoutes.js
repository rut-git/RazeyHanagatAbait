const express = require("express")
const router = express.Router()
const DiscussionsController = require("../controller/DiscussionsController")
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT)
router.get("/", DiscussionsController.getAllDiscussions)
router.post("/", DiscussionsController.createNewDiscussions)
router.put("/:id", DiscussionsController.upDateDiscussion)
// router.put("/read/:id", DiscussionsController.upDateDiscussionRead)
router.get("/:id", DiscussionsController.getDiscussionByName)

module.exports = router