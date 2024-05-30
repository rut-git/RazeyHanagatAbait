const Discussions = require("../models/Discussions")
const Users = require("../models/Users")
const getAllDiscussions = async (req, res) => {
        console.log("aaaaaaaaaaaaaaaaaaaaa");

    if (req.user.roles != 'admin' && req.user.roles != 'secretary' && req.user.roles != 'leap') {
        return res.status(400).json({ message: "not permissiend" })
    }
    const discussions = await Discussions.find().lean().populate("userId", {name: 1 })
  
    for (let i = 0; i < discussions.length; i++) {
        for (let j = 0; j < discussions[i].discussion.length; j++) {
            console.log(discussions[i].discussion[j].userId);
            let user = await Users.findById(discussions[i].discussion[j].userId).lean();
            if(user){
                discussions[i].discussion[j].name = user.name;
            }
            // discussions[i].discussion[j].name = user.name;
            // console.log("discussions[i].discussion[j].name: ",discussions[i].discussion[j].name);
            //delete discussions[i].discussion[j].userId; // Remove the userId field if not needed
        }
    }
    if (!discussions?.length) {
        return res.status(400).json({ message: "no Discussions found...." })
    }
    console.log("discussions: ",discussions.discussion);
    res.json(discussions)
}

const createNewDiscussions = async (req, res) => {
    if (req.user.roles != 'admin' && req.user.roles != 'secretary' && req.user.roles != 'leap') {
        return res.status(400).json({ message: "not permissiend" })
    }
    const { discussionName,discussion, userId} = req.body

    if (!discussionName || !userId || !discussion ) {
        return res.status(400).json({ message: "fields are required" })
    }
    const discussions = await Discussions.find({ discussionName: discussionName }).lean()

    if (!discussions?.length) {
        const discussion1 = await Discussions.create({  discussionName,discussion, userId })
        if (discussion1) {
            return res.status(201).json({ message: "new discussion created" })
        }
        else {
            return res.status(400).json({ message: "Invalid discussion" })
        }
    }
    else {
        return res.status(400).json({ message: "Invalid discussion Name" })
    }


}

const upDateDiscussion = async (req, res) => {
    if (req.user.roles != 'admin' && req.user.roles != 'secretary' && req.user.roles != 'leap') {
        return res.status(400).json({ message: "not permissiend" })
    }
    const {id}=req.params
    const { message,userId} = req.body
    // console.log( message,userId);
    if (!id ||! message) {
        return res.status(400).json({ message: "fields are required" })
    }

    const discussions = await Discussions.findById(id).exec()
    for (let i = 0; i < discussions.length; i++) {
        for (let j = 0; j < discussions[i].discussion.length; j++) {
            let user = await Users.findById(discussions[i].discussion[j].userId).lean();
            discussions[i].discussion[j].name = user.name;
            console.log("discussions[i].discussion[j].name: ",discussions[i].discussion[j].name);
            //delete discussions[i].discussion[j].userId; // Remove the userId field if not needed
        }
    }

    if (!discussions) {
        return res.status(400).json({ message: "Discussion not found" })
    }
    const arr=[...discussions.discussion,{message,userId}]
    discussions.discussion=arr
    // discussions.read=false
   const updateDiscussions= await discussions.save()
   res.json(updateDiscussions)
}

// const upDateDiscussionRead = async (req, res) => {
//     if (req.user.roles != 'admin' && req.user.roles != 'secretary' && req.user.roles != 'leap') {
//         return res.status(400).json({ message: "not permissiend" })
//     }
//     const {id}=req.params
//     const {read}=req.body
//     const discussions = await Discussions.findById(id).exec()

//     if (!discussions) {
//         return res.status(400).json({ message: "Discussion not found" })
//     }
//     discussions.read=read
//    const updateDiscussions= await discussions.save()
//    res.json(`${updateDiscussions.discussionName} updated`)
// }


const getDiscussionByName = async (req, res) => {
    if (req.user.roles != 'admin' && req.user.roles != 'secretary' && req.user.roles != 'leap') {
        return res.status(400).json({ message: "not permissiend" })
    }
    const { discussionName } = req.params
    const discussion = await Discussions.find({discussionName:discussionName}).lean().populate("userId", {name: 1 })
    for (let i = 0; i < discussions.length; i++) {
        for (let j = 0; j < discussions[i].discussion.length; j++) {
            let user = await Users.findById(discussions[i].discussion[j].userId).lean();
            discussions[i].discussion[j].name = user.name;
            console.log("discussions[i].discussion[j].name: ",discussions[i].discussion[j].name);
            //delete discussions[i].discussion[j].userId; // Remove the userId field if not needed
        }
    }

    if (!discussion) {
        return res.status(400).json({ message: "No discussion found" })
    }
    res.json(discussion)

}




module.exports = { getAllDiscussions, createNewDiscussions, upDateDiscussion, getDiscussionByName }