const cloudinary=require('cloudinary').v2
const env=require('dotenv').config({})
const fs=require('fs')


cloudinary.config({
    cloud_name: process.env.Cloud_Name,
    api_key: process.env.Cloud_Api_Key,
    api_secret: process.env.Cloud_Api_Secret
   
})

const uploadonCloud=async(filePath)=>{
    try {
        if(!filePath){
            return false
        }
        const result=await cloudinary.uploader.upload(filePath,{
            resource_type:'image',

        })
        return result
        
    }
     catch (error){
        if(error){
            fs.unlinkSync(filePath)
            return false
        }
        
    }
        
    

}

module.exports={
    uploadonCloud
}