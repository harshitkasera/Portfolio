const projectModel = require('../Model/ProjectModel')
const Data = require('../Data.js')

const data = async()=>{
    await projectModel.deleteMany({})
    await projectModel.insertMany(Data)
}
module.exports = data