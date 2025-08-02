const express = require('express')
require('./Database/Connection')

const cors = require('cors')
const app = express();

const port = 7039

app.get('/', (req,res)=>{
    res.send("My Server is running")
})
app.use(cors())
app.use(express.json())
app.use('/Api/User', require('./Router/userRouter.js'))

app.listen(port,()=>{
    console.log(`Server is run ${port}`)
})