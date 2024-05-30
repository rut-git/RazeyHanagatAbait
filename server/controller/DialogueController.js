const Dialogues = require("../models/Dialogue")
const Users = require("../models/Users")

const getAllDialogues = async (req, res) => {
   const {role}=req.params
    let dialogues = await Dialogues.find().lean().populate("userId", {name: 1,roles:1})
 
    if (!dialogues?.length) {
        return res.status(400).json({ message: "no dialogues found...." })
    }
    dialogues=dialogues.filter(dialogue=>dialogue.workerStatus==role)
    
    res.json(dialogues)
}



const createNewDialogue = async (req, res) => {
    
    const { dialogueName,dialogue, userId, workerStatus} = req.body
    if (!dialogue || !userId || !workerStatus ||! dialogueName) {
        return res.status(400).json({ message: "fields are required" })
    }
    const dialogues = await Dialogues.find({ dialogueName: dialogueName }).lean()
 

    if (!dialogues?.length) {
        const dialogue1 = await Dialogues.create({ dialogueName, dialogue, userId, workerStatus })
        if (dialogue1) {
            return res.status(201).json({ message: "new dialogue created" })
        }
        else {
            return res.status(400).json({ message: "Invalid dialogue" })
        }
    }
    else {
        return res.status(400).json({ message: "Invalid dialogue name" })
    }


}

const upDateDialogue = async (req, res) => {
    const {id}=req.params
    const {message,userId} = req.body
    if (!id ||! message) {
        return res.status(400).json({ message: "fields are required" })
    }
    const dialogue = await Dialogues.findById(id).exec()

    if (!dialogue) {
        return res.status(400).json({ message: "dialogue not found" })
    }
    const arr=[...dialogue.dialogue,{message,userId}]
    dialogue.dialogue=arr
    const updateDialogue= await dialogue.save()

    res.json(`${updateDialogue.dialogueName} updated`)
    
}
const upDateDialogueRead = async (req, res) => {
    if (req.user.roles != 'admin' && req.user.roles != 'secretary') {
        return res.status(400).json({ message: "not permissiend" })
    }
    const {id}=req.params
    const dialogue = await Dialogues.findById(id).exec()

    if (!dialogue) {
        return res.status(400).json({ message: "Discussion not found" })
    }
    dialogue.read=true
    const updateDialogue= await dialogue.save()
    res.json(`${updateDialogue.dialogueName} updated`)
}


const getDialogueByUserId = async (req, res) => {
    const { id } = req.params;
    try {
        const dialogues = await Dialogues.find({ userId: id }).populate('userId', { name: 1, roles: 1 }).lean();

        for (let i = 0; i < dialogues.length; i++) {
            for (let j = 0; j < dialogues[i].dialogue.length; j++) {
                const user = await Users.findById(dialogues[i].dialogue[j].userId).lean();
                if (user) {
                    dialogues[i].dialogue[j].name = user.name;
                }
                delete dialogues[i].dialogue[j].userId;
            }
        }

        if (dialogues.length === 0) {
            return res.status(400).json({ message: "No dialogues found" });
        }

        res.json(dialogues);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
const getDialogueById = async (req, res) => {
    const { id } = req.params
    const dialogue = await Dialogues.find({_id:id}).lean()
    
      

    if (!dialogue) {
        return res.status(400).json({ message: "No dialogue found" })
    }
    res.json(dialogue)

}




module.exports = { getAllDialogues, createNewDialogue, upDateDialogue, getDialogueByUserId ,upDateDialogueRead,getDialogueById}