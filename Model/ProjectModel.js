const mongoose = require('mongoose')
const projectModel =  mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    desc:{
        type: String,
        required: true
    },
    img:{
        type: String,
    }
})
const pro = mongoose.model("project-Data", projectModel)
module.exports = pro