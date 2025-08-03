require('dotenv').config()
const express =require('express')
const app =express()
const cors = require('cors')
const counterRoutes = require ('./Routers/counterRoutes')
const departmentRoutes = require('./Routers/departmentRouter')
const {databaseConnection}=require('./utils/db.connection')
app.use(express.json())
app.use(cors())
app.use('/api',counterRoutes)
app.use('/api',departmentRoutes)
const port=process.env.Port


app.listen(port,async()=>{
    await databaseConnection()
    console.log("App Listen on Port ",port)
})