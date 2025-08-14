
const QRCode = require('qrcode')
const {imageKitConfig,fileIdByName}= require('../../ImageKit.IO Setup/setup')
const {uploadforStudentPics} = require('../../Multer/multer')
const staffModel = require('../../Models/UserModels/staff.model')

const staffRegistration = async (req, res) => {
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
        const { name,cnicNo,mobileNo,address,department,designation } = req.body
        const checkRegistrationByCNIC = await staffModel.findOne({ cnicNo: cnicNo })
        if (checkRegistrationByCNIC) {
            console.log("Staff Already Registered")
            return res.status(401).json({ message: 'Staff Already Registered' })
        }
        const createStaff = await staffModel.create({ name: name, cnicNo: cnicNo, department: department,mobileNo:mobileNo,address:address,designation:designation })        
        if (!createStaff) {
            // console.log("staff Not Created ")
            return res.status(400).json({ message: "staff Not Created" })
        }
        const id = createStaff._id
        let idToStoreInQrCode = id.toString()
        const makeQrCode = await QRCode.toDataURL(idToStoreInQrCode)
    
        // University Email and QR Code save here
        createStaff.QRCode = makeQrCode
        await createStaff.save()
    
        // const fileName = `${Date.now()}_${req.file.originalname}`
            const fileName = `${Date.now()}_${name}`

            const imageKitResponse= await imageKitConfig.upload({
                file:req.file.buffer,
                fileName:fileName
            })
            // console.log("Image kit response",imageKitResponse)
            const imageKitUrl= imageKitResponse.url
            console.log('Image kit url ', imageKitResponse.url)
            if(imageKitUrl.length>0 || imageKitUrl){
                createStaff.imageUrl=imageKitUrl
                await createStaff.save()
            }
            return res.status(200).json({ message: 'Staff Created Successfully', createStaff })
        // console.log('staff Created Successfully')
        } catch (error) {
            console.log("Facing Error in staff Registration",error)
             res.status(403).json({message:"Facing Issue in staff Registration",error})
        }
        })    
    } 
    catch (error) {
    console.log("Issue in Registrating staff ",error)
    return res.status(404).json({message:"Issue in Registrating staff"})
 }
}

const getAstaffByCnic= async (req,res)=>{
    try {
        const {cnicNo}= req.body
        console.log("Cnic No : ",cnicNo)
        if(cnicNo.length!==13){
            console.log("Length of Cnic No not equal to 13")
            return res.status(403).json({message:"Please Enter Correct Cnic No"})
        }
        const staffData = await staffModel.findOne({cnicNo:cnicNo})
        if(!staffData){
            console.log("No staff Found With This CNIC No")
            return res.status(402).json({message:"staff Not Found against this Cnic No"})
        }
        console.log('staff Found')
        return res.status(200).json({message:"staff Found",staffData})
    } catch (error) {
        console.log("Error in Getting staff with this Cnic No",error)
        return res.status(404).json({message:"Error in Getting staff with this Cnic No",error})
    }
    
}

const getAstaffById= async (req,res)=>{
    try {
        const {staffId}= req.params
        const staffData = await staffModel.findById(staffId)
        if(!staffData){
            console.log("No staff Found With This id")
            return res.status(402).json({message:"staff Not Found against this id"})
        }
        console.log('staff Found')
        return res.status(200).json({message:"staff Found",staffData})
    } catch (error) {
        console.log("Error in Getting staff with this id",error)
        return res.status(404).json({message:"Error in Getting staff with this id",error})
    }
    
}

const updateDataUsingId = async (req,res)=>{
    try {
        const {id} = req.params
        const updatedData= req.body
        const updatedstaff= await staffModel.findByIdAndUpdate(id,updatedData,{runValidators:true,new:true})
        if(!updatedstaff){
            console.log('staff Not Updated')
            return res.status(402).json({message:"staff Not Updated"})
        }
        return res.status(200).json({message:'staff Updated Successfully',updatedstaff})
    } catch (error) {
        console.log('staff not updated Successfully',error)
        return res.status(404).json({message:"Not able to update staff Data",error})

    }
}

const updateDataUsingCnic= async (req,res)=>{
    try {
        const {cnicNo} = req.params
        const dataToUpdate= req.body
        const updatedstaff= await zstaffModel.findOneAndUpdate({cnicNo:cnicNo},dataToUpdate,{runValidators:true,new:true})           //runValidator help to check model status, a value applicable to change or not(we use due to enum)
        if(!updatedstaff){
            console.log('staff Not Updated')
            return res.status(402).json({message:"staff Not Updated"})
        }
        return res.status(200).json({message:'staff Updated Successfully',updatedstaff})
    } catch (error) {
        console.log('staff not updated Successfully',error)
        return res.status(404).json({message:"Not able to update staff Data",error})

    }
}

const deletestaff = async (req,res)=>{
    try {
        const {id} = req.params
        console.log(id)
        const deletestaff= await staffModel.deleteOne({_id:id})
        if(deletestaff.deletedCount<1){
            console.log("Not able to delete staff")
            return res.status(400).json({message:"staff not deleted/staff not exist"})
        }
        console.log('staff Deleted Successfully')
        return res.status(200).json({message:'staff Deleted Succesfully',deletestaff})
    } catch (error) {
        console.log("Error in Delete staff Function",error)
        return res.status(404).json({message:"Error in Delete staff Function",error})
    }
}

module.exports = { staffRegistration,getAstaffByCnic,getAstaffById,updateDataUsingId,updateDataUsingCnic,deletestaff }