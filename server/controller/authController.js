const User = require("../models/Users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const login = async (req, res) => {
    const { userName, password } = req.body

    if (!userName || !password) {
        return res.status(400).json({ message: "All fields are required" })
    }
    const foundUser = await User.findOne({ userName }).lean()

    if (!foundUser) {
        return res.status(401).json({ message: "unAuthorized" })
    }
    const match = await bcrypt.compare(password, foundUser.password)

    if (!match) {
        return res.status(401).json({ message: "unAuthorized" })
    }
    const userInfo = { _id: foundUser._id, name: foundUser.name, roles: foundUser.roles, userName: foundUser.userName, email: foundUser.email }

    const accesToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET)

    res.json({ accesToken: accesToken, role:userInfo.roles })

}


const register = async (req, res) => {
    if (req.user.roles != 'admin' && req.user.roles != 'secretary') {
        return res.status(400).json({ message: "not permissiend" })
    }

    const { userName, password, name, email, phone, roles } = req.body

    if (!name || !userName || !password) {
        return res.status(400).json({ message: "All Fields Are Required!" })
    }
    const duplicate = await User.findOne({ userName: userName }).lean()

    if (duplicate) {
        return res.status(409).json({ message: "Duplicate User" })
    }

    const hashPwd = await bcrypt.hash(password, 10)
    const userObject = { name, email, userName, phone, password: hashPwd, roles }

    const user = await User.create(userObject)

    if (user) {
        return res.status(201).json({ message: `new user ${user.userName} created` })
    }
    else {
        return res.ststus(400).json({ message: "Invalid user recieved" })
    }


}



module.exports = { login, register }