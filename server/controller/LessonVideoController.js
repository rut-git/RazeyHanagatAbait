const LessonVideo = require("../models/LessonVideo")

const getAllLessonVideo = async (req, res) => {
    // if (req.user.roles != 'admin' && req.user.roles != 'secretary') {
    //     return res.status(400).json({ message: "not permissiend" })
    // }
    const lessonVideo = await LessonVideo.find({}).lean()
    if (!lessonVideo?.length) {
        return res.status(400).json({ message: "no LessonVideo found...." })
    }
    res.json(lessonVideo)
}
const createNewLessonVideo = async (req, res) => {
    if (!req.user.roles.includes('admin') && !req.user.roles.includes('secretary')) {
        return res.status(400).json({ message: "Not permitted" });
    }

    const { name, role } = req.body;
    if (!name || !role) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!req.file) {
        return res.status(400).json({ message: "File is required" });
    }
    const path=req.file.path.split("\\");
    const imageUrl = path[path.length-1];
    const existingLessonVideo = await LessonVideo.findOne({ name }).lean();

    if (!existingLessonVideo) {
        try {
            const lessonVideo = await LessonVideo.create({ path: imageUrl, name, role });
            return res.status(201).json({ message: "New lesson video created" });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: "Invalid lesson video"});
        }
    } else {
        return res.status(400).json({ message: "Lesson video already exists" });
    }
};


const upDateLessonVideo = async (req, res) => {
    if(req.user.roles!='admin' && req.user.roles!='secretary'){
        return res.status(400).json({ message: "not permissiend" })
    }
    const { id,name,role} = req.body
    if (!id  ||!name||!role) {
        return res.status(400).json({ message: "fields are required" })
    }
    const lessonVideo = await LessonVideo.findById(id).exec()

    if (!lessonVideo) {
        return res.status(400).json({ message: "lessonVideo not found"})
    }
    // const path=req.file.path.split("\\");
    // lessonVideo.path[path.length-1];
    lessonVideo.name=name;
    lessonVideo.role=role;
    const updateLessonVideo= await lessonVideo.save();
    res.json(`${updateLessonVideo.name} updated`);
}


const getLessonVideoByName = async (req, res) => {
    const { id } = req.params
    const lessonVideo = await LessonVideo.findById(id).lean()

    if (!lessonVideo) {
        return res.status(400).json({ message: "No LessonVideo found" })
    }
    res.json(lessonVideo)

}
const getLessonVideoByRole = async (req, res) => {
    const { role } = req.params
    let arr=[]
    switch (role) {
        case "refresh":
            arr=["refresh"]
            break
        case "leap":
            arr=["leap","refresh"]
            break
        case "engaged":
            arr=["engaged"]
            break
        case "secretary":
            arr=["refresh","leap","engaged"]
            break
        case "admin":
            arr=["refresh","leap","engaged"]
            break
        
    }
    const lessonVideo = await LessonVideo.find({role:{$in:arr}}).lean()

    if (!lessonVideo) {
        return res.status(400).json({ message: "No LessonVideo found" })
    }
    res.json(lessonVideo)

}

const deleteLessonVideo = async (req, res) => {
    if (req.user.roles !== 'admin' && req.user.roles !== 'secretary') {
        return res.status(400).json({ message: "Not permitted" });
    }

    const { id } = req.params; // קבלת ה-id מה-params של ה-url

    try {
        const lessonVideo = await LessonVideo.findById(id).exec();

        if (!lessonVideo) {
            return res.status(400).json({ message: "LessonVideo not found" });
        }

        const result = await lessonVideo.deleteOne();
        res.json({ message: `LessonVideo ${lessonVideo.name} ID ${lessonVideo._id} deleted` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting LessonVideo" });
    }
};




module.exports = { getAllLessonVideo, createNewLessonVideo, upDateLessonVideo, getLessonVideoByName,deleteLessonVideo,getLessonVideoByRole }