require('dotenv').config()
const express =require('express')
const app =express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
const {databaseConnection}=require('./utils/db.connection')

const port=process.env.Port


app.listen(port,async()=>{
    await databaseConnection()
    console.log("App Listen on Port ",port)
})