const LessonAudio = require("../models/LessonAudio")
const getAllLessonAudio = async (req, res) => {
    // if (req.user.roles != 'admin' && req.user.roles != 'secretary') {
    //     return res.status(400).json({ message: "not permissiend" })
    // }
    const lessonAudio = await LessonAudio.find({}).lean()
    if (!lessonAudio?.length) {
        return res.status(400).json({ message: "no LessonAudio found...." })
    }
    res.json(lessonAudio)
}
const createNewLessonAudio = async (req, res) => {
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
    const existingLessonAudio = await LessonAudio.findOne({ name }).lean();

    if (!existingLessonAudio) {
        try {
            const lessonAudio = await LessonAudio.create({ path: imageUrl, name, role });
            return res.status(201).json({ message: "New lesson audio created" });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: "Invalid lesson audio" });
        }
    } else {
        return res.status(400).json({ message: "Lesson audio already exists" });
    }
};


const upDateLessonAudio = async (req, res) => {
    if(req.user.roles!='admin' && req.user.roles!='secretary'){
        return res.status(400).json({ message: "not permissiend" })
    }
    const { id,name,role} = req.body

    if (!id ||!name||!role) {
        return res.status(400).json({ message: "fields are required" })
    }
    const lessonAudio = await LessonAudio.findById(id).exec()

    if (!lessonAudio) {
        return res.status(400).json({ message: "lessonAudio not found" })
    }
    
    lessonAudio.name=name
    lessonAudio.role=role

    const updateLessonAudio= await lessonAudio.save()

    res.json(`${updateLessonAudio.name} updated`)
    
}


const getLessonAudioByName = async (req, res) => {
    const { id } = req.params
    const lessonAudio = await LessonAudio.findById(id).lean()

    if (!lessonAudio) {
        return res.status(400).json({ message: "No LessonAudio found" })
    }
    res.json(lessonAudio)

}
const getLessonAudioByRole = async (req, res) => {
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
    const lessonAudio = await LessonAudio.find({role:{$in:arr}}).lean()

    if (!lessonAudio) {
        return res.status(400).json({ message: "No LessonAudio found" })
    }
    res.json(lessonAudio)

}


const deleteLessonAudio = async (req, res) => {
    if (req.user.roles != 'admin' && req.user.roles != 'secretary') {
        return res.status(400).json({ message: "not permissiend" })
    }
    const { id } = req.params

    const lessonAudio = await LessonAudio.findById(id).exec()

    if (!lessonAudio) {
        return res.status(400).json({ message: "LessonAudio not found" })
    }
    const result = await lessonAudio.deleteOne()
    res.json(`LessonAudio ${LessonAudio.name} ID ${LessonAudio.id} deleted`)
}



module.exports = { getAllLessonAudio, createNewLessonAudio, upDateLessonAudio,getLessonAudioByRole, getLessonAudioByName,deleteLessonAudio }