const assignmentTopicModel= require('../../Models/AssignmentInputModel/assignment.input.model')

const assignmentTopicHandling= async(req,res)=>{
    try {
        const {instructorId,courseId,assignmentTopic}= req.body
        const lowerCaseAssignmentTopic= assignmentTopic.toLowerCase()
        const checkNoOfTopicsOfParticularCourse= await assignmentTopicModel.find({course:courseId})
        if(!checkNoOfTopicsOfParticularCourse){
            console.log("No Assignment Topic Found of This Course")
            return res.status(404).json({message:'Assignment Not found of This Course'})
        }
        if(checkNoOfTopicsOfParticularCourse.length>3){
            console.log("Already Four Topics Assigned")
            return res.status(201).json({message:"Already 4 Topics Assigned "})
        }
        // check duplication of topic 
        for(let i=0;i<checkNoOfTopicsOfParticularCourse.length;i++){
            if(checkNoOfTopicsOfParticularCourse[i].assignmentTopic.toLowerCase()==lowerCaseAssignmentTopic){
                console.log('Topic Already Assigned')
                return res.status(202).json({message:'This Topic Already Assigned'})
                // break
            }

        }

        const createTopic = await assignmentTopicModel.create({instructor:instructorId,course:courseId,assignmentTopic:assignmentTopic})
        if(!createTopic){
            console.log("Issue in Creating Topic")
            return res.status(403).json({message:"Issue in Creating Assignment Topic"})
        }
        console.log("Topic Created Successfully")
        return res.status(200).json({message:"Assignment Topic Created Succesfully",createTopic})
    } catch (error) {
        console.log("Error in Assignment Creating Function",error)
        res.status(400).json({message:"Error in Assignment Creating Function",error})
    }
}

module.exports=assignmentTopicHandling