const LessonArticle = require("../models/LessonArticle")

const getAllLessonArticle = async (req, res) => {
    if (req.user.roles != 'admin' && req.user.roles != 'secretary') {
        return res.status(400).json({ message: "not permissiend" })
    }
    const lessonArticle = await LessonArticle.find({}).lean()
    if (!lessonArticle?.length) {
        return res.status(400).json({ message: "no LessonArticle found...." })
    }
    res.json(lessonArticle)
}


const createNewLessonArticle = async (req, res) => {

    if (req.user.roles != 'admin' && req.user.roles != 'secretary') {
        return res.status(400).json({ message: "not permissiend" })
    }

    const { article, name, role } = req.body

    if (!article || !name || !role) {
        return res.status(400).json({ message: "fields are required" })
    }
    const lessonArticle = await LessonArticle.find({ name: name }).lean()

    if (!lessonArticle?.length) {
        const lessonArticle = await LessonArticle.create({ article, name, role })
        if (lessonArticle) {
            return res.status(201).json({ message: "new lessonArticle created" })
        }
        else {
            return res.status(400).json({ message: "Invalid lessonArticle" })
        }
    }
    else {
        return res.status(400).json({ message: "Invalid lessonArticle" })
    }


}

const upDateLessonArticle = async (req, res) => {

    if (req.user.roles != 'admin' && req.user.roles != 'secretary') {
        return res.status(400).json({ message: "not permissiend" })
    }
    const {id}=req.params
    const {  article, name, role } = req.body

    if (!id || !article || !name || !role) {
        return res.status(400).json({ message: "fields are required" })
    }
    const lessonArticle = await LessonArticle.findById(id).exec()

    if (!lessonArticle) {
        return res.status(400).json({ message: "lessonArticle not found" })
    }
    lessonArticle.article = article
    lessonArticle.name = name
    lessonArticle.role = role


    const updateLessonArticle = await lessonArticle.save()

    res.json(`${updateLessonArticle.name} updated`)

}


const getLessonArticleByName = async (req, res) => {
    const { name } = req.params
    const lessonArticle = await LessonArticle.find({ name: name }).lean()

    if (!lessonArticle) {
        return res.status(400).json({ message: "No LessonArticle found" })
    }
    res.json(lessonArticle)

}
const getLessonArticleByRole = async (req, res) => {
   
    const role = req.user.roles
    let arr = []
    switch (role) {
        case "refresh":
            arr = ["refresh"]
            break
        case "leap":
            arr = ["leap", "refresh"]
            break
        case "engaged":
            arr = ["engaged"]
            break
        case "secretary":
            arr = ["refresh", "leap", "engaged"]
            break
        case "admin":
            arr = ["refresh", "leap", "engaged"]
            break

    }
    
    
    const lessonArticle = await LessonArticle.find({ role: { $in: arr } }).lean()

    if (!lessonArticle) {
        return res.status(400).json({ message: "No LessonArticle found" })
    }
    res.json(lessonArticle)

}

const deleteLessonArticle = async (req, res) => {
    const { id } = req.params
    if (req.user.roles != 'admin' && req.user.roles != 'secretary') {
        return res.status(400).json({ message: "not permissiend" })
    }

    const lessonArticle = await LessonArticle.findById(id).exec()

    if (!lessonArticle) {
        return res.status(400).json({ message: "LessonArticle not found" })
    }
    const result = await lessonArticle.deleteOne()
    res.json(`LessonArticle ${LessonArticle.name} ID ${LessonArticle.id} deleted`)
}




module.exports = { getAllLessonArticle, createNewLessonArticle, upDateLessonArticle, getLessonArticleByName, deleteLessonArticle, getLessonArticleByRole }