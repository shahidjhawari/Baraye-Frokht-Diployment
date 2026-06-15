const mongoose = require("mongoose")

async function connectDB(){
    try{
       await mongoose.connect("mongodb://shahidbr:shahidbr@ac-upwhyss-shard-00-00.zd61xam.mongodb.net:27017,ac-upwhyss-shard-00-01.zd61xam.mongodb.net:27017,ac-upwhyss-shard-00-02.zd61xam.mongodb.net:27017/?ssl=true&replicaSet=atlas-c7df0x-shard-0&authSource=admin&appName=Cluster0")
        console.log("✅ MongoDB Connected!")
        return true  // ✅ success par true return karo
    }catch(err){
        console.log("❌ MongoDB Error:", err.message)
        return false  // ✅ fail par false return karo
    }
}

module.exports = connectDB