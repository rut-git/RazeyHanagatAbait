const express = require("express")
const router = express.Router()
const LessonArticleController = require("../controller/LessonArticleController")
const verifyJWT = require("../middleware/verifyJWT")

router.use(verifyJWT)
router.get("/", LessonArticleController.getAllLessonArticle)
router.post("/", LessonArticleController.createNewLessonArticle)
router.put("/:id", LessonArticleController.upDateLessonArticle)
router.get("/role", LessonArticleController.getLessonArticleByRole)
router.get("/:name", LessonArticleController.getLessonArticleByName)
router.delete("/:id", LessonArticleController.deleteLessonArticle)


module.exports = router