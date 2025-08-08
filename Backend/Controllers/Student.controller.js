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
             if(error.message=='Only image with allowed types can upload'){
                console.log('File Type Error')
                return res.status(401).json({message:"Image is not of correct type",error})
             }
                return res.status(404).json({message:"Error in file Uplaoding",error})
            }
            if(!req.file){
                console.log('file is not found')
                return res.status(402).json({message:'File not Found'})
            }
            console.log(req.file)
                    try {
            const fileName = `${Date.now()}_${req.file.originalname}`
            const imageKitResponse= await imageKitConfig.upload({
                file:req.file.buffer,
                fileName:fileName
            })

            console.log("Image kit response",imageKitResponse)
            const imageKitUrl= imageKitResponse.url
            console.log('Image kit url ', imageKitResponse.url)

            return res.status(200).json({message:"Image Kit Url and response",imageKitResponse,imageKitUrl})
        } catch (error) {
            console.log("Facing Error in Image Kit Work",error)
            return res.status(403).json({message:"Facing Error in Image Kit Work",error})
        }
        })
        // const { name, personalEmail, department, contactNo, cnicNo } = req.body
        // const 
        const emailPrefix = '@lms.indus.edu.pk'
        const customId = 'abc'                       //abc is custom id which will form by default
        
        // const checkRegistrationByCNIC = await studentModel.findOne({ cnicNo: cnicNo })
        // if (checkRegistrationByCNIC) {
        //     console.log("Student Already Registered")
        //     return res.status(401).json({ message: 'Student Already Registered' })
        // }


        // const createStudent = await studentModel.create({ name: name, personalEmail: personalEmail, contactNo: contactNo, cnicNo: cnicNo, department: department, password: cnicNo })         //by default every student has cnicNo in their password
        // if (!createStudent) {
        //     // console.log("Student Not Created ")
        //     return res.status(400).json({ message: "Student Not Created" })
        // }

        // // console.log('Student Created Successfully')
        // const id = createStudent._id
        // const getYear = new Date().getFullYear()
        // let sequenceNo = ''
        // const getCounter = await counter.findOne({ customid: customId })
        // if (getCounter) {
        //     sequenceNo = getCounter.sequence
        //     // console.log("Counter Found Successfully")
        // }
        // else if (!getCounter) {
        //     const createCounter = await counter.create({})
        //     // console.log("Counter Created Successfully")
        //     sequenceNo = createCounter.sequence
        // }
        // getCounter.sequence = Number(sequenceNo) + 1
        // await getCounter.save()             //save the counter with 1 increment
        // let sequenceNoForStudent = Number(sequenceNo) + 1
        // let createStudentEmail = sequenceNoForStudent + '-' + getYear + emailPrefix
        // let idToStoreInQrCode = id.toString()
        // const makeQrCode = await QRCode.toDataURL(idToStoreInQrCode)
    
        // // University Email and QR Code save here
        // createStudent.universityEmail = createStudentEmail
        // createStudent.qrCode = makeQrCode
        // await createStudent.save()
        
        // return res.status(200).json({ message: 'Student Created Successfully', createStudent })
    }
     catch (error) {
        console.log("error in function", error)
        return res.status(404).json({ message: "Issue in Function of Registration", error })
    }
}

module.exports = { studentRegistration }