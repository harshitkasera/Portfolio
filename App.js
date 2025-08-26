const express = require('express')
const mongodb = require('./Database/Connection')
const data = require('./Default/Default.js')
const cors = require('cors')
const path = require('path')
const multer = require('multer')
const app = express();
const ProjectModel = require("./Model/ProjectModel.js")

//Middlewares
app.use(cors())
app.use(express.json())

data()

//static folder to server upload
app.use('/uploads', express.static(path.join(__dirname, "uploads")))


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null, uniqueName)
    }
})


const uploads = multer({ storage: storage })

//Home Route
app.get('/', (req, res) => {
    res.send("My Server is running")
})

app.get('/st', async (req, res) => {
    try {
        const data = await ProjectModel.find()
        res.json(data)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})


app.post('/show', uploads.single('file'), async (req, res) => {
    try {
        const { name, desc, img } = req.body;
        const image = req.file ? req.file.filename : null

        if (!image) return res.status(400).json({ error: "Image is required" })

        const projectModel = await ProjectModel.create({
            img,
            name,
            desc
        });
        return res.status(200).json({
            message: "Product added",
            projectModel
        })

    }
    catch (error) {
        res.status(500).json({
            message: "Prodyct not added",
            error: error.message
        })
    }
})


const port = 1234
app.listen(port, () => {
    console.log(`Server is run ${port}`)
})