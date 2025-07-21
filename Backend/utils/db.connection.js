const mongoose=require('mongoose')

const url=process.env.Database
const databaseConnection=async()=>{
    try {
        await mongoose.connect(url)
        console.log('Database connected Successfully')
    }
     catch (error) {
        console.log("Error in Database Connection")
        process.exit(1)
    }
}

module.exports={databaseConnection,mongoose}