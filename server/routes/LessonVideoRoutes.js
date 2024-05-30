const express=require("express")
const router=express.Router()
const multer = require("multer")
const path =require("path")

const LessonVideoController=require("../controller/LessonVideoController")
const verifyJWT=require("../middleware/verifyJWT")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/upload/'));
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 100);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });



router.use(verifyJWT)
router.get("/",LessonVideoController.getAllLessonVideo)
router.get("/role/:role",LessonVideoController.getLessonVideoByRole)
router.post("/", upload.single('path'), LessonVideoController.createNewLessonVideo);

router.put("/", upload.single('path'), LessonVideoController.upDateLessonVideo)
router.get("/:id",LessonVideoController.getLessonVideoByName)
router.delete("/:id",LessonVideoController.deleteLessonVideo)
module.exports=router

