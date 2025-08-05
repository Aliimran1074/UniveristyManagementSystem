const imageKit= require('imagekit')

const imageKitConfig=new imageKit({
     publicKey:process.env.IK_PublicKey, 
    privateKey:process.env.IK_PrivateKey,
    urlEndpoint:process.env.IK_URLEndPoint,
})

const fileIdByName = async(fileName)=>{
    try {
        const files =await imageKitConfig.listFiles({name:fileName})
        if(files.length===0){
            console.log('File not Found')
            return null
        }
        return files[0].fileId
    } catch (error) {
        console.log('Error in Fetching File Details',error)
        return null
    }
}

module.exports={imageKitConfig,fileIdByName}