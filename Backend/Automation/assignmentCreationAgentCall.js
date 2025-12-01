const cron = require('node-cron')


const assignmentCreationAgent= ()=>{
    cron.schedule('* * * * *',()=>{
    console.log("Hello World")
})
}


module.exports=assignmentCreationAgent