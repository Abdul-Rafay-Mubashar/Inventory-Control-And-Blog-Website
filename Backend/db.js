const mongoose=require('mongoose')
const mongooseurl="mongodb://localhost:27017/Stat-Project"


const Connection =()=>{
    mongoose.connect(mongooseurl)
    console.log("Connected")
}

module.exports=Connection;