require("dotenv").config()
const express=require("express")
const cors=require("cors")
const corsOptions=require("./config/corsOptions")
const connectDB=require("./config/dbConn")
const { default: mongoose } = require("mongoose")
const path = require('path')

const PORT=process.env.PORT || 1258
const app=express()
connectDB()

app.use(cors(corsOptions))
app.use(express.json())
app.use('/upload', express.static(__dirname + '/public/upload'));
app.use('/uploadAudio', express.static(__dirname + '/public/uploadAudio'));





app.get('/upload/:fileName', (req, res) => {
    
    const {fileName}=req.params
    const imagePath = path.join(__dirname, '/public/upload/',fileName);
    res.sendFile(imagePath);
});
app.get('/uploadAudio/:fileName', (req, res) => {
    
    const {fileName}=req.params
    const imagePath = path.join(__dirname, '/public/uploadAudio/',fileName);
    res.sendFile(imagePath);
});

app.use("/api/user",require("./routes/UsersRoutes"))
app.use("/api/auth",require("./routes/authRoutes"))
app.use("/api/dialogue",require("./routes/DialogueRoutes"))
app.use("/api/discussions",require("./routes/DiscussionsRoutes"))
app.use("/api/lessonArticle",require("./routes/LessonArticleRoutes"))
app.use("/api/lessonAudio",require("./routes/LessonAudioRoutes"))
app.use("/api/lessonVideo",require("./routes/LessonVideoRoutes"))
app.use("/api/functionToken/:token",require("./middleware/functionToken"))

app.get('/',(req,res)=>{
    res.send("This is the Home Page")
})

mongoose.connection.once('open',()=>{
    console.log("connected to DB")
    app.listen(PORT,()=>
    console.log(`server running on port ${PORT}`))
})

mongoose.connection.on('error',err=>{
    console.log(err)
})


