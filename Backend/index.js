const Connected=require("./db.js")
const express=require("express")
const cors=require('cors')


Connected();
const app = express()
const port = 5000





app.use(express.json());
app.use(cors());


app.use(express.static(__dirname + "\\public"))


app.use('/api/User',require('./routes/UserData'))
app.use('/api/Item',require('./routes/ItemData'))
app.use('/api/Image',require('./routes/ImageData'))
app.use('/api/Heading',require('./routes/HeadingData'))
app.use('/api/Para',require('./routes/ParaData'))
app.use('/api/Sub',require('./routes/SubHeadingData'))
app.use('/api/Blog',require('./routes/BlogData'))
app.use('/api/Blog/Simple/Image',require('./routes/ImageData'))


console.log("Ok")


app.listen(port,()=>{
    console.log("Connected To Server")
})