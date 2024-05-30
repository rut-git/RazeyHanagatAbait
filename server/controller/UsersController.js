const Users = require("../models/Users")

const getAllUsers = async (req, res) => {
    if (req.user.roles != 'admin' && req.user.roles != 'secretary') {
        return res.status(400).json({ message: "not permissiend" })
    }
    const users = await Users.find({}).lean()
    if (!users?.length) {
        return res.status(400).json({ message: "no Users found...." })
    }
    res.json(users)
}




const upDateUser = async (req, res) => {
    if (req.user.roles != 'admin' && req.user.roles != 'secretary') {
        return res.status(400).json({ message: "not permissiend" })
    }
    const {id}=req.params
    const { name, userName, email, phone, password, roles } = req.body
    if (!id || !name || !userName || !password) {
        return res.status(400).json({ message: "fields are required" })
    }
    const a=['admin','secretary','refresh','leap','engaged']
        const tmp=a.filter(x=>x==roles)
        if(!tmp?.length){
            return res.status(400).json({ message: "Invalid user" })
        }
    const users = await Users.findById(id).lean()
    if (users) {
        const user = await Users.findById(id).exec()

        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }
        user.name = name
        user.userName = userName
        user.email = email
        user.password = password
        user.phone = phone
        user.roles = roles
        
        const updateUser = await user.save()
    }
    else {
        return res.status(400).json({ message: "invalid user" })
    }
    res.json(`updated`)
}


const deleteUser = async (req, res) => {
    if (req.user.roles != 'admin' && req.user.roles != 'secretary') {
        return res.status(400).json({ message: "not permissiend" })
    }
    const { id } = req.params
    const user = await Users.findById(id).exec()

    if (!user) {
        return res.status(400).json({ message: "user not found" })
    }
    const result = await user.deleteOne()
    res.json(`user ${user.name} ID ${user.id} deleted`)

}
const getUserById = async (req, res) => {
    const { id } = req.params
    const user = await Users.findById(id).lean()

    if (!user) {
        return res.status(400).json({ message: "No user found" })
    }
    res.json(user)


}




module.exports = { getAllUsers, upDateUser, deleteUser, getUserById }