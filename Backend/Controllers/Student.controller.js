const studentModel = require('../Models/UserModels/students.models')
const counter = require('../Models/Counter/counter.model')
const QRCode = require('qrcode')
const {imageKitConfig,fileIdByName}= require('../ImageKit.IO Setup/setup')
const {uploadforStudentPics} = require('../Multer/multer')

const studentRegistration = async (req, res) => {
    try {
        uploadforStudentPics(req,res,async(error)=>{
        if(error){
                console.log('Error in uploading File',error)
                // return res.status(402).json({message:"Error in Uploading Picture"})}
             if(error.message=='Only image with allowed types can upload'){
                console.log('File Type Error')
                return  res.status(401).json({message:"Image is not of correct type",error})
             }
                 return res.status(404).json({message:"Error in file Uplaoding",error})
            }
            if(!req.file){
                console.log('file is not found')
                 return res.status(402).json({message:'File not Found'})
            }
            // console.log(req.file)
     try {
        const { name, personalEmail, department, contactNo, cnicNo } = req.body
        const emailPrefix = '@lms.indus.edu.pk'
        const customId = 'abc'                       //abc is custom id which will form by default        
        const checkRegistrationByCNIC = await studentModel.findOne({ cnicNo: cnicNo })
        if (checkRegistrationByCNIC) {
            console.log("Student Already Registered")
            return res.status(401).json({ message: 'Student Already Registered' })
        }
        const createStudent = await studentModel.create({ name: name, personalEmail: personalEmail, contactNo: contactNo, cnicNo: cnicNo, department: department, password: cnicNo })         //by default every student has cnicNo in their password
        if (!createStudent) {
            // console.log("Student Not Created ")
            return res.status(400).json({ message: "Student Not Created" })
        }
        const id = createStudent._id
        const getYear = new Date().getFullYear()
        let sequenceNo = ''
        const getCounter = await counter.findOne({ customId: customId })
        if (getCounter) {
            sequenceNo = getCounter.sequence
            // console.log("Counter Found Successfully")
        }
        else if (!getCounter) {
            const createCounter = await counter.create({})
            console.log("Counter Created Successfully")
            sequenceNo = createCounter.sequence
        }
        getCounter.sequence = Number(sequenceNo) + 1
        await getCounter.save()             //save the counter with 1 increment
        let sequenceNoForStudent = Number(sequenceNo) + 1
        let createStudentEmail = sequenceNoForStudent + '-' + getYear + emailPrefix
        let idToStoreInQrCode = id.toString()
        const makeQrCode = await QRCode.toDataURL(idToStoreInQrCode)
    
        // University Email and QR Code save here
        createStudent.universityEmail = createStudentEmail
        createStudent.qrCode = makeQrCode
        await createStudent.save()
    
        // const fileName = `${Date.now()}_${req.file.originalname}`
            const fileName = `${Date.now()}_${createStudentEmail}`

            const imageKitResponse= await imageKitConfig.upload({
                file:req.file.buffer,
                fileName:fileName
            })
            // console.log("Image kit response",imageKitResponse)
            const imageKitUrl= imageKitResponse.url
            console.log('Image kit url ', imageKitResponse.url)
            if(imageKitUrl.length>0 || imageKitUrl){
                createStudent.imageUrl=imageKitUrl
                await createStudent.save()
            }
            return res.status(200).json({ message: 'Student Created Successfully', createStudent })
        // console.log('Student Created Successfully')
        } catch (error) {
            console.log("Facing Error in Student Registration",error)
             res.status(403).json({message:"Facing Issue in Student Registration",error})
        }
        })    
    } 
    catch (error) {
    console.log("Issue in Registrating Student ",error)
    return res.status(404).json({message:"Issue in Registrating Student"})
 }
}

const getAStudentByCnic= async (req,res)=>{
    try {
        const {cnicNo}= req.body
        console.log("Cnic No : ",cnicNo)
        const studentData = await studentModel.findOne({cnicNo:cnicNo})
        if(!studentData){
            console.log("No student Found With This CNIC No")
            return res.status(402).json({message:"Student Not Found against this Cnic No"})
        }
        console.log('Student Found')
        return res.status(200).json({message:"Student Found",studentData})
    } catch (error) {
        console.log("Error in Getting Student with this Cnic No",error)
        return res.status(404).json({message:"Error in Getting Student with this Cnic No",error})
    }
    
}

const getAStudentById= async (req,res)=>{
    try {
        const {studentId}= req.params
        const studentData = await studentModel.findById(studentId)
        if(!studentData){
            console.log("No student Found With This id")
            return res.status(402).json({message:"Student Not Found against this id"})
        }
        console.log('Student Found')
        return res.status(200).json({message:"Student Found",studentData})
    } catch (error) {
        console.log("Error in Getting Student with this id",error)
        return res.status(404).json({message:"Error in Getting Student with this id",error})
    }
    
}

const updateDataUsingId = async (req,res)=>{
    try {
        const {id} = req.params
        const updatedData= req.body
        const updatedStudent= await studentModel.findByIdAndUpdate(id,updatedData,{new:true})
        if(!updatedStudent){
            console.log('Student Not Updated')
            return res.status(402).json({message:"Student Not Updated"})
        }
        return res.status(200).json({message:'Student Updated Successfully',updatedStudent})
    } catch (error) {
        console.log('Student not updated Successfully',error)
        return res.status(404).json({message:"Not able to update Student Data",error})

    }
}

const updateDataUsingCnic= async (req,res)=>{
    try {
        const {cnicNo} = req.params
        const dataToUpdate= req.body
        const updatedStudent= await studentModel.findOneAndUpdate({cnicNo:cnicNo},dataToUpdate,{new:true})
        if(!updatedStudent){
            console.log('Student Not Updated')
            return res.status(402).json({message:"Student Not Updated"})
        }
        return res.status(200).json({message:'Student Updated Successfully',updatedStudent})
    } catch (error) {
        console.log('Student not updated Successfully',error)
        return res.status(404).json({message:"Not able to update Student Data",error})

    }
}

const deleteStudent = async (req,res)=>{
    try {
        const {id,imageUrl} = req.body
        console.log(id)
        const deleteStudent= await studentModel.deleteOne({_id:id})
        if(deleteStudent.deletedCount<1){
            console.log("Not able to delete Student")
            return res.status(400).json({message:"Student not deleted/Student not exist"})
        }
        const decodedUrl= decodeURIComponent(imageUrl)
        const fileName=decodedUrl.substring(decodedUrl.lastIndexOf('/')+1).split('?')[0]
        const fileId= await fileIdByName(fileName)
        try {
            const deleteFile = await imageKitConfig.deleteFile(fileId)
            console.log(deleteFile)
            if(!deleteFile){
                console.log('File Not Deleted')
            }
            console.log("File Deleted Successfully")
        } catch (error) {
            console.log("Issue in deleting file from imagekit",error)
        }
        console.log('Student Deleted Successfully')
        return res.status(200).json({message:'Student Deleted Succesfully',deleteStudent})
    } catch (error) {
        console.log("Error in Delete Student Function",error)
        return res.status(404).json({message:"Error in Delete Student Function",error})
    }
}

module.exports = { studentRegistration,getAStudentByCnic,getAStudentById,updateDataUsingId,updateDataUsingCnic,deleteStudent }