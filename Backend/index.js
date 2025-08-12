require('dotenv').config()
const express =require('express')
const app =express()
const cors = require('cors')
const counterRoutes = require ('./Routers/counterRoutes')
const departmentRoutes = require('./Routers/departmentRouter')
const studentsRoutes = require('./Routers/studentRouters')
const staffRoutes=require('./Routers/staffRoutes')
const {databaseConnection}=require('./utils/db.connection')
app.use(express.json())
app.use(cors())
app.use('/api',counterRoutes)
app.use('/api',departmentRoutes)
app.use('/api',studentsRoutes)
app.use('/api',staffRoutes)
const port=process.env.Port


app.listen(port,async()=>{
    await databaseConnection()
    console.log("App Listen on Port ",port)
})