const express = require("express")
const router = express.Router()
const multer = require("multer")
const path =require("path")
const LessonAudioController = require("../controller/LessonAudioController")
const verifyJWT = require("../middleware/verifyJWT")


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploadAudio/'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 100);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const uploadAudio = multer({ storage: storage });

router.use(verifyJWT)
router.get("/", LessonAudioController.getAllLessonAudio)
router.post("/", uploadAudio.single('path'),LessonAudioController.createNewLessonAudio)
router.put("/", uploadAudio.single('path'),LessonAudioController.upDateLessonAudio)
router.get("/role/:role",LessonAudioController.getLessonAudioByRole)
router.get("/:id", LessonAudioController.getLessonAudioByName)
router.delete("/:id", LessonAudioController.deleteLessonAudio)
module.exports = router